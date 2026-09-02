
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929392/ESP_sigai_mno7qm.webp",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "location": "Online",
  "is_featured": false,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "idx": 4,
  "registration_fee_non_member": 50,
  "registration_link": null,
  "relai": false,
  "registration_fee_member": 0,
  "description": "The RAIT ACM SIGAI Student Chapter conducted the Eminent Speaker Program on October 9, 2024, featuring Dr. Karthika Vijayan. The online session focused on Conversational AI, its significance, and real-world applications.",
  "id": "87229c89-cb58-4f01-9ff6-d73755c2b4c0",
  "time": "Not specified",
  "category": "Expert Talk",
  "calculated_end_date": "2024-10-09",
  "start_date": "2024-10-09",
  "duration_days": 1,
  "title": "Eminent Speaker Program on Conversational AI"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
