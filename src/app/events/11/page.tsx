
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929467/Harnessing_GenAI_pjefmx.webp",
  "category": "Workshop",
  "id": "525989d0-5fd7-438a-a674-e2a156c06815",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "registration_fee_member": 0,
  "registration_link": null,
  "time": "10:00 AM - 5:00 PM",
  "registration_fee_non_member": 50,
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "relai": false,
  "calculated_end_date": "2025-04-12",
  "is_featured": false,
  "start_date": "2025-04-12",
  "duration_days": 1,
  "idx": 11,
  "description": "The Department of Information Technology, in collaboration with RAIT ACM SIGAI and others, organized a one-day workshop held on 12th April 2025 from 10:00 AM to 5:00 PM at SAKEC, Chembur in a hybrid mode, featuring an insightful session by Mr. Nitin Kukreja from NPCI.",
  "location": "SAKEC, Chembur",
  "title": "Harnessing Generative AI"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
