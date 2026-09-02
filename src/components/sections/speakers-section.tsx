"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { GlassIcon } from '../ui/glass-icon';
import { motion, useInView } from 'framer-motion';

interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
}

type Speaker = {
  name: string;
  title: string;
  image: string;
  color?: string;
  testimony: string;
  spotifyUrl: string;
  socials: {
    instagram: string;
    linkedin: string;
    github: string;
  };
  // Add any other fields that may exist in the JSON
  [key: string]: any;
};




const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      
      return () => clearTimeout(timeout);
    } else {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className="inline-block">
      {displayedText}
      <span 
        className={`inline-block w-2 h-6 bg-purple-400 ml-1 transition-opacity duration-300 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          verticalAlign: 'text-top',
          marginLeft: '2px'
        }}
      />
    </span>
  );
};

interface FacultySpeakerCardProps {
  speaker: Speaker;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const FacultySpeakerCard = ({
  speaker,
  active,
  className = '',
  style
}: FacultySpeakerCardProps) => {
  // ...existing code...

  if (!speaker || !speaker.image) {
    return (
      <div className={`relative w-full max-w-[450px] ${className}`} style={style}>
        <div className="relative bg-zinc-900/50 backdrop-blur-sm overflow-hidden flex items-center justify-center h-[380px]">
          <span className="text-gray-400">No image available</span>
        </div>
        <div className="mt-6 text-right pr-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-1 whitespace-nowrap">Faculty</p>
          <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-2 whitespace-nowrap overflow-hidden" style={{ textOverflow: 'clip', color: '#fff' }}>
            <span style={{ fontFamily: 'Arial, sans-serif', color: '#fff' }}>
              {speaker?.name || 'Unknown'}
            </span>
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full max-w-[450px] ${className}`}
      style={style}
    >
      {/* Main Card Container */}
      <div className="relative bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
        {/* Image Container without Clip Path - Fixed height to ensure equal card sizes */}
        <div className="relative w-full h-[380px] overflow-hidden bg-black">
          <Image
            src={speaker.image}
            alt={`Headshot of ${speaker.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-contain"
            style={{
              objectPosition: 'center center'
            }}
            priority={true}
          />
        </div>
      </div>

      {/* Text Content Below Image */}
      <div className="mt-6 text-right pr-6">
        <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-1 whitespace-nowrap">
          {speaker.name.includes('Sangita') ? 'Faculty Sponsor' : 'Mentor'}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-2 whitespace-nowrap overflow-hidden" style={{ textOverflow: 'clip', color: '#fff' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', color: '#fff' }}>
            {speaker.name}
          </span>
        </h3>
        <p className="text-white text-xs uppercase tracking-wider mt-2 whitespace-nowrap">
          {speaker.name.includes('Sangita')
            ? 'HOD, Computer Science and Engineering'
            : 'HOD, Information Technology'}
        </p>
        {/* LinkedIn Icon for Faculty */}
        {(speaker.socialLinks?.linkedin || speaker.socials?.linkedin || speaker.linkedin) ? (
          <div className="mt-4 flex justify-end">
            <GlassIcon
              href={speaker.socialLinks?.linkedin || speaker.socials?.linkedin || speaker.linkedin}
              iconSrc="https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927072/linkedin_1_ccf2ny.webp"
              alt="LinkedIn"
              className="hover:scale-110 transition-transform duration-200 w-10 h-10"
              iconClass="w-5 h-5"
              style={{ filter: 'invert(1)' }}
            />
          </div>
        ) : (
          <div className="mt-4 flex justify-end text-xs text-gray-400">No LinkedIn</div>
        )}
        {/* Bio button removed as requested */}
      </div>
    </div>
  );
};

interface CoreTeamCardProps {
  speaker: Speaker;
  index?: number;
  isCarouselInView?: boolean;
  isActive?: boolean;
}

const CoreTeamCard = ({ speaker, index = 0, isCarouselInView = true, isActive = false }: CoreTeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // Use a single blue gradient color to match the logo
  const cardGradient = 'linear-gradient(135deg, #1e5ed6 0%, #3ec6ff 100%)';
  const beigeColor = '#d4c5b9';

  return (
    <motion.div
      className="relative w-full min-w-0 sm:min-w-[368px] flex-shrink-0 group mt-10"
      style={{ height: '700px', maxWidth: '355px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={isCarouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base colored card */}
      <div
        className="absolute inset-0 rounded-[20px] sm:rounded-[32px] p-3 sm:p-7 flex flex-col transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
        style={{
          background: isHovered ? beigeColor : cardGradient,
          height: '650px',
          paddingBottom: '320px',
          justifyContent: 'flex-start',
          display: 'flex',
        }}
      >
        {/* Top badges and arrow */}
        <div className="flex justify-between items-start mb-3 sm:mb-6">
          <div className="flex gap-2">
            <div className="bg-white text-black text-xs sm:text-[13px] font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full whitespace-nowrap">
              Core Team
            </div>
            <div className="bg-white text-black text-xs sm:text-[13px] font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full">
              2025-26
            </div>
          </div>

          <a
            href={speaker.spotifyUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-11 sm:h-11 bg-black rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-45 flex-shrink-0"
            aria-label={`Listen to ${speaker.name}'s Spotify playlist`}
            title={`Listen to ${speaker.name}'s Spotify playlist`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 sm:w-7 sm:h-7"
              stroke="white"
              strokeWidth="2"
              fill="none"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>

        {/* Responsive text content */}
        <div style={{ minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <h2
            className="text-2xl sm:text-[38px] font-bold leading-[1.1] text-black mb-2 sm:mb-3 whitespace-nowrap"
            style={{ minHeight: 36, fontSize: speaker.name.length > 18 ? (window.innerWidth < 640 ? '18px' : '30px') : undefined, letterSpacing: '-1px', maxWidth: '100%', transform: speaker.name.length > 18 ? 'scale(0.95)' : undefined }}
          >
            {speaker.name}
          </h2>
          <p className="text-xs sm:text-[16px] text-black/75 font-medium mb-2 sm:mb-4" style={{ minHeight: 18 }}>
            {speaker.title}
          </p>
          <p className="text-xs sm:text-[15px] text-black/75 leading-relaxed line-clamp-3" style={{ minHeight: 36 }}>
            {speaker.testimony || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
        </div>
      </div>

      {/* Responsive image container - consistent aspect and spacing */}
      <div
  className="absolute bottom-0 w-full max-w-[390px] aspect-[3/4] min-h-[320px] sm:min-h-[420px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 mx-auto left-0 right-0 md:-translate-y-4 md:translate-y-20"
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 320px"
            priority={index < 3} // Only load first 3 images eagerly
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Social icons - responsive */}
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 flex flex-col gap-2 sm:gap-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            {speaker.socials?.instagram && (
              <div className="mb-2 sm:mb-4">
                <GlassIcon
                  href={speaker.socials.instagram}
                  iconSrc="https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927072/instagram_jpzmhl.webp"
                  alt="Instagram"
                  className="hover:scale-110 transition-transform duration-200 w-8 h-8 sm:w-10 sm:h-10"
                  iconClass="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
            )}
            {speaker.socials?.linkedin && (
              <div className="mb-2 sm:mb-4">
                <GlassIcon
                  href={speaker.socials.linkedin}
                  iconSrc="https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927072/linkedin_1_ccf2ny.webp"
                  alt="LinkedIn"
                  className="hover:scale-110 transition-transform duration-200 w-8 h-8 sm:w-10 sm:h-10"
                  iconClass="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
            )}
            {speaker.socials?.github && (
              <div className="mb-2 sm:mb-4">
                <GlassIcon
                  href={speaker.socials.github}
                  iconSrc="https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927077/sigai-logo-transparent_pe6wup.webp"
                  alt="GitHub"
                  className="hover:scale-110 transition-transform duration-200 w-8 h-8 sm:w-10 sm:h-10"
                  iconClass="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
            )}
          </div>

          {/*
          <a
            href="/team"
            className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-white/25 backdrop-blur-md text-white px-4 sm:px-7 py-2 sm:py-3.5 rounded-full text-xs sm:text-[15px] font-semibold flex items-center gap-2.5 transition-all duration-300 hover:bg-white/35 hover:backdrop-blur-lg hover:translate-x-1 shadow-lg border border-white/40"
            style={{
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)'
            }}
          >
            Read More
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          */}
        </div>
      </div>
    </motion.div>
  );
};

const SpeakersSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [leadership, setLeadership] = useState<Speaker[]>([]);
  const [coreTeam, setCoreTeam] = useState<Speaker[]>([]);
  useEffect(() => {
    fetch('/data/currentLeadership.json')
      .then(res => res.json())
      .then(data => {
        setLeadership(
          data.map((member: any) => ({
            name: member.name,
            title: member.title,
            image: member.image,
            color: member.color,
            testimony: member.testimony,
            spotifyUrl: member.spotifyUrl,
            socials: member.socials,
            ...member // include all other fields from JSON
          }))
        );
      });
    fetch('/data/currentCoreTeam.json')
      .then(res => res.json())
      .then(data => {
        setCoreTeam(
          data.map((member: any) => ({
            name: member.name,
            title: member.title,
            image: member.image,
            color: member.color,
            testimony: member.testimony,
            spotifyUrl: member.spotifyUrl,
            socials: member.socials,
            ...member // include all other fields from JSON
          }))
        );
      });
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: false,
    duration: 20
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const isCarouselInView = useInView(carouselRef, { once: true, amount: 0.2 });

  // Detect when section is fully visible
  // Remove auto-scroll and section visibility logic

  // Auto-scroll functionality - only when section is in view AND hovering

  // Scroll-triggered navigation - disabled during auto-scroll to avoid conflicts
  // Remove scroll-triggered navigation logic

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
  if (!emblaApi) return;
  const snap = emblaApi.selectedScrollSnap();
  setSelectedIndex(coreTeam.length > 0 ? snap % coreTeam.length : 0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const [facultySponsors, setFacultySponsors] = useState<any[]>([]);
  useEffect(() => {
    fetch('/data/faculty.json')
      .then(res => res.json())
      .then(data => setFacultySponsors(data));
  }, []);

  return (
    <div className="space-y-24 md:space-y-32 py-12 md:py-24">
      {/* Faculty Section */}
      <section id="faculty" className="relative py-16 md:py-24">
        <div className="container px-4 mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start text-left mb-16 px-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-gray-600" />
              <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                FACULTY COORDINATORS
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
              Meet Our <span className="text-primary">Faculty</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              The esteemed faculty members who guide and support RAIT ACM SIGAI.
            </p>
          </div>
          {/* Faculty Cards Grid */}
          <div className="relative max-w-5xl mx-auto px-5">
            {/* Desktop/tablet: diagonal arrangement */}
            <div className="hidden md:block relative h-[500px]">
              {/* Dr. Sangita top left, Dr. Pallavi bottom right (diagonal) */}
              <div className="absolute left-0 top-0 w-1/2 flex justify-start" style={{ transform: 'translateY(0)' }}>
                <FacultySpeakerCard 
                  speaker={facultySponsors[0]} 
                  active={true}
                  className="w-full"
                />
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 flex justify-end" style={{ transform: 'translateX(10px) translateY(80px)' }}>
                <FacultySpeakerCard 
                  speaker={facultySponsors[1]} 
                  active={true}
                  className="w-full"
                />
              </div>
            </div>
            {/* Mobile: stacked */}
            <div className="md:hidden grid grid-cols-1 gap-12">
              {facultySponsors.map((faculty) => (
                <div key={faculty.name} className="flex justify-center">
                  <FacultySpeakerCard 
                    speaker={faculty} 
                    active={true}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership and Core Team Section Combined with Diamond Layout */}
      <section id="leadership" className="relative py-16 md:py-24">
        <div className="container px-4 mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start text-left mb-16 px-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-gray-600" />
              <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                 RAIT ACM SIGAI STUDENT CHAPTER 
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
              Meet the <span className="text-primary">Core </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              The current leadership and core team driving the RAIT ACM SIGAI Student Chapter forward with innovation and dedication.
            </p>
          </div>
          {/* Diamond layout for desktop/tablet */}
          <div className="hidden md:flex flex-col items-center justify-center gap-0 mt-10">
            {/* Top row: 3 cards */}
            <div className="flex justify-center gap-10 mb-[-60px]">
              {[...leadership, ...coreTeam].slice(0, 3).map((member, idx) => (
                <CoreTeamCard key={member.name} speaker={member} index={idx} isActive={false} />
              ))}
            </div>
            {/* Bottom row: remaining cards, centered below the top row, shifted down on desktop */}
            <div className="flex justify-center gap-10 mt-8 md:mt-36">
              {[...leadership, ...coreTeam].slice(3).map((member, idx) => (
                <CoreTeamCard key={member.name} speaker={member} index={idx+3} isActive={false} />
              ))}
            </div>
          </div>

          {/* Carousel for mobile - vertically stacked */}
          <div className="md:hidden relative px-5" ref={carouselRef}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex flex-col gap-6 items-center">
                {[...leadership, ...coreTeam].map((member, idx) => (
                  <CoreTeamCard 
                    key={member.name}
                    speaker={member}
                    index={idx}
                    isActive={idx === selectedIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;