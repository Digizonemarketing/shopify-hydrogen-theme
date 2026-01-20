import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
import {getResponsiveImageSizes} from '~/lib/image-utils';

export function ProductImage({
  image,
  loading = 'lazy',
  priority = false,
}: {
  image: ProductVariantFragment['image'];
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}) {
  if (!image) {
    return <div className="product-image bg-gray-200 rounded-lg" style={{ aspectRatio: '1 / 1' }} />;
  }

  return (
    <div className="product-image relative overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
      <Image
        alt={image.altText || 'Product Image'}
        width={640}
        height={640}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes={getResponsiveImageSizes('product-card')}
        loading={priority ? 'eager' : loading}
        decoding="async"
        crop="center"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
