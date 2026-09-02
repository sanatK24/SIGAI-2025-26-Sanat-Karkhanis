
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "created_at": "2025-10-01 16:35:45.045377+00",
  "calculated_end_date": "2025-06-26",
  "time": "Not specified",
  "id": "646eef7e-e7d3-4e90-b1ae-bd100949841a",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "is_featured": false,
  "registration_fee_non_member": 50,
  "category": "Workshop",
  "title": "Exploring GeoAI",
  "registration_fee_member": 0,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929395/GeoAI_mi7jc2.webp",
  "location": "RAIT, Nerul",
  "start_date": "2025-06-26",
  "registration_link": null,
  "duration_days": 1,
  "relai": false,
  "idx": 13,
  "description": "The Department of Computer Science and Engineering at RAIT, in collaboration with Esri India and the RAIT ACM SIGAI Student Chapter, organized a workshop on “Exploring GeoAI: Spatial Intelligence and Research Applications using ArcGIS.” The session was conducted by Dr. Seema Joshi, Vice President, Strategic Initiatives, Esri India."
};

export default function Page() {
  return <EventTemplate event={event} />;
}
