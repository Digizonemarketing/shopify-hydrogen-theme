import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {ShoppingBag} from 'lucide-react';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-2xl">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-neon/20 to-brand-neon/5 ring-1 ring-brand-neon/30 flex items-center justify-center">
            <ShoppingBag size={18} className="text-brand-neon" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Cart</h2>
          {cartHasItems && (
            <span className="ml-auto text-sm font-semibold text-brand-neon bg-brand-neon/10 px-3 py-1 rounded-full ring-1 ring-brand-neon/20">
              {cart?.totalQuantity} item{cart?.totalQuantity !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {!linesCount ? (
          <CartEmpty hidden={false} layout={layout} />
        ) : (
          <div className="p-6">
            <ul className="space-y-3">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Summary & Checkout */}
      {cartHasItems && <CartSummary cart={cart} layout={layout} />}
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div
      hidden={hidden}
      className="flex flex-col items-center justify-center h-full px-6 py-12 text-center"
    >
      <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/20 flex items-center justify-center">
        <ShoppingBag size={32} className="text-white/40" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Your cart is empty
      </h3>
      <p className="text-sm text-white/60 mb-6">
        Looks like you haven&rsquo;t added anything yet. Let&rsquo;s get you
        started!
      </p>
      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-neon to-brand-neon-light text-slate-950 font-semibold rounded-xl hover:brightness-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon/60"
      >
        Continue shopping →
      </Link>
    </div>
  );
}
