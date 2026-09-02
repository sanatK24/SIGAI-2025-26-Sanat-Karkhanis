"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  testimony: string;
}

interface FoundingCoreTestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const FoundingCoreTestimonialsCarousel: React.FC<FoundingCoreTestimonialsCarouselProps> = ({ testimonials }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Triple the testimonials for seamless infinite scroll
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.7; // Pixels per frame (increased speed)

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled through one set
      const maxScroll = scrollContainer.scrollWidth / 3;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="w-full py-24 relative overflow-hidden bg-black">
      {/* Ambient gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(255, 77, 148, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section - Left Aligned */}
        <div className="mb-16">
          <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.15em'}}>
            FOUNDING CORE TEAM
          </p>
          <h2 className="font-bold text-5xl md:text-6xl leading-tight" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>
            <span className="text-white">Voices of Our </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
              }}
            >
              Leaders
            </span>
          </h2>
        </div>

        {/* Infinite Scrolling Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden pb-4"
          style={{
            scrollBehavior: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {infiniteTestimonials.map((testimonial, idx) => (
            <TestimonialCard 
              key={`${testimonial.name}-${idx}`} 
              testimonial={testimonial} 
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <div 
      className="group relative flex-shrink-0 rounded-3xl overflow-hidden transition-all duration-500"
      style={{
        width: '380px',
        height: '480px',
      }}
    >
      {/* Background Image - Avatar as background */}
      <div className="absolute inset-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
      </div>

      {/* Dark overlay - no blur to keep card visible */}
      <div 
        className="absolute left-0 top-0 w-full h-full transition-all duration-500 rounded-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 40%, rgba(0,0,0,1) 100%)'
        }}
      />

      {/* Additional dark overlay on hover for better text readability */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Content - Hidden testimonial, visible on hover */}
      <div className="relative z-10 p-10 h-full flex flex-col">
        {/* Top Section - Avatar and Badge - Hidden on default, visible on hover */}
        <div className="flex items-center justify-between mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
          {/* Small Avatar indicator */}
          <div 
            className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>

          {/* SIGAI Badge */}
          <div 
            className="px-5 py-2.5 rounded-full backdrop-blur-md"
            style={{
              background: 'rgba(30, 30, 35, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span 
              className="text-sm text-gray-300 font-semibold tracking-wide"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              RAIT ACM SIGAI
            </span>
          </div>
        </div>

        {/* Quote Icon - Blue - Hidden on default, visible on hover */}
        <div className="mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0" style={{transitionDelay: '100ms'}}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            className="opacity-60"
          >
            <text 
              x="0" 
              y="40" 
              fontSize="52" 
              fontWeight="bold" 
              fill="#3b82f6"
            >
              "
            </text>
          </svg>
        </div>

        {/* Testimonial Text - Hidden on default, visible on hover */}
        <div className="flex-1 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0" style={{transitionDelay: '200ms'}}>
          <p 
            className="text-white/90 text-base leading-relaxed"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            {testimonial.testimony}
          </p>
        </div>

        {/* Bottom Section - Name always visible at absolute bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-10">
          {/* Role - Only visible on hover */}
          <p 
            className="text-gray-300 text-sm leading-tight mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{fontFamily: 'Inter, sans-serif', fontWeight: 400, transitionDelay: '300ms'}}
          >
            {testimonial.role}
          </p>
          
          {/* Name - Always visible at bottom left */}
          <h4 
            className="text-white font-bold text-2xl leading-tight transition-all duration-500"
            style={{fontFamily: 'Montserrat, Inter, sans-serif'}}
          >
            {testimonial.name}
          </h4>
        </div>
      </div>

      {/* Subtle glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          boxShadow: 'inset 0 0 60px rgba(59, 130, 246, 0.15)',
        }}
      />
    </div>
  );
};

export default FoundingCoreTestimonialsCarousel;
