
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "relai": false,
  "duration_days": 5,
  "category": "Community Event",
  "calculated_end_date": "2025-12-12",
  "created_at": "2025-12-14 16:10:00.000000+00",
  "event_gallery": [
    "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929698/HOA_DAY1_hr3jlf.webp",
    "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929495/HOA_DAY2_lmiqpb.webp",
    "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929685/HOA_DAY3_qxgym7.webp",
    "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929509/HOA_DAY4_jwlr25.webp",
    "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929673/HOA_CANDID_uvdw0m.webp"
  ],
  "registration_fee_non_member": 0,
  "description": "A 5-Day Interactive AI & Computing Education Program was conducted to introduce students aged 8–15 to the fundamentals of computing and artificial intelligence through engaging, hands-on learning. The event focused on building curiosity, confidence, and basic digital literacy using interactive storytelling, unplugged activities, games, mini-labs, and guided demonstrations.\n\nAcross five days, students explored concepts such as human vs machine intelligence, data and pattern recognition, AI applications and ethics, and hands-on AI simulations. The program concluded with a team-based showcase where participants presented their own AI-inspired ideas. The event encouraged logical thinking, teamwork, creativity, and responsible technology awareness, creating an enjoyable and meaningful learning experience for all participants.",
  "updated_at": "2025-12-14 16:10:00.000000+00",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929471/HourofAI_oz6epl.webp",
  "registration_fee_member": 0,
  "start_date": "2025-12-08",
  "registration_link": null,
  "title": "Hour of AI",
  "is_featured": true,
  "id": "hour-of-ai",
  "idx": 23,
  "time": "All Day",
  "location": "Don Bosco High School, Seawoods"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
