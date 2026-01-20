import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {getResponsiveImageSizes} from '~/lib/image-utils';

type ProductImage = {
  id: string;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery">
        <div className="product-gallery-main">
          <div className="product-gallery-placeholder bg-gray-100 aspect-[3/4] rounded-lg flex items-center justify-center text-gray-500">
            No image available
          </div>
        </div>
      </div>
    );
  }

  const mainImage = images[selectedImageIndex];

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div className="product-gallery-main">
        <Image
          alt={mainImage.altText || `${title} - Image ${selectedImageIndex + 1}`}
          aspectRatio="3/4"
          data={mainImage}
          key={mainImage.id}
          sizes={getResponsiveImageSizes('product-gallery')}
          className="product-gallery-main-image w-full h-full object-cover"
          loading="eager"
          crop="center"
          decoding="async"
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="product-gallery-thumbnails mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`product-gallery-thumbnail flex-shrink-0 transition-all ${
                index === selectedImageIndex 
                  ? 'ring-2 ring-cyan-500 scale-100' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              onClick={() => setSelectedImageIndex(index)}
              type="button"
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === selectedImageIndex}
            >
              <Image
                alt={image.altText || `${title} - Thumbnail ${index + 1}`}
                aspectRatio="1/1"
                data={image}
                sizes={getResponsiveImageSizes('product-thumbnail')}
                loading="lazy"
                crop="center"
                decoding="async"
                className="w-20 h-20 object-cover rounded"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
