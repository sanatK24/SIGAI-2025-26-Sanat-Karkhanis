
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "website_title": "Kleos 4.0",
  "registration_link": "",
  "created_at": "2026-05-24 18:45:00+00",
  "calculated_end_date": "2026-06-20",
  "relai": false,
  "description": "Kleos 4.0 is a national-level 24-hour hackathon organized by the RAIT ACM Committee under Dr. D.Y. Patil Deemed to be University. Conducted collaboratively by RAIT ACM, ACM-W, ACM SIGAI, and ACM SC chapters, the event brings together students from across the country to build innovative solutions across multiple technology domains.",
  "category": "Hackathon",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1779691128/WhatsApp_Image_2026-05-25_at_12.04.37_oa0pw6.jpg",
  "idx": 27,
  "updated_at": "2026-05-24 18:45:00+00",
  "start_date": "2026-06-19",
  "is_featured": true,
  "time": "24 Hours",
  "title": "Kleos 4.0",
  "website_link": "https://rait.acm.org/kleos4/",
  "location": "RAIT, Nerul, Navi Mumbai",
  "id": "KLEOS4",
  "duration_days": 2,
  "is_flagship": true,
  "disableRegistration": true
};

export default function Page() {
  return <EventTemplate event={event} />;
}
