
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "id": "d528d2db-f6af-4a19-9ac7-9c3189daf77b",
  "registration_fee_member": 0,
  "registration_link": null,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929516/MongoDB_pyho44.webp",
  "category": "Workshop",
  "description": "The RAIT ACM SIGAI Student Chapter conducted the MongoDB Essentials Workshop on October 4, 2024, at Ramrao Adik Institute of Technology, Nerul. The session was led by Dr. Shubhangi N. Ghate and Dr. Dipti Jadhav.",
  "duration_days": 1,
  "relai": false,
  "idx": 3,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "calculated_end_date": "2024-10-04",
  "time": "Not specified",
  "is_featured": false,
  "registration_fee_non_member": 50,
  "title": "MongoDB Essentials Workshop",
  "location": "RAIT, Nerul",
  "start_date": "2024-10-04"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
