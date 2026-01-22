import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {ShoppingBag, ArrowRight, ShieldCheck, X, Truck, Lock, Package, Gift, Sparkles} from 'lucide-react';

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
  const cart = useOptimisticCart(originalCart);
  
  // Flatten lines for easier access
  const cartLines = cart?.lines?.nodes ?? [];
  const linesCount = Boolean(cartLines.length || 0);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  const isAside = layout === 'aside';

  // ----------------------------------------------------------------------
  // Empty State (Early Return)
  // ----------------------------------------------------------------------
  if (!linesCount) {
    return (
      <div className={`flex flex-col ${isAside ? 'h-full' : 'w-full py-20'} font-sans`}>
        {isAside && <CartHeader cart={cart as CartApiQueryFragment | null} layout={layout} />}
        <CartEmpty hidden={false} layout={layout} />
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Layout: Page (/cart)
  // ----------------------------------------------------------------------
  if (layout === 'page') {
    return (
      <div className="w-full relative min-h-screen font-sans">
        {/* Background Ambiance */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-brand-neon/5 via-brand-neon/0 to-transparent blur-3xl" />
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-neon/10 blur-[100px]" />
        </div>

        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header with Progress Indicator */}
          <div className="mb-8 lg:mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-xs font-bold uppercase tracking-wider font-display">
                  <span>Step 1 of 3</span>
                  <span className="w-1 h-1 rounded-full bg-brand-neon" />
                  <span>Review</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
                  Your Bag
                </h1>
              </div>
              
              {/* Trust Badge / Context */}
              <div className="flex items-center gap-3 text-white/60 text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-md font-sans">
                <ShieldCheck size={16} className="text-brand-neon" />
                <span>Secure Checkout Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Free Shipping Banner for Page Layout */}
          <div className="mb-8">
            <FreeShippingBanner cart={cart as CartApiQueryFragment | null} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20">
                {/* List Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <span className="text-sm font-medium text-white/80 font-sans">Product</span>
                  <Link 
                     to="/collections" 
                     className="text-sm text-brand-neon hover:text-white transition-colors flex items-center gap-1 font-display"
                  >
                    Continue Shopping <ArrowRight size={14} />
                  </Link>
                </div>
                
                {/* Items List */}
                <ul className="divide-y divide-white/5 p-0">
                  {cartLines.map((line, idx) => (
                    <li key={line.id} className="p-6 hover:bg-white/[0.02] transition-colors animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
                      <CartLineItem line={line} layout={layout} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
              <CartSummary cart={cart} layout={layout} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Layout: Aside (Drawer)
  // ----------------------------------------------------------------------
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-l border-brand-neon/20 shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)]">
      <CartHeader cart={cart as CartApiQueryFragment | null} layout={layout} />

      {/* Free Shipping Progress Bar */}
      <FreeShippingBanner cart={cart as CartApiQueryFragment | null} />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto cart-scroll px-2 sm:px-3 py-3">
        {/* Trust Badges */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <Lock size={16} className="text-brand-neon" />
            <span className="text-[10px] text-white/60 text-center font-sans">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <Truck size={16} className="text-brand-neon" />
            <span className="text-[10px] text-white/60 text-center font-sans">Fast Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <Package size={16} className="text-brand-neon" />
            <span className="text-[10px] text-white/60 text-center font-sans">Easy Returns</span>
          </div>
        </div>

        <ul className="space-y-3">
          {cartLines.map((line, idx) => (
            <li 
              key={line.id} 
              className="animate-slideInRight" 
              style={{ animationDelay: `${idx * 50}ms` }}
            >
                <CartLineItem line={line} layout={layout} />
            </li>
          ))}
        </ul>

        {/* Special Offer Banner */}
        <SpecialOfferBanner cart={cart as CartApiQueryFragment | null} />
      </div>

      {/* Sticky Footer Area */}
      {cartHasItems && (
        <div className="border-t border-brand-neon/20 bg-gradient-to-t from-black via-zinc-950 to-zinc-950/50 backdrop-blur-xl p-2 sm:px-3 sm:pb-4 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.8)]">
           <CartSummary cart={cart} layout={layout} />
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

function CartHeader({cart, layout}: {cart: CartApiQueryFragment | null, layout: CartLayout}) {
  const {close} = useAside();
  const count = cart?.totalQuantity || 0;

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-brand-neon/20 bg-gradient-to-r from-white/[0.05] to-brand-neon/5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-neon/30 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <ShoppingBag size={24} className="text-brand-neon relative" />
        </div>
        <h2 className="text-sm font-bold text-white tracking-tight font-display">Cart</h2>
        <span className="flex items-center justify-center h-6 min-w-[1.5rem] px-2 rounded-full bg-gradient-to-r from-brand-neon to-brand-neon/80 text-[11px] font-bold text-black shadow-[0_0_15px_-2px] shadow-brand-neon/50 font-display">
          {count}
        </span>
      </div>
      
      {/* Attractive Close Button */}
      <button 
        onClick={close}
        className="group relative p-2.5 -mr-2 text-white/50 hover:text-white transition-all duration-300 hover:bg-brand-neon/10 rounded-lg"
        aria-label="Close cart"
      >
        <div className="absolute inset-0 bg-brand-neon/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300 -z-10" />
        <X size={22} className="relative group-hover:scale-110 transition-transform duration-300" />
      </button>
    </header>
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
      className="flex flex-col flex-1 items-center justify-center p-8 text-center animate-fadeIn"
    >
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-brand-neon/20 blur-xl rounded-full group-hover:bg-brand-neon/30 transition-all duration-500" />
        <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10 flex items-center justify-center backdrop-blur-md">
          <ShoppingBag size={40} className="text-white/40 group-hover:text-brand-neon transition-colors duration-300" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-wide">
        Your cart is empty
      </h3>
      <p className="text-white/60 max-w-xs mx-auto mb-8 leading-relaxed font-sans">
        Looks like you haven&rsquo;t found the perfect gear yet. 
        Explore our latest drops.
      </p>
      
      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-neon text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 font-display tracking-wide"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative">Start Shopping</span>
        <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

// Free Shipping Progress Component
function FreeShippingBanner({cart}: {cart: CartApiQueryFragment | null}) {
  // Get current cart total
  const currentAmount = cart?.cost?.subtotalAmount?.amount ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'USD';
  
  // Try to get free shipping threshold from multiple sources (priority order):
  // 1. Cart attributes - most reliable for Shopify-configured thresholds
  // 2. Analyze delivery groups to detect free shipping patterns
  // 3. Environment variable
  // 4. Default fallback
  
  let freeShippingThreshold = 100; // Default fallback
  let hasFreeShippingOption = false;
  let detectedFromShopify = false;
  
  // PRIORITY 1: Check cart attributes (set via Shopify Flow, cart attributes, or server-side)
  const thresholdAttribute = cart?.attributes?.find(attr => 
    attr.key === 'free_shipping_threshold' || attr.key === '_free_shipping_minimum'
  );
  if (thresholdAttribute?.value) {
    freeShippingThreshold = parseFloat(thresholdAttribute.value);
    detectedFromShopify = true;
  }
  
  // PRIORITY 2: Analyze delivery groups for free shipping patterns (using type assertion for now)
  const cartWithDelivery = cart as any;
  if (!detectedFromShopify && cartWithDelivery?.deliveryGroups?.nodes && cartWithDelivery.deliveryGroups.nodes.length > 0) {
    const deliveryOptions = cartWithDelivery.deliveryGroups.nodes[0]?.deliveryOptions || [];
    
    // Find free shipping option
    const freeOption = deliveryOptions.find(
      (option: any) => 
        parseFloat(option?.estimatedCost?.amount || '999999') === 0 ||
        option?.title?.toLowerCase().includes('free') ||
        option?.code?.toLowerCase().includes('free') ||
        option?.handle?.toLowerCase().includes('free')
    );
    
    if (freeOption) {
      hasFreeShippingOption = true;
      detectedFromShopify = true;
      
      // Try to extract minimum from title (e.g., "Free shipping on orders over $75")
      const titleMatch = freeOption.title?.match(/\$(\d+(?:\.\d{2})?)/);
      if (titleMatch) {
        freeShippingThreshold = parseFloat(titleMatch[1]);
      }
      // If current order already has free shipping, we know threshold is at or below current amount
      else if (currentAmount > 0) {
        // Set threshold to current amount or slightly below to show "unlocked" state
        freeShippingThreshold = Math.floor(currentAmount);
      }
    } else {
      // No free shipping detected yet - look for paid options with hints
      const paidOptions = deliveryOptions.filter(
        (option: any) => parseFloat(option?.estimatedCost?.amount || '0') > 0
      );
      
      // Check if any paid option mentions free shipping threshold in title
      for (const option of paidOptions) {
        const match = option?.title?.match(/free.*?\$(\d+(?:\.\d{2})?)|(\d+(?:\.\d{2})?)\s*for\s*free/i);
        if (match) {
          freeShippingThreshold = parseFloat(match[1] || match[2]);
          detectedFromShopify = true;
          break;
        }
      }
    }
  }
  
  // PRIORITY 3: Check environment variable
  if (!detectedFromShopify && typeof window !== 'undefined' && (window as any).ENV?.FREE_SHIPPING_THRESHOLD) {
    freeShippingThreshold = parseFloat((window as any).ENV.FREE_SHIPPING_THRESHOLD);
  }
  
  // Calculate progress
  const progress = Math.min((currentAmount / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - currentAmount, 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Unlocked state - show if cart qualifies for free shipping
  if (currentAmount >= freeShippingThreshold || hasFreeShippingOption) {
    return (
      <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-brand-neon/20 to-emerald-500/20 border-b border-brand-neon/30 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Truck size={18} className="text-brand-neon animate-bounce" />
            <span className="text-white font-bold font-display">🎉 FREE shipping unlocked!</span>
          </div>
          {detectedFromShopify && (
            <span className="text-[10px] text-emerald-400/60 font-sans">from Shopify</span>
          )}
        </div>
      </div>
    );
  }

  // Progress state
  return (
    <div className="px-4 sm:px-6 py-3 bg-white/[0.02] border-b border-white/5">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70 font-sans">
            <span className="text-brand-neon font-bold">{formatCurrency(remaining)}</span> away from FREE shipping
          </span>
          <Truck size={14} className="text-white/40" />
        </div>
        <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-neon to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ 
              backgroundSize: '200% 100%',
              animation: progress > 0 ? 'shimmer 2s infinite' : 'none'
            }}
          />
        </div>
        {/* Mini milestone indicator */}
        <div className="flex justify-between items-center text-[10px] text-white/40 font-sans">
          <span>{formatCurrency(currentAmount)}</span>
          <div className="flex items-center gap-1">
            <span className="text-brand-neon/70">{formatCurrency(freeShippingThreshold)} min</span>
            {detectedFromShopify && (
              <span className="px-1.5 py-0.5 rounded bg-brand-neon/20 text-brand-neon text-[9px] font-bold">SHOPIFY</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Special Offer Banner Component
function SpecialOfferBanner({cart}: {cart: CartApiQueryFragment | null}) {
  // Get applied discounts and gift cards
  const discountCodes = cart?.discountCodes?.filter(code => code.applicable) || [];
  const appliedGiftCards = cart?.appliedGiftCards || [];
  const hasDiscounts = discountCodes.length > 0;
  const hasGiftCards = appliedGiftCards.length > 0;
  
  // Calculate total savings
  const subtotal = cart?.cost?.subtotalAmount?.amount ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const total = cart?.cost?.totalAmount?.amount ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const savings = subtotal - total;
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'USD';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // If there are active discounts or gift cards, show them
  if (hasDiscounts || hasGiftCards || savings > 0) {
    return (
      <div className="mt-4 space-y-2">
        {/* Active Discounts */}
        {hasDiscounts && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <Sparkles size={16} className="text-emerald-400" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-bold text-emerald-400 font-display">Active Discounts</h4>
                {discountCodes.map((discount, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs text-white/80 font-sans uppercase tracking-wide">
                      {discount.code}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">✓ Applied</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applied Gift Cards */}
        {hasGiftCards && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <Gift size={16} className="text-purple-400" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-bold text-purple-400 font-display">Gift Cards Applied</h4>
                {appliedGiftCards.map((giftCard, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs text-white/80 font-sans">
                      •••• {giftCard.lastCharacters}
                    </span>
                    <span className="text-xs text-purple-400 font-bold">
                      -{formatCurrency(parseFloat(giftCard.amountUsed?.amount || '0'))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Total Savings */}
        {savings > 0 && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-neon/10 to-blue-500/10 border border-brand-neon/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand-neon animate-pulse" />
                <span className="text-xs font-bold text-white font-display">Total Savings</span>
              </div>
              <span className="text-sm font-bold text-brand-neon">
                {formatCurrency(savings)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default promotional banner when no discounts are applied
  return (
    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-brand-neon/10 to-purple-500/10 border border-brand-neon/30 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Gift size={20} className="text-brand-neon" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white font-display">Special Offer</h4>
            <Sparkles size={14} className="text-brand-neon animate-pulse" />
          </div>
          <p className="text-xs text-white/70 font-sans leading-relaxed">
            Get 10% off on orders over $200. Limited time only!
          </p>
        </div>
      </div>
    </div>
  );
}