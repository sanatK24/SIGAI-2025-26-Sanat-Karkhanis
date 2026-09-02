'use client';

import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';


type GalleryItem =
  | {
      type: 'image';
      id: number;
      src: string;
      alt: string;
      category: string;
      w: number;
      h: number;
      span?: 'normal' | 'wide' | 'tall' | 'large';
      fallbackSrc?: string;
    }
  | {
      type: 'text';
      id: string;
      content: string;
    };
//

const galleryItems: GalleryItem[] = [
  { type: 'image', id: 1, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929020/event_landscape_10.JPG_haasdk.webp', alt: 'event landscape 10', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 2, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928983/event_landscape.JPG_n9no5g.webp', alt: 'event landscape', category: 'Landscape', w: 6000, h: 3376 },
  { type: 'image', id: 3, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929030/team_sigai.JPG_i0zggv.webp', alt: 'behind the scenes 1', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'text', id: 'filler3', content: 'RAIT ACM SIGAI' },
  { type: 'image', id: 4, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928974/behind_the_scenes.JPG_ggkyrg.webp', alt: 'behind the scenes', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 5, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928987/event_landscape_6_zgtcof.webp', alt: 'event landscape 4', category: 'Landscape', w: 1007, h: 757 },
  { type: 'image', id: 6, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928986/event_landscape_2.JPG_gb5wt6.webp', alt: 'event landscape 2', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 7, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928981/event_landscape_3.JPG_irmy5o.webp', alt: 'event landscape 3', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 8, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928992/event_landscape_5_xhdctq.webp', alt: 'event landscape 5', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'text', id: 'filler1', content: 'Innovation in Action' },
  { type: 'image', id: 9, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928987/event_landscape_6_zgtcof.webp', alt: 'event landscape 6', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'text', id: 'filler2', content: 'Code. Create. Inspire.' },
  { type: 'image', id: 10, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928997/event_landscape_7.JPG_o1g3ls.webp', alt: 'event landscape 7', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 11, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929002/event_landscape_9.JPG_zp2uq8.webp', alt: 'event landscape 9', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 12, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929043/event_portrait.JPG_wyrf2c.webp', alt: 'event portrait', category: 'Portrait', w: 2268, h: 4032 },
  { type: 'image', id: 13, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768928997/event_landscape_8_nqieyh.webp', alt: 'event landscape 8', category: 'Landscape', w: 4240, h: 2400 },
  { type: 'image', id: 14, src: 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929000/event_portrait_2_jb4coh.webp', alt: 'event portrait 2', category: 'Portrait', w: 4786, h: 2692 },
  { type: 'text', id: 'filler4', content: 'AI for Everyone' },
  { type: 'text', id: 'filler6', content: 'Empowering Innovators' }
];

const categories = ['All', 'Events', 'Workshops', 'Hackathons', 'Team'];

export default function GalleryPage() {
  // const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const filteredItems = galleryItems;

  return (
    <div className="min-h-screen bg-black">
      <style jsx global>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 24vw;
          grid-auto-flow: dense;
          gap: 16px;
          padding: 16px;
          background-color: #000;
        }
        .grid-item {
          grid-column: span 1;
          grid-row: span 1;
          border-radius: 12px;
          overflow: hidden;
          background-color: #111;
          position: relative;
          cursor: pointer;
        }
        .span-col-2 {
          grid-column: span 2;
        }
        .span-row-2 {
          grid-row: span 2;
        }
        .span-col-3 {
          grid-column: span 3;
        }
        .grid-item img, .grid-item .object-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .grid-item:hover img, .grid-item:hover .object-cover {
          transform: scale(1.05);
        }
        .text-item {
          background: #111;
          border: 1px solid #2e2e2e;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .text-item h3 {
          color: #007aff;
          font-size: 1.5rem;
          text-align: center;
          line-height: 1.3;
          font-weight: 600;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-zinc-400">Gallery</h4>
          </div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] max-w-3xl leading-tight font-bold tracking-tighter text-white">
            Capturing <span className="text-primary">Moments</span> of{' '}
            <span className="text-primary">Innovation</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl">
            A visual journey through our events, workshops, hackathons, and memorable moments that define the RAIT ACM SIGAI community.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {/*
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Gallery Grid */}
      <div className="bento-grid">
        {filteredItems.map((item) => {
          if (item.type === 'image') {
            return (
              <div
                key={`img-${item.id}`}
                className={`group grid-item ${getGridClass(item.w, item.h)}`}
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg">
                    {item.alt}
                  </h3>
                </div>
              </div>
            );
          }
          if (item.type === 'text') {
            return (
              <div key={`txt-${item.id}`} className="grid-item span-col-1 text-item">
                <h3>{item.content}</h3>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedImage.type === 'image' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-primary/90 text-white text-sm font-semibold rounded-full mb-3">
                  {selectedImage.category}
                </span>
                <h2 className="text-white text-2xl font-bold">
                  {selectedImage.alt}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to get the right CSS class based on aspect ratio
function getGridClass(width: number, height: number) {
  const ratio = width / height;
  // Wide landscape (16:9 or wider)
  if (ratio > 1.5) {
    return 'span-col-2';
  }
  // Tall portrait (9:16 or taller)
  if (ratio < 0.7) {
    return 'span-row-2';
  }
  // Square-ish or 4:3
  return 'span-col-1';
}
