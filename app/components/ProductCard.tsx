import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {Heart, ShoppingBag} from 'lucide-react';

type ProductCardImage = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export interface ProductCardProps {
  /** Minimal product shape used by the card. */
  product: {
    id?: string | null;
    title?: string | null;
    handle?: string | null;
    featuredImage?: ProductCardImage | null;
    images?: {nodes?: Array<ProductCardImage | null>} | null;
    priceRange?: {
      minVariantPrice?: MoneyV2 | null;
      maxVariantPrice?: MoneyV2 | null;
    } | null;
    [key: string]: unknown;
  };

  /** Control image loading behavior. */
  loading?: 'eager' | 'lazy';

  /** Enable the expanded/featured UI. */
  featured?: boolean;

  /** Optional destination override (useful for localized variant URLs). */
  to?: string;

  /** @deprecated Use imageHeightClassName instead. */
  imageHeight?: string;

  /** Optional override for the image area height (useful in grids). */
  imageHeightClassName?: string;

  /** @deprecated Not used by the clean card design. */
  subtitle?: string;

  /** @deprecated Not used by the clean card design. */
  badges?: unknown;

  /** @deprecated Not used by the clean card design. */
  quickAddVariantId?: string;
}

export function ProductCard({
  product,
  loading = 'lazy',
  imageHeight,
  imageHeightClassName,
  featured = false,
  to,
}: ProductCardProps) {
  const {title, handle, featuredImage, priceRange} = product;

  if (!handle) return null;

  const images = (product as any).images?.nodes as
    | Array<ProductCardImage | null>
    | undefined;
  const primaryImage = (images?.find(Boolean) ??
    featuredImage) as ProductCardImage | null | undefined;

  const minPrice = priceRange?.minVariantPrice ?? undefined;
  const maxPrice = priceRange?.maxVariantPrice ?? undefined;
  const isPriceRange =
    !!minPrice && !!maxPrice && maxPrice.amount !== minPrice.amount;

  const productUrl = `/products/${handle}`;
  const href = to ?? productUrl;
  const resolvedImageHeightClassName =
    imageHeightClassName ?? imageHeight ?? 'h-80';

  const code = (handle || '').replace(/-/g, ' ').toUpperCase().slice(0, 12);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={href}
        prefetch="intent"
        aria-label={title ? `View ${title}` : 'View product'}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className="relative bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mb-4 overflow-hidden"
          style={{width: '100%', maxWidth: 250, aspectRatio: '1 / 1'}}
        >
          {primaryImage ? (
            <Image
              data={primaryImage}
              alt={primaryImage.altText || title || 'Product image'}
              width={500}
              height={500}
              aspectRatio="1/1"
              loading={loading}
              crop="center"
              sizes="(min-width: 768px) 250px, 90vw"
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
            />
          ) : (
            <div aria-hidden className="absolute inset-0 h-full w-full rounded-xl bg-white/20" />
          )}
        </div>

        {code ? (
          <p className="text-[10px] text-gray-500 mb-1.5 tracking-wide">Code {code}</p>
        ) : null}
        <h3 className="font-bold text-[18px] text-gray-900 mb-2 line-clamp-2">{title}</h3>
      </Link>

      {featured ? (
        <div className="mb-4">
          <p className="text-xs font-semibold mb-2">PRODUCT OPTIONS</p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {[
              '#D3D3D3',
              '#8B4513',
              '#FF0000',
              '#FFA500',
              '#FFFF00',
              '#0000FF',
              '#800080',
              '#FF1493',
            ].map((color) => (
              <div
                key={color}
                className="w-5 h-5 rounded-full border-2 border-gray-300"
                style={{backgroundColor: color}}
                aria-hidden
              />
            ))}
          </div>
          <div className="flex gap-2 text-xs font-semibold flex-wrap">
            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
              <button
                key={size}
                type="button"
                className="px-2 py-1 border border-gray-300 rounded hover:border-cyan-500"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex gap-2.5 items-center justify-between mt-4">
        <Link
          to={href}
          prefetch="intent"
          className={
            featured
              ? 'flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200'
              : 'flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200'
          }
          aria-label={title ? `View ${title}` : 'View product'}
        >
          {featured ? (
            <>
              <ShoppingBag size={18} /> ADD TO CART
            </>
          ) : (
            'ADD TO CART'
          )}
        </Link>

        <button
          type="button"
          className={
            featured
              ? 'h-11 w-11 inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-200'
              : 'h-11 w-11 inline-flex items-center justify-center border-2 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-all duration-200'
          }
          aria-label="Add to wishlist"
        >
          {featured ? <Heart size={20} fill="white" /> : <Heart size={18} />}
        </button>
      </div>

      <p className="text-[20px] font-extrabold mt-3.5 text-gray-900">
        {minPrice ? (
          isPriceRange ? (
            <span className="inline-flex items-baseline gap-2">
              <span className="text-[10px] text-gray-500">From</span>
              <Money data={minPrice} />
            </span>
          ) : (
            <Money data={minPrice} />
          )
        ) : (
          <span className="text-sm font-medium text-gray-500">Price unavailable</span>
        )}
      </p>
    </div>
  );
}
