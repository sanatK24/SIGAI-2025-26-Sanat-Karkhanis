
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "created_at": "2025-10-01 16:35:45.045377+00",
  "time": "All Day",
  "title": "Neural Nexus: AI Bootcamp",
  "id": "40938a25-6133-447a-9ada-71a388509708",
  "website_title": "Neural Nexus AI",
  "description": "Neural Nexus: AI Bootcamp was conducted by RAIT ACM SIGAI Student Chapter from February 24th to March 1st, 2025 at Ramrao Adik Institute of Technology, Nerul. The week-long event featured panel discussions, coding competitions, debates, ideathons, and hands-on workshops.",
  "category": "Bootcamp",
  "registration_fee_member": 0,
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "registration_link": "https://rait-sigai.acm.org/neural-nexus/",
  "start_date": "2025-02-24",
  "duration_days": 7,
  "registration_fee_non_member": 50,
  "location": "RAIT, Nerul",
  "idx": 10,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929522/Neural-Nexus_ceiyjo.webp",
  "is_flagship": true,
  "calculated_end_date": "2025-03-02",
  "is_featured": false,
  "relai": false
};

export default function Page() {
  return <EventTemplate event={event} />;
}
