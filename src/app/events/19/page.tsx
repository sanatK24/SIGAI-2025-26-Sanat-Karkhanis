
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "registration_link": "https://forms.gle/mx6XXA37vy3FduqFA",
  "description": "Join industry professionals Jishanahmed AR Shaikh (Full Stack Developer at PassionBytes) and Kaiser M Momin (Data Analytics Specialist at Benzene Corporation) to learn, build, and innovate with next-gen AI applications. This workshop covers Agentic Workflows for smart automation, practical steps for MVP Building using AI, and the latest AI trends transforming education.",
  "duration_days": 1,
  "location": "Lab 413, RAIT",
  "title": "Leveraging AI in Education: MVP Building",
  "idx": 19,
  "start_date": "2025-10-07",
  "updated_at": "2025-10-15 03:00:00.123456+00",
  "time": "1:00 PM – 5:00 PM",
  "relai": false,
  "is_featured": true,
  "registration_fee_non_member": 0,
  "category": "Workshop",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929519/MVP_Building_Workshop_uhyiox.jpg",
  "id": "b5c2d9e1-4f8a-4b0c-9a7f-6g9h1i2j3k4l",
  "created_at": "2025-10-15 03:00:00.123456+00",
  "registration_fee_member": 0,
  "calculated_end_date": "2025-10-07"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
