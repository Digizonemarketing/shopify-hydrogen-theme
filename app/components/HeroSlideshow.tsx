import {useState, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Luxury Leather Collection',
    subtitle: 'Premium Craftsmanship',
    description: 'Discover our handcrafted leather bags made from the finest materials',
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/hero-leather-bags.jpg',
    buttonText: 'Shop Leather Bags',
    buttonLink: '/collections/leather-bags',
  },
  {
    id: 2,
    title: 'New Arrivals 2026',
    subtitle: 'Latest Designs',
    description: 'Explore the newest additions to our exclusive bag collection',
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/hero-new-arrivals.jpg',
    buttonText: 'View New Arrivals',
    buttonLink: '/collections/new-arrivals',
  },
  {
    id: 3,
    title: 'Designer Handbags',
    subtitle: 'Timeless Elegance',
    description: 'Elevate your style with our sophisticated designer handbag collection',
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/hero-designer-handbags.jpg',
    buttonText: 'Shop Handbags',
    buttonLink: '/collections/handbags',
  },
  {
    id: 4,
    title: 'Travel in Style',
    subtitle: 'Adventure Ready',
    description: 'Premium travel bags designed for the modern explorer',
    image: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/files/hero-travel-bags.jpg',
    buttonText: 'Shop Travel Bags',
    buttonLink: '/collections/travel-bags',
  },
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="hero-slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-image">
              <img
                src={slide.image}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
            <div className="slide-content">
              <div className="slide-text">
                <p className="slide-subtitle">{slide.subtitle}</p>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <a href={slide.buttonLink} className="slide-button">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="slide-nav slide-nav-prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="slide-nav slide-nav-next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
