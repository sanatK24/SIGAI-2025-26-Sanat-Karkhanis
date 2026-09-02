"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';

// TEDx-style Speaker Card Component
interface SpeakerCardProps {
  name: string;
  role: string;
  image: string;
  testimony?: string;
  isSelected?: boolean;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  aspectRatio?: string; // e.g., "1/1" or "805/852"
  showHoverPanel?: boolean; // Control hover panel visibility
}

const SpeakerCard = ({ name, role, image, testimony, isSelected = false, socials, aspectRatio = "1/1", showHoverPanel = true }: SpeakerCardProps) => {
  // For faculty, use layout from Speaker section: role type above name in blue, actual role below name
  let roleType = '';
  let roleText = '';
  if (role?.includes('•')) {
    const parts = role.split('•');
    roleType = parts[1]?.trim() || '';
    roleText = parts[0]?.trim() || '';
  } else {
    roleText = role;
  }

  return (
    <div className="relative group">
      {/* Parallelogram Card Container */}
      <div
        className={`relative w-full overflow-hidden bg-black ${["2496/3744","853/1209"].includes(aspectRatio) ? "min-h-[300px] md:min-h-[340px]" : "min-h-[400px]"}`}
        style={{
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
          aspectRatio: aspectRatio,
        }}
      >
        {/* Image with object-contain to preserve aspect ratios */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain transition-all duration-500"
          style={{ objectPosition: 'center center' }}
        />
        {/* Gradient Overlay - visible by default if selected */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} />
        {/* Top Red Border - visible only on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%)',
          }}
        />
        {/* Bottom Red Border - visible only on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            clipPath: 'polygon(0% 0%, 90% 0%, 90% 100%, 0% 100%)',
          }}
        />
      </div>
      {/* Text Content Below */}
      <div className="mt-6 text-center">
        {roleType && (
          <span className="block text-xs font-semibold text-blue-500 mb-2 uppercase tracking-wide">{roleType}</span>
        )}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{name}</h3>
        {roleText && (
          <div className="mb-2 text-white text-base font-semibold tracking-wide">{roleText}</div>
        )}
        {/* Social Links */}
        {socials && (
          <div className="flex justify-center gap-3 mb-4">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400 hover:from-blue-900 hover:via-blue-700 hover:to-blue-500 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
            )}
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 via-gray-500 to-gray-400 hover:from-gray-900 hover:via-gray-700 hover:to-gray-500 flex items-center justify-center transition-all"
              >
                <Github className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600 via-pink-400 to-yellow-300 hover:from-pink-800 hover:via-pink-600 hover:to-yellow-400 flex items-center justify-center transition-all"
              >
                <Instagram className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



export default function TeamPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  // State for fetched data
  const [faculty, setFaculty] = useState<any[]>([]);
  const [currentLeadership, setCurrentLeadership] = useState<any[]>([]);
  const [currentCoreTeam, setCurrentCoreTeam] = useState<any[]>([]);
  const [leadership, setLeadership] = useState<any[]>([]);
  const [coreTeam, setCoreTeam] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/faculty.json').then(res => res.json()).then(setFaculty);
    fetch('/data/currentLeadership.json').then(res => res.json()).then(setCurrentLeadership);
    fetch('/data/currentCoreTeam.json').then(res => res.json()).then(setCurrentCoreTeam);
    fetch('/data/leadership.json').then(res => res.json()).then(setLeadership);
    fetch('/data/coreTeam.json').then(res => res.json()).then(setCoreTeam);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Static Background Image (fallback for video modal) */}
        <img
          src="https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927071/Launch_kptqrt.webp"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content - bottom left overlay */}
        <div className="absolute left-0 bottom-0 z-10 flex flex-col items-start px-8 pb-8 w-full max-w-full">
          {/* <h1 className="text-white font-black uppercase tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] mb-4 leading-none">
          </h1> */}
          <p className="text-white text-2xl md:text-4xl font-medium mb-6 max-w-xl">
            Building the Future with AI at forefront
          </p>
          {/* <button
            className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-semibold backdrop-blur hover:bg-white/30 transition"
            onClick={() => setShowVideoModal(true)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2" />
              <polygon points="10,8 16,12 10,16" fill="white" />
            </svg>
              Some Glimpses
          </button> */}
        </div>
        {/* Video Modal */}
        {showVideoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowVideoModal(false);
            }}
          >
            <div
              className="relative w-full max-w-3xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-50 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
                style={{ zIndex: 100 }}
                onClick={e => {
                  e.stopPropagation();
                  setShowVideoModal(false);
                }}
                aria-label="Close"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <video
                id="modal-video"
                src="/Untitled video - Made with Clipchamp.mp4"
                controls
                autoPlay
                className="w-full h-[60vh] object-cover bg-black"
              />
            </div>
          </div>
        )}
      </section>

      {/* Stats Section
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">50+</div>
            <p className="text-gray-400">Active Members</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">100+</div>
            <p className="text-gray-400">Events Hosted</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">5+</div>
            <p className="text-gray-400">Years Active</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">1000+</div>
            <p className="text-gray-400">Students Reached</p>
          </div>
        </div>
      </section> */}

      {/* Faculty Spotlight */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">Faculty Coordinators</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Guiding Vision & Excellence
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Under the mentorship of our dedicated faculty advisors, SIGAI continues to push boundaries in AI education and innovation.
            </p>
          </div>

          {/* Faculty Cards - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {faculty.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                aspectRatio={member.aspectRatio}
                isSelected={index === 0}
                showHoverPanel={false}
                socials={{
                  linkedin: member.socialLinks.linkedin
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Current Core Team Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">CORE</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Leadership & Core Team
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Leading SIGAI into the future with passion, dedication, and innovation
            </p>
          </div>

          {/* Current Leadership Cards - TEDx Style Grid (roles styled like Founding Core) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {currentLeadership.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.title}
                image={member.image}
                aspectRatio={
                  ["hiresh_chair.webp", "aastha_vc.webp", "rian_gs.webp"].includes(member.image.split('/').pop())
                    ? "2496/3744"
                    : "1/1"
                }
                isSelected={index === 0}
                socials={member.socials}
              />
            ))}
          </div>

          {/* Current Core Team Members - TEDx Style Grid (roles styled like Founding Core) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentCoreTeam.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.title}
                image={member.image}
                aspectRatio={
                  ["riddhi_treasurer.webp"].includes(member.image.split('/').pop())
                    ? "2496/3744"
                  : ["sanat.webp"].includes(member.image.split('/').pop())
                    ? "853/1209"
                  : "1/1"
                }
                socials={member.socials}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Founding Core Team Grid - Modern Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">FOUNDING CORE</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Our Founding Core Team
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The visionary leaders who laid the foundation for SIGAI's success
            </p>
          </div>

          {/* Leadership Cards - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {leadership.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                aspectRatio={member.aspectRatio}
                isSelected={index === 0}
                socials={member.socials}
              />
            ))}
          </div>

          {/* Core Team Members - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {coreTeam.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                aspectRatio={member.aspectRatio}
                socials={member.socials}
              />
            ))}
          </div>
        </div>
      </section>

      {/*
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Make<br />an Impact?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join our team during recruitment season and be part of something extraordinary. Shape the future of AI education with us.
          </p>
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:gap-4">
            Get Notified
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      */}
    </main>
  );
}
