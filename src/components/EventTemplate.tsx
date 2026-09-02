'use client';
import { useState, useEffect } from 'react';
import type { Event } from '../types/event';
import { ArrowLeft, Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// Add event prop type
interface EventTemplateProps {
  relai?: boolean;
  event: Event;
}
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
// Firebase config (reuse your config values)
const firebaseConfig = {
  apiKey: "AIzaSyD71xxKma112v9XYlbcrIHn-t50jZ3YbmI",
  authDomain: "sigaibackend.firebaseapp.com",
  projectId: "sigaibackend",
  storageBucket: "sigaibackend.firebasestorage.app",
  messagingSenderId: "817943217733",
  appId: "1:817943217733:web:30fc298499cbe64b54052c"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


// Accept event as a prop

export default function EventTemplate({ event }: EventTemplateProps) {
  // All hooks must be at the top level
  const [loading] = useState(false);
  const [currentFee, setCurrentFee] = useState<number>(0);


  if (loading) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const eventDate = new Date(event.start_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPastEvent = eventDate < today;
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Determine if the event is free (fallback conservative check)
  const isFreeEvent = ((event.registration_fee ?? 0) === 0) && (event.registration_fee_member === undefined && event.registration_fee_non_member === undefined);

  // (fee computation useEffect moved to top-level hooks to avoid conditional hook calls)

  return (
  <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Animated orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/events" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                  {event.category}
                </span>
                {isPastEvent && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                    Past Event
                  </span>
                )}
                {!isFreeEvent && (((event.registration_fee ?? 0) > 0) || (event.registration_fee_member !== undefined) || (event.registration_fee_non_member !== undefined)) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm">
                    {event.registration_fee_member !== undefined && event.registration_fee_non_member !== undefined
                      ? `₹${event.registration_fee_member} - ₹${event.registration_fee_non_member}`
                      : `₹${event.registration_fee ?? 0}`}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
              <Image
                src={event.image || event.event_template_image || event.event_homepage_image || 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929390/event-fallback_rsevgl.webp'}
                alt={event.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">About this event</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {event.description.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {event.sub_events && event.sub_events.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Individual Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.sub_events.map((sub, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-row gap-4 items-center">
                        {sub.image && (
                          <div className="relative min-w-[80px] w-20 h-20 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                            <Image src={sub.image} alt={sub.title} fill className="object-contain" style={{objectFit:'contain'}} />
                          </div>
                        )}
                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-lg font-semibold text-white truncate max-w-[10ch]">{sub.title}</span>
                            <span className="text-xs font-medium text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full">{sub.subtitle}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 mb-1">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-blue-400" />{sub.date}</span>
                            <span className="flex items-center gap-1"><span className="font-bold text-green-400">{sub.fee}</span></span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {sub.link && (
                              <Link href={sub.link} className="text-xs text-primary underline font-medium" target="_blank">Event Page</Link>
                            )}
                            {/* Only show Registration Form if subevent is not past */}
                            {(() => {
                              if (!sub.form_link) return null;
                              // Try to parse sub.date as a date in the current year
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              let subDate = null;
                              // Try to parse formats like '2nd Feb', '3rd Feb', etc.
                              const dateMatch = sub.date && sub.date.match(/(\d+)(?:st|nd|rd|th)?\s+(\w+)/i);
                              if (dateMatch) {
                                const day = parseInt(dateMatch[1], 10);
                                const monthStr = dateMatch[2];
                                const month = [
                                  'january','february','march','april','may','june','july','august','september','october','november','december'
                                ].findIndex(m => m.startsWith(monthStr.toLowerCase()));
                                if (month !== -1) {
                                  subDate = new Date(today.getFullYear(), month, day);
                                  subDate.setHours(0, 0, 0, 0);
                                  // If event is in Jan/Feb and today is Dec, assume next year
                                  if (subDate < today && month < today.getMonth() && today.getMonth() === 11) {
                                    subDate.setFullYear(today.getFullYear() + 1);
                                  }
                                }
                              }
                              if (subDate && subDate < today) return null;
                              return (
                                <Link href={sub.form_link} className="text-xs text-blue-400 underline font-medium" target="_blank">Registration Form</Link>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Speakers & Organizers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.speakers.map((speaker: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all">
                      {speaker.image ? (
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-white/20"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg font-semibold text-white border border-white/20">
                          {speaker.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">{speaker.name}</p>
                        <p className="text-sm text-gray-400">{speaker.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Event Details Summary - Always visible at top */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 space-y-3 text-sm shadow-xl">
                <h3 className="text-base font-semibold text-white mb-3">Event Details</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    Date
                  </span>
                  <span className="font-medium text-white">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    Time
                  </span>
                  <span className="font-medium text-white">{event.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    Location
                  </span>
                  <span className="font-medium text-white text-right">{event.location}</span>
                </div>
                {event.website_link && (
                  <div className="pt-3 border-t border-white/10">
                    <a href={event.website_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                      {event.website_title ? `${event.website_title} - Check out here` : 'Check out here'}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                )}
                {!isPastEvent && !isFreeEvent && (((event.registration_fee ?? 0) > 0) || (event.registration_fee_member !== undefined) || (event.registration_fee_non_member !== undefined)) && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <span className="text-gray-400 font-medium block mb-2">Registration Fees</span>
                    {event.registration_fee_member !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">ACM Members</span>
                        <span className="font-bold text-green-400">₹{event.registration_fee_member}</span>
                      </div>
                    )}
                    {event.registration_fee_non_member !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Non-Members</span>
                        <span className="font-bold text-blue-400">₹{event.registration_fee_non_member}</span>
                      </div>
                    )}
                    {(!event.registration_fee_member && !event.registration_fee_non_member && (event.registration_fee ?? 0) > 0) && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Fee</span>
                        <span className="font-bold text-green-400">₹{event.registration_fee ?? 0}</span>
                      </div>
                    )}
                  </div>
                )}
                {/* Registration */}
                {!isPastEvent && !event.disableRegistration && event.registration_link && (
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Register Here
                  </a>
                )}

                {!isPastEvent && !event.disableRegistration && !event.registration_link && (
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-sm text-gray-400">
                      Registration link is not available for this event.
                    </p>
                  </div>
                )}

                {isPastEvent && (
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-sm text-gray-400">
                      Registration for this event has ended.
                    </p>
                  </div>
                )}

                {event.disableRegistration && !isPastEvent && (
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-sm text-gray-400">
                      Registration is currently disabled for this event.
                    </p>
                  </div>
                )}
        </div> {/* sticky top-24 space-y-6 */}
      </div> {/* lg:col-span-1 */}
    </div> {/* grid grid-cols-1 lg:grid-cols-3 gap-12 */}
  </div> {/* relative z-10 max-w-7xl mx-auto px-6 py-12 */}
</div> {/* main wrapper */}
</div>
  );
}

