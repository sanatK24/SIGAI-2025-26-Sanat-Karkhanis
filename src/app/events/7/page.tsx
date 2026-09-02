
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "registration_link": null,
  "registration_fee_member": 0,
  "relai": false,
  "start_date": "2024-12-09",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929480/HOC_ybco9k.webp",
  "calculated_end_date": "2024-12-13",
  "category": "Community Event",
  "is_featured": false,
  "id": "2ed271e8-d360-4345-9093-679c3fbead6d",
  "idx": 7,
  "location": "Don Bosco High School, Seawoods",
  "time": "All Day",
  "title": "Hour Of Code",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "duration_days": 5,
  "description": "The RAIT ACM SIGAI Student Chapter conducted Hour of Code from December 9 to 13, 2024, at Don Bosco High School, Seawoods, Navi Mumbai. Non-core members taught children about Cyber Security, emphasizing online safety and the role of cyber police.",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "registration_fee_non_member": 0
};

export default function Page() {
  return <EventTemplate event={event} />;
}
