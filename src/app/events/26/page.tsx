
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "relai": false,
  "duration_days": 1,
  "category": "Workshop",
  "calculated_end_date": "2026-03-07",
  "created_at": "2026-03-05 00:00:00.000000+00",
  "registration_fee_non_member": 50,
  "description": "Breaking Systems to Build Robust Intelligence. A hands-on workshop focused on AI failure analysis, adversarial testing, and building more robust intelligent systems. Participants will stress-test real AI models, expose weaknesses, manipulate image and detection systems with minimal changes, understand how AI systems interpret inputs, and apply techniques to improve model robustness.",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1772725634/RobustAI_TV_BANNER_mt0hyh.png",
  "updated_at": "2026-03-05 00:00:00.000000+00",
  "registration_fee_member": 0,
  "start_date": "2026-03-07",
  "registration_link": "https://forms.gle/Bvi2e8ry8SoftMSX7",
  "title": "Robust AI Workshop",
  "is_featured": true,
  "id": "robust-ai-workshop-2026",
  "idx": 26,
  "time": "9:00 AM onwards",
  "location": "Lab 413, RAIT"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
