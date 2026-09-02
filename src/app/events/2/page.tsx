
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "website_title": "KAINOS AI",
  "title": "KAINOS AI Hackathon 2024",
  "location": "Online",
  "description": "The KAINOS AI Hackathon 2024 was a 24-hour online competition focused on healthcare, finance, smart cities, and environmental sustainability. Over 1,300 registrations led to 150 finalists competing on September 26, 2024.",
  "registration_fee_member": 0,
  "start_date": "2024-09-26",
  "website_link": "https://rait-sigai.acm.org/kainos/",
  "idx": 2,
  "id": "d217d00f-ba1b-4802-b0b3-e2b54aaaaaeb",
  "time": "24 hours",
  "is_featured": false,
  "relai": false,
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "calculated_end_date": "2024-09-29",
  "registration_fee_non_member": 50,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929476/Kainos_tg0uqu.webp",
  "category": "Hackathon",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "is_flagship": true,
  "registration_link": null,
  "duration_days": 4
};

export default function Page() {
  return <EventTemplate event={event} />;
}
