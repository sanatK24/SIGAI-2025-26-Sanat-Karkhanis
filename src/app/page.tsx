'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import TargetAudienceSection from '@/components/sections/target-audience-section';
import SpeakersSection from '@/components/sections/speakers-section';
import AgendaSection from '@/components/sections/agenda-section';
import FaqSection from '@/components/sections/faq-section';
import HostsSection from '@/components/sections/hosts-section';
// import RegistrationSection from '@/components/sections/registration-section';
import FooterSection from '@/components/sections/footer-section';
import FoundingCoreTestimonialsCarousel from '@/components/FoundingCoreTestimonialsCarousel';
import InstagramFeedSection from '@/components/InstagramFeedSection';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  testimony: string;
}

export default function HomePage() {
  const [foundingCoreTestimonials, setFoundingCoreTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Fetch and combine leadership and core team data
    Promise.all([
      fetch('/data/leadership.json').then(res => res.json()),
      fetch('/data/coreTeam.json').then(res => res.json())
    ]).then(([leadership, coreTeam]) => {
      const combined = [...leadership, ...coreTeam];
      setFoundingCoreTestimonials(combined);
    }).catch(error => {
      console.error('Error loading testimonials:', error);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <AboutSection />
      <TargetAudienceSection />
      <SpeakersSection />
      <FoundingCoreTestimonialsCarousel testimonials={foundingCoreTestimonials} />
      <AgendaSection />
      {/* <InstagramFeedSection /> */}
      <FaqSection />
      {/* Hosts section temporarily disabled
      <HostsSection />
      */}
      {/* Registration section temporarily disabled 
      <RegistrationSection />
      */}
      <FooterSection />
    </main>
  );
}
