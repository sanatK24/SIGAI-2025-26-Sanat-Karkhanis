
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "registration_fee_member": 0,
  "registration_link": null,
  "description": "The RAIT ACM SIGAI Student Chapter was officially launched on September 4, 2024, at Ramrao Adik Institute of Technology, Nerul. The event featured guest speaker Miss Naina Gupta Bandopadhyay and guest of honor Mr. Ehsan Ahmed Momim.",
  "category": "Launch Event",
  "title": "RAIT ACM SIGAI Student Chapter Launch",
  "start_date": "2024-09-04",
  "time": "Not specified",
  "idx": 1,
  "is_featured": false,
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "registration_fee_non_member": 0,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929638/Sigai_Launch_qorlja.webp",
  "location": "RAIT, Nerul",
  "calculated_end_date": "2024-09-04",
  "id": "2f7a603d-1498-4a9e-8ba5-e4264a400df3",
  "duration_days": 1,
  "created_at": "2025-10-01 16:35:45.045377+00",
  "relai": false
};

export default function Page() {
  return <EventTemplate event={event} />;
}
