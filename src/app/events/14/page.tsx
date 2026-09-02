
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "duration_days": 7,
  "calculated_end_date": "2025-07-06",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "idx": 14,
  "location": "RAIT, Nerul",
  "registration_link": null,
  "title": "Generative AI to Agentic AI Workshop",
  "time": "All Day",
  "is_featured": false,
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "start_date": "2025-06-30",
  "registration_fee_non_member": 50,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929623/STTP_rnhof8.webp",
  "registration_fee_member": 0,
  "category": "Workshop",
  "description": "The One Week STTP on “Generative to Agentic AI” at RAIT, Nerul, organized by the CSE Department and RAIT ACM SIGAI Student Chapter, concluded after six impactful days of cutting-edge knowledge and hands-on learning.",
  "id": "06a9d636-c1e6-4a65-86ef-b6f4f40dda98"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
