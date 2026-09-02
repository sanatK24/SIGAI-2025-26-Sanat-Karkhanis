
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "idx": 8,
  "id": "53b7a9ba-d12e-4870-b2d8-394ce6714e36",
  "category": "Internship",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929462/GenAI-WIP_qhh6zc.webp",
  "registration_fee_outside": 5000,
  "relai": false,
  "description": "RAIT ACM SIGAI Student Chapter, in collaboration with the CSE Department, conducted a one-month winter internship on Generative AI from December 16, 2024, to January 16, 2025. Participants explored the fundamentals of Generative AI, including VAEs, GANs, and Transformers.",
  "start_date": "2024-12-16",
  "calculated_end_date": "2025-01-14",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "duration_days": 30,
  "registration_fee_non_member": 500,
  "registration_link": null,
  "title": "Winter Internship Program: Generative AI",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "location": "RAIT, Nerul",
  "is_featured": false,
  "time": "All Day",
  "registration_fee_member": 200
};

export default function Page() {
  return <EventTemplate event={event} />;
}
