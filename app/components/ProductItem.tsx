import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  
  // Check if product is on sale
  const hasDiscount = product.priceRange.minVariantPrice.amount !== 
    (product as any).compareAtPriceRange?.minVariantPrice?.amount;
  
  // Check for product tags
  const isNew = (product as any).tags?.includes('new');
  const isBestSeller = (product as any).tags?.includes('bestseller');
  const isPremium = (product as any).tags?.includes('premium');
  const category = (product as any).productType || '';
  
  // Get sale percentage if on sale
  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePrice = parseFloat((product as any).compareAtPriceRange?.minVariantPrice?.amount || minPrice);
  const salePercent = comparePrice > minPrice ? 
    Math.round(((comparePrice - minPrice) / comparePrice) * 100) : 0;
  
  // Get color variants
  const colorVariants = (product as any).options?.find((opt: any) => 
    opt.name?.toLowerCase() === 'color'
  )?.values?.slice(0, 3) || [];
  
  // Get description/specs (first 50 chars of description or custom field)
  const description = (product as any).description?.substring(0, 60) || '';
  
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      title={`View ${product.title} details`}
    >
      <div className="product-item-image-wrapper">
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="product-item-image"
          />
        )}
        
        {/* Category Tag */}
        {category && (
          <div className="product-category-tag">
            {isPremium ? 'MOST PREMIUM' : isBestSeller ? 'BEST SELLERS' : category.toUpperCase()}
          </div>
        )}
        
        {/* Sale Badge */}
        {hasDiscount && (
          <div className="product-badge badge-sale" style={{position: 'absolute', top: '12px', right: '12px'}}>
            Sale
          </div>
        )}
        
        {/* Quick View Overlay */}
        <div className="product-item-overlay">
          <span className="quick-view-text">View Details</span>
        </div>
      </div>
      
      <div className="product-item-details">
        {/* Title */}
        <h4 className="product-item-title">{product.title}</h4>
        
        {/* Discount Percentage */}
        {hasDiscount && salePercent > 0 && (
          <div className="product-discount-percent">{salePercent}% OFF</div>
        )}
        
        {/* Description/Specs */}
        {description && (
          <p className="product-item-description">{description}</p>
        )}
        
        {/* Color Swatches */}
        {colorVariants.length > 0 && (
          <div className="product-color-swatches">
            {colorVariants.map((color: string, idx: number) => (
              <div
                key={idx}
                className="color-swatch"
                style={{backgroundColor: color.toLowerCase()}}
                title={color}
              />
            ))}
            {colorVariants.length > 3 && (
              <span className="color-swatch-more">+{colorVariants.length - 3}</span>
            )}
          </div>
        )}
        
        {/* Rating */}
        <div className="product-rating">
          <span className="rating-stars">★</span>
          <span className="rating-count">
            {Math.floor(Math.random() * 150) + 50} reviews
          </span>
        </div>
        
        {/* Price Section */}
        <div className="product-price-container">
          <div className="product-price-group">
            <div className="product-item-price">
              <Money data={product.priceRange.minVariantPrice} />
            </div>
            {hasDiscount && comparePrice > minPrice && (
              <div className="product-original-price">
                <Money data={{amount: comparePrice.toString(), currencyCode: product.priceRange.minVariantPrice.currencyCode}} />
              </div>
            )}
          </div>
          
          {hasDiscount && salePercent > 0 && (
            <button className="product-sale-price-btn" onClick={(e) => e.preventDefault()}>
              Sale:{minPrice} Rs
            </button>
          )}
        </div>
        
        {/* Availability Badge */}
        <div className="product-availability">
          {(product as any).availableForSale ? (
            <span className="availability-in-stock">In Stock</span>
          ) : (
            <span className="availability-out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
