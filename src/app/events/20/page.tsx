
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "title": "ESP: From Past to Future - The Evolution and Advancement of AI",
  "calculated_end_date": "2025-10-07",
  "start_date": "2025-10-07",
  "category": "Guest Lecture",
  "id": "d6e3f0a1-7b8c-4a5e-9b6d-8f1g2h3i4j5k",
  "is_featured": true,
  "duration_days": 1,
  "registration_link": null,
  "created_at": "2025-10-15 03:15:00.123456+00",
  "relai": false,
  "idx": 20,
  "location": "Auditorium 615, RAIT",
  "updated_at": "2025-10-15 03:15:00.123456+00",
  "time": "10:00 AM onwards",
  "registration_fee_non_member": 0,
  "registration_fee_member": 0,
  "description": "Presented under the ACM India Eminent Speaker Programme, this session features Dr. R. Venkateswaran, a global pioneer with over 30 years of experience at Bell Labs, Lucent Technologies, and Persistent Systems. Uncover AI's past, present, and future, and learn from a trailblazer who lived the revolution.",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929393/ESP_Venkateswaran_tjysrw.jpg"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
