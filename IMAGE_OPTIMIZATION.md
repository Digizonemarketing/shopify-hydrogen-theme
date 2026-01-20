# Product Image Optimization Guide

## Overview

This guide documents the image optimization improvements implemented across the Hydrogen storefront, focusing on responsive sizing, lazy loading, and performance optimization.

## Key Improvements

### 1. **Responsive Image Sizing**

Created `app/lib/image-utils.ts` with utility functions for image optimization:

- **`getResponsiveImageSizes()`** - Generates context-aware responsive image sizes
  - `product-card`: Mobile-first sizing for product grids
  - `product-gallery`: Large display for main product images
  - `product-thumbnail`: Small thumbnail sizes for galleries
  - `hero`: Full-width hero images

- **`generateImageSrcSet()`** - Creates optimized srcSet strings
  - Multiple width breakpoints (320px, 480px, 640px, 960px, 1280px, 1920px)
  - Quality optimization at 85% (best balance between quality and file size)
  - Optional WebP format support

### 2. **Lazy Loading & Performance**

Updated all product image components:

| Component | Optimization |
|-----------|--------------|
| **ProductImage.tsx** | Added `loading` prop, `decoding="async"`, improved placeholder |
| **ProductGallery.tsx** | Main image loads eagerly, thumbnails lazy; added `decoding="async"` |
| **ProductCard.tsx** | Responsive sizes, lazy loading by default, async decoding |

### 3. **Image Size Standards**

Predefined image dimensions in `IMAGE_SIZES`:

```typescript
THUMBNAIL: 100x100px     // Gallery thumbnails
CARD: 320x400px         // Product cards
PRODUCT_MAIN: 600x750px // Main product page
HERO: 1920x600px        // Hero sections
GALLERY_MAIN: 800x1000px // Gallery main images
```

### 4. **Smart Aspect Ratios**

- Product Cards: `1/1` (square)
- Product Gallery Main: `3/4` (portrait)
- Product Thumbnails: `1/1` (square)
- Thumbnails maintain consistent sizing for better UX

## Implementation Details

### ProductCard Component
```tsx
// Before: Fixed sizes attribute
sizes="(min-width: 64em) 320px, (min-width: 40em) 45vw, 90vw"

// After: Using utility function for consistency
sizes={getResponsiveImageSizes('product-card')}
loading={loading}
decoding="async"
```

### ProductGallery Component
```tsx
// Main image - loads eagerly for better perceived performance
<Image
  loading="eager"
  sizes={getResponsiveImageSizes('product-gallery')}
  decoding="async"
/>

// Thumbnails - lazy loaded to save bandwidth
<Image
  loading="lazy"
  sizes={getResponsiveImageSizes('product-thumbnail')}
  decoding="async"
/>
```

### ProductImage Component
```tsx
// Added priority prop for conditional eager loading
loading={priority ? 'eager' : loading}
decoding="async"
```

## Performance Benefits

1. **Reduced Page Load Time**
   - Lazy loading prevents unnecessary downloads
   - Smaller images for mobile devices
   - Async decoding doesn't block rendering

2. **Bandwidth Optimization**
   - 85% quality maintains visual quality with smaller file sizes
   - Device-specific sizing reduces data transfer
   - Thumbnail images are significantly smaller

3. **Better Core Web Vitals**
   - **LCP (Largest Contentful Paint)**: Eager loading for main images
   - **CLS (Cumulative Layout Shift)**: Defined aspect ratios prevent reflow
   - **FID (First Input Delay)**: Async decoding prevents main thread blocking

4. **Improved User Experience**
   - Faster initial page load
   - Smoother image gallery interactions
   - Better performance on mobile networks

## Usage Examples

### Using Image Utils in Custom Components

```typescript
import { getResponsiveImageSizes, generateImageSrcSet } from '~/lib/image-utils';

// In your component
<Image
  data={productImage}
  sizes={getResponsiveImageSizes('product-card')}
  loading="lazy"
  decoding="async"
/>

// For custom srcSet generation
const srcSet = generateImageSrcSet(imageUrl, [320, 480, 640, 960, 1280]);
```

### Preloading Critical Images

```typescript
import { preloadImage } from '~/lib/image-utils';

// In your head/layout
{preloadImage(criticalImageUrl, {
  imagesrcset: srcSetString,
  imagesizes: sizesString
})}
```

## Browser Compatibility

- `decoding="async"`: Chrome 85+, Firefox 92+, Safari 17+
- `loading="lazy"`: Chrome 76+, Firefox 75+, Safari 15.1+
- Fallbacks automatically handled by browsers that don't support these attributes

## Recommendations

1. **For High-Traffic Pages**
   - Preload critical above-the-fold images
   - Use `loading="eager"` for main product images
   - Keep thumbnail grid lazy-loaded

2. **For Mobile Optimization**
   - Test images on real devices with throttled connections
   - Consider using `webp` format with fallbacks
   - Monitor Core Web Vitals in Google Search Console

3. **Future Improvements**
   - Implement image compression service (Imgix, Cloudinary)
   - Add WebP format support with fallbacks
   - Consider AVIF format for modern browsers
   - Monitor and adjust quality settings based on analytics

## Testing Performance

Use these tools to validate optimization:

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **WebPageTest**: https://webpagetest.org/
3. **Lighthouse**: Built-in Chrome DevTools audit
4. **Image CDN Analysis**: Check Shopify's built-in image optimization

## Files Modified

- `app/lib/image-utils.ts` - New utility functions
- `app/components/ProductImage.tsx` - Updated with responsive sizes
- `app/components/ProductGallery.tsx` - Optimized main and thumbnail images
- `app/components/ProductCard.tsx` - Responsive sizing and lazy loading

## Shopify Image Optimization

Shopify automatically handles image optimization through their CDN. The `Image` component from `@shopify/hydrogen` leverages these features:

- Automatic format conversion (WebP for supported browsers)
- Responsive image sizing
- Quality optimization
- CDN delivery for fast loading

Ensure your queries include the `url` field for images to enable CDN optimization.
