
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "time": "10:00 AM – 4:00 PM",
  "relai": false,
  "updated_at": "2025-10-02 02:56:20.592145+00",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929475/INGASIA_f1yixn.webp",
  "category": "Workshop",
  "created_at": "2025-10-01 16:35:45.045377+00",
  "idx": 16,
  "registration_link": "https://docs.google.com/forms/d/e/1FAIpQLSfs-0GbZLoVRkVICX8Rq9XPOAt_zAKf2CElce2_1jUiJSLMDA/viewform?usp=sharing",
  "registration_fee_member": 0,
  "id": "2ef243b2-454f-45cf-861c-35de3177ce56",
  "is_featured": false,
  "calculated_end_date": "2025-09-14",
  "duration_days": 2,
  "location": "Lab 413",
  "title": "IGNASIA WORKSHOP",
  "start_date": "2025-09-13",
  "registration_fee_non_member": 50,
  "description": "This comprehensive two-day workshop will guide participants from theory to practice. The first day is dedicated to building a solid foundation in AI and Machine Learning fundamentals. On the second day, attendees will engage in a hands-on session exploring advanced AI tools and their real-world applications. Refreshments will be provided during the event, and every participant will receive a certificate to recognize their completion of the workshop."
};

export default function Page() {
  return <EventTemplate event={event} />;
}
