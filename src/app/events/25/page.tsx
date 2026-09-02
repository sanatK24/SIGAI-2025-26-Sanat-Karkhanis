
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "is_featured": true,
  "title": "Distinguished Speaker Programme: Building Advanced AI Applications and Agents in One Hour",
  "duration_days": 1,
  "registration_fee_non_member": 0,
  "registration_deadline": "2026-01-10 10:00:00 IST",
  "created_at": "2026-01-04 00:00:00.000000+00",
  "id": "dsp-advanced-ai-2026",
  "updated_at": "2026-01-04 00:00:00.000000+00",
  "registration_link": "https://forms.gle/9Ruh9gbezEuWUNmCA",
  "location": "Live via Google Meet",
  "category": "Distinguished Speaker Programme",
  "relai": false,
  "start_date": "2026-01-10",
  "idx": 25,
  "description": "The RAIT ACM SIGAI Student Chapter presents a Distinguished Speaker Programme on 'Building Advanced AI Applications and Agents in One Hour'. This session focuses on practical application, moving beyond theory and demonstrations to build real AI live.\n\nWhat makes this session exceptional is its hands-on nature, where participants will go from zero to deployed AI agents using cutting-edge Large Language Models (LLMs) and Vision-Language Models (VLMs) in a focused sprint.\n\nDistinguished Speaker:\nDr. Mehdi Bahrami\nPrincipal Researcher, Fujitsu Research of America (California)\nSenior Member – ACM & IEEE\nIEEE Outstanding Engineer Awardee\n30+ publications | 34+ US patents\nSpeaker at Stanford, CMU, ACM & IEEE Conferences\n\nKey Learning Outcomes:\n- Building full-stack AI applications powered by LLMs & VLMs\n- Design and deployment of intelligent AI agents\n- Prompting, fine-tuning, and model selection (LLaMA & open-source models)\n- NLP, Computer Vision, decision-making, and automation\n- Scalable architectures, efficiency, and AI ethics",
  "time": "10:00 AM onwards",
  "registration_fee_member": 0,
  "calculated_end_date": "2026-01-10",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929391/DSP_FLYER_rzg9fe.webp"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
