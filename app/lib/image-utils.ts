/**
 * Image optimization utilities for Shopify Hydrogen
 * Helps optimize product images with responsive sizing, lazy loading, and format selection
 */

export interface ImageOptimizationConfig {
  /** Maximum width for the image */
  maxWidth?: number;
  /** Quality level 1-100 (default: 85) */
  quality?: number;
  /** Enable WebP format */
  enableWebP?: boolean;
  /** Formats to generate */
  formats?: ('webp' | 'jpg' | 'png')[];
}

/**
 * Generate responsive image sizes for different breakpoints
 * Mobile-first approach with standard breakpoints
 */
export function getResponsiveImageSizes(
  context: 'product-card' | 'product-gallery' | 'product-thumbnail' | 'hero',
): string {
  const sizesMap = {
    'product-card': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px',
    'product-gallery': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
    'product-thumbnail': '(max-width: 640px) 25vw, 100px',
    'hero': '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw',
  };
  return sizesMap[context] || sizesMap['product-card'];
}

/**
 * Generate optimized Shopify image URL with parameters
 * Leverages Shopify's built-in image optimization
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
    crop?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  } = {},
): string {
  if (!imageUrl) return '';

  // Parse the Shopify image URL
  const url = new URL(imageUrl);

  // Apply transformations
  if (options.width) {
    url.searchParams.set('width', options.width.toString());
  }

  if (options.height) {
    url.searchParams.set('height', options.height.toString());
  }

  if (options.format) {
    url.searchParams.set('format', options.format);
  }

  if (options.quality) {
    url.searchParams.set('quality', Math.min(100, Math.max(1, options.quality)).toString());
  }

  if (options.crop && options.crop !== 'center') {
    url.searchParams.set('crop', options.crop);
  }

  return url.toString();
}

/**
 * Generate srcSet string for responsive images
 * Common breakpoints for product images
 */
export function generateImageSrcSet(
  imageUrl: string,
  widths: number[] = [320, 480, 640, 960, 1280, 1920],
  format?: 'webp' | 'jpg',
): string {
  if (!imageUrl) return '';

  return widths
    .map((width) => {
      const optimizedUrl = getOptimizedImageUrl(imageUrl, {
        width,
        quality: 85,
        format,
      });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimized image dimensions maintaining aspect ratio
 */
export function calculateImageDimensions(
  originalWidth: number | null | undefined,
  originalHeight: number | null | undefined,
  maxWidth: number,
  aspectRatio?: string,
) {
  if (aspectRatio) {
    const [ratioWidth, ratioHeight] = aspectRatio.split('/').map(Number);
    const height = Math.round((maxWidth * ratioHeight) / ratioWidth);
    return { width: maxWidth, height };
  }

  if (!originalWidth || !originalHeight) {
    // Default to square if dimensions unknown
    return { width: maxWidth, height: maxWidth };
  }

  const ratio = originalHeight / originalWidth;
  const height = Math.round(maxWidth * ratio);
  return { width: maxWidth, height };
}

/**
 * Common image sizes for different contexts
 */
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 100, height: 100 },
  CARD: { width: 320, height: 400 },
  PRODUCT_MAIN: { width: 600, height: 750 },
  HERO: { width: 1920, height: 600 },
  GALLERY_MAIN: { width: 800, height: 1000 },
} as const;

/**
 * Preload critical images for better performance
 */
export function preloadImage(
  imageUrl: string,
  options?: {
    as?: 'image';
    type?: string;
    imagesrcset?: string;
    imagesizes?: string;
  },
): string {
  // Return link tag HTML as string for use in head
  return `<link rel="preload" as="image" href="${imageUrl}" ${
    options?.imagesrcset ? `imagesrcset="${options.imagesrcset}"` : ''
  } ${options?.imagesizes ? `imagesizes="${options.imagesizes}"` : ''} />`;
}
