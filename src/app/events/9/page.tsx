
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "registration_link": null,
  "idx": 9,
  "start_date": "2025-02-08",
  "calculated_end_date": "2025-02-08",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929621/Semantix_hp66ce.webp",
  "is_featured": false,
  "category": "Workshop",
  "relai": false,
  "time": "All Day",
  "duration_days": 1,
  "id": "e26c787a-dd37-476a-9414-f6a43d264575",
  "registration_fee_non_member": 50,
  "location": "RAIT, Nerul",
  "registration_fee_member": 0,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "title": "Semantix: NLP & Sentiment Analysis Workshop",
  "description": "The SemantiX Workshop on NLP and Sentiment Analysis was a two-day hands-on training conducted by the CSE Department in collaboration with RAIT ACM SIGAI. It introduced participants to NLP fundamentals and practical sentiment analysis model development.",
  "updated_at": "2025-10-01 21:02:34.95979+00"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
