'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed right-8 z-50"
      style={{
        // On mobile, place above footer; on desktop, keep bottom-8
        bottom: '72px', // Footer height + margin (adjust as needed)
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Animated Circular Text */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin-slow"
            style={{ zIndex: 1 }}
          >
            <defs>
              <path
                id="circlePath"
                d="M40,8
                  a32,32 0 1,1 0,64
                  a32,32 0 1,1 0,-64"
              />
            </defs>
            <text
              fill="#fff"
              fontSize="9"
              fontWeight="bold"
              letterSpacing="3"
              style={{ textTransform: 'uppercase', dominantBaseline: 'middle' }}
            >
              <textPath
                xlinkHref="#circlePath"
                startOffset="0"
                alignmentBaseline="middle"
              >
                SCROLL UP • SCROLL UP • SCROLL UP •
              </textPath>
            </text>
          </svg>
          {/* Scroll Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent relative z-10"
          >
            <ChevronUp className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
