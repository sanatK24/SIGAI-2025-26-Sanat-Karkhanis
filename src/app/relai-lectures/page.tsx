"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  idx: number;
  id: string;
  title: string;
  description: string;
  start_date: string;
  calculated_end_date: string;
  image: string;
  event_template_image?: string;
  event_homepage_image?: string;
  registration_link?: string;
  relai?: boolean;
}

interface Video {
  id: string;
  title: string;
  description: string;
  relai?: boolean;
}

export default function RelaiLecturePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    fetch("/data/events_local.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.filter((e: Event) => e.relai === true)));
    fetch("/data/youtube.json")
      .then((res) => res.json())
      .then((data) => setVideos(data.filter((v: Video) => v.relai === true)));
    setNow(new Date());
  }, []);

  // Split events into upcoming and past
  const upcoming = events.filter(e => new Date(e.start_date) >= now);
  const past = events.filter(e => new Date(e.start_date) < now);

  // Helper to find video for a past event
  function getVideoForEvent(event: Event) {
    // Try to match by event title substring in video title, or by event id in video description
    return videos.find(v =>
      (v.title && event.title && v.title.toLowerCase().includes(event.title.split(' ')[0].toLowerCase())) ||
      (v.description && v.description.includes(event.id))
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Creative Announcement/Spam */}
        <div className="mb-10 rounded-3xl border border-primary/30 bg-primary/10 p-6 shadow-xl flex flex-col items-center text-center">
          <div className="mb-2 inline-block rounded-full bg-primary/90 px-4 py-1 text-xs font-bold text-white tracking-widest uppercase shadow">New Series</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 font-sans text-primary" style={{letterSpacing: '-0.03em'}}>RELAI</h1>
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 font-sans text-foreground">Recorded Education Lectures on Artificial Intelligence</h2>
          <div className="mb-2 text-sm font-medium text-primary">Starting 16th October 2025</div>
          <div className="mb-2 text-sm font-medium text-foreground">Venue: <span className="font-semibold">Online (Google Meet)</span> <span className="text-xs text-muted-foreground">— Will be uploaded on RAIT ACM SIGAI Student Chapter's YouTube channel</span></div>
          <div className="mb-2 text-sm font-bold text-green-600">FREE OF COST</div>
          <p className="mt-2 text-base text-foreground max-w-2xl mx-auto">
            RELAI is an initiative from RAIT ACM SIGAI Student Chapter where every month we host distinguished speakers from all over the globe to deliver innovative and insightful lectures on AI. Students get a chance to learn from industry leaders and renowned university professors. Join us to unlock new opportunities, network with experts, and stay ahead in the world of Artificial Intelligence!
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center font-sans text-foreground">Upcoming RELAI Lectures</h2>
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {upcoming.length === 0 && (
            <div className="col-span-2 text-center text-lg opacity-70">No upcoming RELAI lectures.</div>
          )}
          {upcoming.map(event => (
            <div key={event.id} className="rounded-xl bg-card/50 border border-border/20 shadow-lg overflow-hidden flex flex-col">
              <div className="relative aspect-video w-full">
                <img src={event.image || event.event_template_image || event.event_homepage_image || 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927077/sigai-logo-transparent_pe6wup.webp'} alt={event.title} className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 font-sans text-primary">{event.title}</h3>
                <p className="text-sm opacity-80 flex-1">{event.description}</p>
                <div className="mt-2 text-sm text-muted-foreground">{new Date(event.start_date).toLocaleDateString()}</div>
                {event.registration_link && (
                  <Link href={`/events/${event.idx}`} className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition">Register</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center font-sans text-foreground">Past RELAI Lectures</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {past.length === 0 && (
            <div className="col-span-2 text-center text-lg opacity-70">No past RELAI lectures.</div>
          )}
          {past.map(event => {
            const video = getVideoForEvent(event);
            return (
              <div key={event.id} className="rounded-xl bg-card/50 border border-border/20 shadow-lg overflow-hidden flex flex-col">
                <div className="relative aspect-video w-full">
                  {video ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title || 'RELAI Lecture'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <img src={event.image || event.event_template_image || event.event_homepage_image || 'https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768927076/sigai-logo_xk2vhl.webp'} alt={event.title} className="object-cover w-full h-full" />
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 font-sans text-primary">{event.title}</h3>
                  <p className="text-sm opacity-80 flex-1">{event.description}</p>
                  <div className="mt-2 text-sm text-muted-foreground">{new Date(event.start_date).toLocaleDateString()}</div>
                  {video && (
                    <div className="mt-2 text-xs text-muted-foreground">Watch on YouTube: <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer" className="underline">{video.title}</a></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
