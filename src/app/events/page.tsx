"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { FocusCards } from '@/components/ui/focus-cards';
import type { Speaker, EventDetails } from '@/types/event';

// Assuming Speaker and EventDetails interfaces are defined elsewhere
// export interface Speaker { ... }
// export interface EventDetails { ... }

export interface Event {
  relai?: boolean;
  id: number | string;
  idx?: number;
  title: string;
  description: string;
  time: string;
  location: string;
  image?: string;
  event_homepage_image?: string;
  event_template_image?: string;
  category?: string;
  is_featured?: boolean;
  is_flagship?: boolean;
  registration_link?: string | null;
  registration_fee_member?: number;
  registration_fee_non_member?: number;

  // Dates and Duration
  start_date: string;
  calculated_end_date?: string;
  duration_days?: number;

  // Timestamps
  created_at?: string;
  updated_at?: string;

  // Optional detailed properties that can be retained for flexibility
  slug?: string;
  speakers?: Speaker[];
  details?: EventDetails;
  tags?: string[];
  whatsappLink?: string;
}

// Helper function to format date
const formatEventDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

type TabType = 'all' | 'upcoming' | 'ongoing' | 'past' | 'flagship';

export default function EventsPage() {
  const [events, setEvents] = useState<{ all: Event[]; upcoming: Event[]; ongoing: Event[]; past: Event[]; flagship: Event[] }>({
    all: [],
    upcoming: [],
    ongoing: [],
    past: [],
    flagship: []
  });
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, 'event_list');
        const querySnapshot = await getDocs(eventsCollectionRef);
        // Filter out events with missing required fields
        const validEvents: Event[] = querySnapshot.docs
          .map(doc => doc.data() as Event)
          .filter(event => event && event.title && event.start_date);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming: Event[] = [];
        const ongoing: Event[] = [];
        const past: Event[] = [];
        const flagship: Event[] = [];

        validEvents.forEach((event: Event) => {
          const startDate = new Date(event.start_date);
          startDate.setHours(0, 0, 0, 0);

          // Use calculated_end_date if available, otherwise use start_date
          const endDate = event.calculated_end_date
            ? new Date(event.calculated_end_date)
            : new Date(event.start_date);
          endDate.setHours(23, 59, 59, 999);

          if (startDate > today) {
            // Event hasn't started yet
            upcoming.push(event);
          } else if (endDate >= today) {
            // Event has started and hasn't ended yet (ongoing)
            ongoing.push(event);
          } else {
            // Event has ended
            past.push(event);
          }

          // Also track flagship events separately
          if (event.is_flagship) {
            flagship.push(event);
          }
        });

        // Sort all events by date (descending - most recent first)
        validEvents.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

        // Sort upcoming events by date (ascending - soonest first)
        upcoming.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        // Sort ongoing events by end date (ascending - ending soonest first)
        ongoing.sort((a, b) => {
          const endA = a.calculated_end_date ? new Date(a.calculated_end_date) : new Date(a.start_date);
          const endB = b.calculated_end_date ? new Date(b.calculated_end_date) : new Date(b.start_date);
          return endA.getTime() - endB.getTime();
        });

        // Sort past events by date (descending - most recent first)
        past.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

        // Sort flagship events by date (descending - most recent first)
        flagship.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

        setEvents({ all: validEvents, upcoming, ongoing, past, flagship });
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const displayEvents =
    activeTab === 'all' ? events.all :
    activeTab === 'upcoming' ? events.upcoming :
    activeTab === 'ongoing' ? events.ongoing :
    activeTab === 'past' ? events.past :
    events.flagship;

  // Group events by year
  const groupEventsByYear = (events: Event[], isUpcoming: boolean) => {
    const grouped = events.reduce((acc, event) => {
      const year = new Date(event.start_date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as Record<number, Event[]>);

    // Sort events within each year
    Object.keys(grouped).forEach(year => {
      const yearNum = parseInt(year);
      grouped[yearNum].sort((a, b) => {
        return isUpcoming 
          ? new Date(a.start_date).getTime() - new Date(b.start_date).getTime() // Ascending for upcoming
          : new Date(b.start_date).getTime() - new Date(a.start_date).getTime(); // Descending for past
      });
    });

    return grouped;
  };

  const isChronological = activeTab === 'upcoming' || activeTab === 'ongoing';
  const eventsByYear = groupEventsByYear(displayEvents, isChronological);
  const sortedYears = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => isChronological ? a - b : b - a); // Sort years based on view

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Subtle Spotlight Effect */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="mb-12 pt-8">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/80 select-none">
              Events & Workshops
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
            Discover Events
          </h1>
          <p className="text-xl text-white/60 max-w-2xl select-none">
            Join us for exciting workshops, talks, and networking opportunities.
          </p>
        </div>
        
        {/* Toggle Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'upcoming'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            Upcoming Events
          </button>
          {events.ongoing.length > 0 && (
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'ongoing'
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
              }`}
            >
              Ongoing Events
            </button>
          )}
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'past'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setActiveTab('flagship')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'flagship'
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            Flagship Events
          </button>
        </div>

        <div className="space-y-16">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                  {year}
                </h2>
                <span className="text-sm text-white/40 uppercase tracking-wider">
                  {eventsByYear[year].length} {eventsByYear[year].length === 1 ? 'Event' : 'Events'}
                </span>
              </div>
              <FocusCards
                cards={eventsByYear[year].map(event => {
                  let whatsappLink: string | undefined = undefined;
                  if (typeof event.whatsappLink === 'string') {
                    whatsappLink = event.whatsappLink;
                  } else if (typeof event.registration_link === 'string') {
                    whatsappLink = event.registration_link;
                  } else if (typeof window !== 'undefined') {
                    const origin = window.location.origin;
                    whatsappLink = `https://wa.me/?text=${encodeURIComponent('Check out this event: ' + event.title + ' ' + origin + '/events/' + event.idx)}`;
                  }
                  return {
                    title: event.title,
                    src: event.image || event.event_template_image || event.event_homepage_image || 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927077/sigai-logo-transparent_pe6wup.webp',
                    link: `/events/${event.idx}`,
                    description: event.description,
                    date: formatEventDate(event.start_date),
                    location: event.location,
                    whatsappLink: whatsappLink
                  };
                })}
              />
            </div>
          ))}
        </div>

        {displayEvents.length === 0 && (
          <div className="text-center py-20 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {activeTab === 'all' ? 'No Events Found' :
               activeTab === 'upcoming' ? 'No Upcoming Events Yet' :
               activeTab === 'ongoing' ? 'No Ongoing Events' :
               activeTab === 'past' ? 'No Past Events' :
               'No Flagship Events'}
            </h3>
            <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
              {activeTab === 'all' ? 'There are no events available at the moment.' :
               activeTab === 'upcoming' ? 'We\'re working on bringing you amazing events soon. Stay tuned for announcements!' :
               activeTab === 'ongoing' ? 'No events are currently in progress. Check back soon or explore our upcoming events!' :
               activeTab === 'past' ? 'No past events to display yet. Start exploring our upcoming events!' :
               'No flagship events have been organized yet. Check our upcoming events to stay in the loop!'}
            </p>
            {activeTab !== 'all' && (
              <button
                onClick={() => setActiveTab('all')}
                className="px-6 py-3 rounded-xl bg-white text-black font-medium transition-all duration-300 shadow-lg shadow-white/20 hover:shadow-white/30"
              >
                View All Events
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
