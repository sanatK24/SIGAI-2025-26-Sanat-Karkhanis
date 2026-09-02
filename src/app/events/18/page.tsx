
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "calculated_end_date": "2025-10-04",
  "duration_days": 2,
  "created_at": "2025-10-01 19:50:35.569765+00",
  "idx": 18,
  "location": "Lab 413, RAIT, Nerul",
  "registration_link": null,
  "time": "9:00 AM onwards",
  "title": "Build Your 1st AI MODEL",
  "is_featured": false,
  "updated_at": "2025-10-02 02:57:56.277456+00",
  "start_date": "2025-10-4",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929394/BuildYourAIModel_xviylj.webp",
  "registration_fee_non_member": 50,
  "registration_fee_member": 0,
  "category": "Workshop",
  "id": "4976d7bd-42fc-4234-a2cf-29e2a1e8c274",
  "description": "This two-day workshop is designed to guide participants through the process of learning, creating, and launching their first AI project. Day 1 focuses on building a strong foundation, covering an introduction to Python for AI and the fundamentals of Machine Learning. The second day transitions into a practical, hands-on session where attendees will build their first AI model and receive valuable tips for implementation. Refreshments and certificates are included for all participants upon completion.",
  "relai": false
};

export default function Page() {
  return <EventTemplate event={event} />;
}
