import {Link} from 'react-router';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {ProductItem} from './ProductItem';

interface CustomProductsSectionProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  products: ProductItemFragment[];
  productsPerRow?: number;
  limit?: number;
  showViewAll?: boolean;
  viewAllText?: string;
  sectionWidth?: 'container' | 'fluid_container' | 'full_width';
  paddingTop?: number;
  paddingBottom?: number;
  collectionUrl?: string;
}

export function CustomProductsSection({
  heading = '11.11 Special: Extra 500 Rs Off',
  subheading = '',
  buttonText = '',
  buttonLink = '',
  products = [],
  productsPerRow = 4,
  limit = 8,
  showViewAll = true,
  viewAllText = 'View all',
  sectionWidth = 'container',
  paddingTop = 40,
  paddingBottom = 40,
  collectionUrl = '/collections/all',
}: CustomProductsSectionProps) {
  if (!products || products.length === 0) {
    return null;
  }

  const containerClass = 
    sectionWidth === 'fluid_container' 
      ? 'fluid_container' 
      : sectionWidth === 'full_width'
      ? 'full_width'
      : 'container';

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${productsPerRow}, minmax(0, 1fr))`,
  };

  return (
    <section
      className="custom-products-section"
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <div className={containerClass}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-text">
            {heading && (
              <h2 className="section-heading">{heading}</h2>
            )}
            {subheading && (
              <p className="section-subheading">{subheading}</p>
            )}
          </div>

          {buttonText && buttonLink && (
            <Link to={buttonLink} className="section-button">
              {buttonText}
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div
          className="product-grid gap-6 sm:gap-5"
          style={gridStyle}
        >
          {products.slice(0, limit).map((product, index) => (
            <div key={product.id || index} className="motion-item">
              <ProductItem
                product={product}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="view-all-button-container">
            <Link to={collectionUrl} className="view-all-link">
              {viewAllText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

