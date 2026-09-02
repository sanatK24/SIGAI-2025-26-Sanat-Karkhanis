
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "website_link": "https://rait-sigai.acm.org/home/relai-lectures/",
  "registration_fee_member": 0,
  "website_title": "RELAI Lecture Series",
  "registration_link": "#",
  "description": "RELAI (Recorded Education Lectures on Artificial Intelligence) is a monthly lecture series connecting students with global AI experts. This inaugural session features Dr. Jessica Cervi, an AI & Data Science Educator with experience across MIT xPRO, UC Berkeley, and Columbia University. Explore the intersection of AI and cybersecurity, understand emerging risks with generative models, and learn how to build safer, smarter AI systems.",
  "category": "Webinar",
  "title": "RELAI YouTube Lecture 1",
  "start_date": "2025-10-16",
  "idx": 21,
  "time": "2:00 PM onwards",
  "updated_at": "2025-10-15 02:15:30.123456+00",
  "is_featured": true,
  "registration_fee_non_member": 0,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929634/RELAI_Jessica_Cervi_juhqfs.png",
  "location": "Online (Google Meet)",
  "calculated_end_date": "2025-10-16",
  "duration_days": 1,
  "id": "a4b1c8d0-3e7f-4a9b-8c6d-1f5e9b3a2c7e",
  "relai": true,
  "created_at": "2025-10-15 02:15:30.123456+00",
  "is_flagship": true
};

export default function Page() {
  return <EventTemplate event={event} />;
}
