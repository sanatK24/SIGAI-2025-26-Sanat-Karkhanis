
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "duration_days": 1,
  "relai": false,
  "calculated_end_date": "2024-10-11",
  "category": "Expert Talk",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "registration_fee_non_member": 50,
  "description": "The RAIT ACM SIGAI Chapter hosted a session on The Power of Generative AI in Data Analytics on October 11, 2024. The event featured Mr. Akshay Ridlan, a Data Engineer, Animal Activist, and Founder of projectchetna.in and Pawfriend.in.",
  "updated_at": "2025-10-01 21:02:34.95979+00",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929395/GenAITalk_ihzvwj.webp",
  "registration_fee_member": 0,
  "start_date": "2024-10-11",
  "title": "Expert Talk: The Power of GenAI",
  "registration_link": null,
  "is_featured": false,
  "id": "737eccda-ba1a-4dbe-976d-49851da6cdda",
  "idx": 5,
  "time": "Not specified",
  "location": "RAIT, Nerul"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
