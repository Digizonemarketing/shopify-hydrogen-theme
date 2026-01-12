import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useState} from 'react';

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
  const [hoverIndex, setHoverIndex] = useState(0);
  
  // Get multiple images - get up to 4 images
  const images = (product as any).images?.nodes?.slice(0, 4) || [];
  const currentImage = images[hoverIndex] || product.featuredImage;
  const hasMultipleImages = images.length > 1;
  
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
  
  // Get material and full description
  const fullDescription = (product as any).description || '';
  const material = (product as any).material || 'Premium Material';
  const sku = (product as any).sku || '';
  
  // Calculate rating (mock)
  const rating = Math.floor(Math.random() * 20) + 80; // 80-100
  const reviewCount = Math.floor(Math.random() * 150) + 30; // 30-180
  
  const handleImageHover = () => {
    if (hasMultipleImages) {
      setHoverIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handleImageLeave = () => {
    setHoverIndex(0);
  };
  
  return (
    <Link
      className="luxury-product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      title={`View ${product.title} details`}
    >
      {/* Image Section */}
      <div 
        className="product-image-container"
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageLeave}
      >
        {/* Main Image with Transition */}
        <div className="product-image-wrapper">
          {currentImage && (
            <Image
              alt={currentImage.altText || product.title}
              aspectRatio="1/1"
              data={currentImage}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className="product-image-main"
            />
          )}
        </div>

        {/* Image Indicators */}
        {hasMultipleImages && (
          <div className="product-image-indicators">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`image-indicator ${idx === hoverIndex ? 'active' : ''}`}
                onMouseEnter={() => setHoverIndex(idx)}
                title={`Image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badges Section */}
        <div className="product-badges-section">
          {isNew && <span className="badge badge-new">NEW</span>}
          {isBestSeller && <span className="badge badge-bestseller">BESTSELLER</span>}
          {isPremium && <span className="badge badge-premium">PREMIUM</span>}
          {hasDiscount && salePercent > 0 && (
            <span className="badge badge-sale">-{salePercent}%</span>
          )}
        </div>

        {/* Hover Overlay with CTA */}
        <div className="product-hover-overlay">
          <div className="overlay-content">
            <h3 className="overlay-title">View Details</h3>
            <p className="overlay-subtitle">
              {hasMultipleImages ? `View ${images.length} images` : 'Explore this item'}
            </p>
            <button className="btn btn-primary" onClick={(e) => e.preventDefault()}>
              Discover More →
            </button>
          </div>
        </div>

        {/* Next Image Indicator */}
        {hasMultipleImages && (
          <div className="next-image-indicator">
                <span>Hover for more images</span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="product-details-luxury">
        {/* Category & Type */}
        <div className="product-meta">
          <span className="product-category">{category || 'Collection Item'}</span>
          {sku && <span className="product-sku">SKU: {sku}</span>}
        </div>

        {/* Title */}
        <h2 className="product-title-luxury">{product.title}</h2>

        {/* Description - Short */}
        {fullDescription && (
          <p className="product-description-short">
            {fullDescription.substring(0, 80)}...
          </p>
        )}

        {/* Material & Quality Info */}
        <div className="product-specs">
          <div className="spec-item">
            <span className="spec-icon">✓</span>
            <span className="spec-text">Premium Quality</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">✓</span>
            <span className="spec-text">{material}</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">✓</span>
            <span className="spec-text">Luxury Crafted</span>
          </div>
        </div>

        {/* Color Swatches */}
        {colorVariants.length > 0 && (
          <div className="color-swatches-section">
            <span className="color-label">Colors Available:</span>
            <div className="product-color-swatches">
              {colorVariants.map((color: string, idx: number) => (
                <div
                  key={idx}
                  className="color-swatch-luxury"
                  style={{backgroundColor: color.toLowerCase()}}
                  title={color}
                />
              ))}
              {colorVariants.length > 3 && (
                <span className="color-swatch-more">+{colorVariants.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {/* Rating Section */}
        <div className="product-rating-section">
          <div className="rating-display">
            <span className="stars">
              {'★'.repeat(Math.floor(rating / 20))}<span className="stars-empty">{'☆'.repeat(5 - Math.floor(rating / 20))}</span>
            </span>
            <span className="rating-value">{rating}%</span>
          </div>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>

        {/* Price Section - Premium Layout */}
        <div className="price-section-luxury">
          <div className="price-display">
            <span className="price-current">
              <Money data={product.priceRange.minVariantPrice} />
            </span>
            {hasDiscount && comparePrice > minPrice && (
              <span className="price-original">
                <Money data={{amount: comparePrice.toString(), currencyCode: product.priceRange.minVariantPrice.currencyCode}} />
              </span>
            )}
          </div>
          {hasDiscount && (
            <span className="discount-badge">{salePercent}% OFF</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="stock-status">
          {(product as any).availableForSale ? (
            <>
              <span className="stock-indicator in-stock"></span>
              <span className="stock-text">In Stock - Fast Delivery</span>
            </>
          ) : (
            <>
              <span className="stock-indicator out-of-stock"></span>
              <span className="stock-text">Currently Unavailable</span>
            </>
          )}
        </div>

        {/* Features & Benefits */}
        <div className="product-features">
          <span className="feature-badge">Free Shipping</span>
          <span className="feature-badge">30-Day Returns</span>
          <span className="feature-badge">Authentic</span>
        </div>
      </div>
    </Link>
  );
}
