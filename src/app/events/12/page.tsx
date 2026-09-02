
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "id": "2a3a3ae6-0288-43e8-9913-ac9d1b9f5002",
  "location": "Online",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "title": "AI Meets Quantum: Expert Talk",
  "is_featured": false,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "duration_days": 1,
  "registration_link": null,
  "registration_fee_non_member": 50,
  "registration_fee_member": 0,
  "relai": false,
  "calculated_end_date": "2025-04-14",
  "time": "11:00 AM",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929538/Quantum_hot8uc.webp",
  "description": "On the occasion of World Quantum Day, the Computer Science Engineering Department of RAIT, in collaboration with the RAIT ACM SIGAI Student Chapter, hosted a National Level Webinar. The event explored the convergence of Artificial Intelligence and Quantum Computing. It was conducted online on 14th April 2025 at 11:00 AM.",
  "start_date": "2025-04-14",
  "idx": 12,
  "category": "Expert Talk"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
