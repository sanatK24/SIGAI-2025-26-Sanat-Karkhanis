
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929475/Ignasia_kj6z3y.webp",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "location": "RAIT, Nerul",
  "is_featured": false,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "idx": 6,
  "registration_fee_non_member": 50,
  "registration_link": null,
  "relai": false,
  "registration_fee_member": 0,
  "description": "The RAIT ACM SIGAI Student Chapter conducted IGNASIA AI V1.0 on October 19, 2024, at Ramrao Adik Institute of Technology, Nerul. The workshop featured speakers Mr. Amey Shete and Mr. Dev Nirmal, engaging participants eager to explore AI and Machine Learning.",
  "id": "670ab564-5a06-432e-8089-dc159afaecd5",
  "time": "Not specified",
  "calculated_end_date": "2024-10-19",
  "category": "Workshop",
  "duration_days": 1,
  "start_date": "2024-10-19",
  "title": "IGNASIA AI v1.0"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
