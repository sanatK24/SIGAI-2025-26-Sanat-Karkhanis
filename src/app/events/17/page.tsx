
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "idx": 17,
  "time": "2:30 PM onwards",
  "registration_fee_non_member": 0,
  "relai": false,
  "id": "c1f7b8e9-2a9d-4c3a-8b1e-5f9a2d6c7b0d",
  "calculated_end_date": "2025-09-16",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929631/SYNARA2025_dihlyu.webp",
  "start_date": "2025-09-16",
  "category": "Magazine Launch",
  "is_featured": true,
  "duration_days": 1,
  "location": "6th Floor Auditorium (615), RAIT",
  "registration_fee_member": 0,
  "title": "SYNARA 2025 Magazine Launch",
  "updated_at": "2025-10-15 01:17:20.123456+00",
  "description": "Innovation. Intelligence. Impact. SYNARA 2025— a magazine where AI meets imagination, and the future takes form. The RAIT ACM SIGAI Student Chapter proudly unveils its inaugural edition, centred around the theme ‘Generative-AI’. This edition is not just launched — it’s unleashed.",
  "registration_link": null,
  "created_at": "2025-10-15 01:17:20.123456+00"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
