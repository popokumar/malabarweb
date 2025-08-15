import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Tire Collection",
      subtitle: "Experience Superior Performance",
      description: "Discover our extensive range of high-quality tires for all vehicle types. From passenger cars to heavy-duty trucks.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&fm=jpg&q=80",
      cta: "Shop Now",
      link: "/shop"
    },
    {
      id: 2,
      title: "Best Tire Deals",
      subtitle: "Unbeatable Prices & Quality",
      description: "Get the best value for your money with our competitive prices and premium tire brands. Free installation available.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&h=600&fit=crop&fm=jpg&q=80",
      cta: "View Offers",
      link: "/shop"
    },
    {
      id: 3,
      title: "Expert Tire Services",
      subtitle: "Professional Installation & Support",
      description: "Our certified technicians provide expert tire installation, balancing, and maintenance. Your safety is our priority.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=600&fit=crop&fm=jpg&q=80",
      cta: "Learn More",
      link: "/about"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container-fluid h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h2 className="text-sm font-medium text-gray-300 mb-2 tracking-wider uppercase">
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-xl">
                  {slide.description}
                </p>
                <Button size="lg" asChild className="bg-white text-black hover:bg-gray-100">
                  <Link to={slide.link}>
                    {slide.cta}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 z-20 text-white text-sm bg-black/30 px-3 py-1 rounded">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HeroSlider;