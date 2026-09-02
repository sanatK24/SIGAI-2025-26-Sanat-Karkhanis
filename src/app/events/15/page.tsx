
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "category": "Hackathon",
  "is_featured": false,
  "registration_link": null,
  "is_flagship": true,
  "id": "62818d19-4950-4521-b8c7-77763c8aadd7",
  "start_date": "2025-07-18",
  "title": "KLEOS 3.0: National Level Hackathon",
  "time": "All Day",
  "calculated_end_date": "2025-07-19",
  "description": "RAIT ACM Student Chapter, in collaboration with ACM-W and SIGAI, hosted KLEOS 3.0 – a national-level hackathon held on 19th July 2025 at Dr. D.Y. Patil’s Ramrao Adik Institute of Technology, Nerul. The event brought together innovation, teamwork, and technical excellence, attracting participation from over 400 teams nationwide.",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929491/Kleos_r1kufh.webp",
  "duration_days": 2,
  "relai": false,
  "registration_fee_member": 0,
  "idx": 15,
  "registration_fee_non_member": 50,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "location": "RAIT, Nerul"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
