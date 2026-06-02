import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    headline: 'BORN TO LEAD',
    subtext: 'Explore our motorcycle lineup that defines the road ahead',
    cta: 'Explore Now',
    link: '/products?category=motorcycle',
    bgClass: 'bg-gradient-to-br from-dark via-dark-light to-dark',
    accentColor: 'text-primary',
  },
  {
    headline: 'RIDE THE FUTURE',
    subtext: 'Zero emissions. Maximum thrill. Welcome to electric.',
    cta: 'Discover Electric',
    link: '/products?category=electric',
    bgClass: 'bg-gradient-to-br from-primary-dark via-primary to-primary-dark',
    accentColor: 'text-white',
  },
  {
    headline: 'PREMIA EXPERIENCE',
    subtext: 'Where luxury meets performance. Crafted for the discerning rider.',
    cta: 'View Premia',
    link: '/products',
    bgClass: 'bg-gradient-to-br from-dark-lighter via-dark-light to-dark',
    accentColor: 'text-gold',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoAdvance = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
  }, []);

  useEffect(() => {
    // Hide the static placeholder once the React HeroBanner component has mounted.
    // This ensures the static content is measured for LCP, then replaced by the interactive component.
    const staticHero = document.getElementById('static-hero-placeholder');
    if (staticHero) {
      staticHero.style.display = 'none';
    }

    startAutoAdvance();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoAdvance]);

  const goTo = useCallback(
    (index) => {
      setCurrent(index);
      startAutoAdvance();
    },
    [startAutoAdvance]
  );

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${slide.bgClass} ${
            index === current
              ? 'opacity-100 translate-x-0 z-10'
              : index < current
              ? 'opacity-0 -translate-x-full z-0'
              : 'opacity-0 translate-x-full z-0'
          }`}
        >
          {/* Bottom overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Slide Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1
              className={`text-5xl md:text-7xl font-black uppercase tracking-tight ${slide.accentColor}`}
            >
              {slide.headline}
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto opacity-80 text-white">
              {slide.subtext}
            </p>
            <Link
              to={slide.link}
              className="inline-block mt-8 px-8 py-3 bg-white text-dark font-semibold rounded-full hover:scale-105 transition-transform duration-200"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
        <div
          key={current}
          className="h-full bg-primary progress-bar-animate"
        />
      </div>

      {/* CSS for progress bar animation */}
      <style>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .progress-bar-animate {
          animation: progress-fill 4s linear forwards;
        }
      `}</style>
    </section>
  );
}
