
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "website_title": "Neural Nexus 2026",
  "id": "neural-nexus-2026",
  "is_flagship": true,
  "registration_link": "https://rait-sigai.acm.org/neural-nexus/",
  "start_date": "2026-02-02",
  "title": "Neural Nexus The AI Bootcamp 2026",
  "category": "Bootcamp",
  "is_featured": true,
  "calculated_end_date": "2026-02-06",
  "time": "9:00 AM Onwards",
  "registration_deadline": "2026-02-01 23:59:59 IST",
  "location": "RAIT, Nerul",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768929520/NEURAL_NEXUS_TV_BANNER_W_sa5h66.webp",
  "updated_at": "2025-12-27 12:00:00.000000+00",
  "sub_events": [
    {
      "title": "Neural Spark",
      "subtitle": "AI Ideathon",
      "date": "2nd Feb",
      "fee": "Rs. 50",
      "link": "https://rait-sigai.acm.org/neural-nexus/",
      "form_link": "https://forms.gle/KycsZxKEoV1rw3rw7",
      "image": "https://res.cloudinary.com/dojuhlxvc/image/upload/v1767004413/neural_spark_rkmprw.svg"
    },
    {
      "title": "Neural Circuit",
      "subtitle": "RL Tournament",
      "date": "3rd Feb",
      "fee": "Rs. 100",
      "link": "https://rait-sigai.acm.org/neural-nexus/",
      "form_link": "https://forms.gle/UYYDserQRzp48HGa9",
      "image": "https://res.cloudinary.com/dojuhlxvc/image/upload/v1767004411/neural_circuit_txl1v3.svg"
    },
    {
      "title": "Neural Rush",
      "subtitle": "Logic & Code Sprint",
      "date": "4th Feb",
      "fee": "Rs. 100",
      "link": "https://rait-sigai.acm.org/neural-nexus/",
      "form_link": "https://forms.gle/JF9wSPRNmHQX5uoG7",
      "image": "https://res.cloudinary.com/dojuhlxvc/image/upload/v1767004413/neural_rush_iom6bg.svg"
    },
    {
      "title": "Neural Invert",
      "subtitle": "Reverse Diffusion",
      "date": "5th Feb",
      "fee": "Rs. 100",
      "link": "https://rait-sigai.acm.org/neural-nexus/",
      "form_link": "https://forms.gle/qyRHoGKDN9DtWF3J8",
      "image": "https://res.cloudinary.com/dojuhlxvc/image/upload/v1767004412/neural_invert_oornc8.svg"
    },
    {
      "title": "Neural Advert",
      "subtitle": "AI Ad Challenge",
      "date": "5th Feb",
      "fee": "Rs. 100",
      "link": "https://rait-sigai.acm.org/neural-nexus/",
      "form_link": "https://forms.gle/wND7A68j7AsmNrsf7",
      "image": "https://res.cloudinary.com/dojuhlxvc/image/upload/v1767004410/neural_advert_qnzvo3.svg"
    },
    {
      "title": "Neural Clash",
      "subtitle": "AI Debate Competition",
      "date": "6th Feb",
      "fee": "Rs. 50",
      "link": "https://rait-sigai.acm.org/neural-nexus/",
      "form_link": "https://forms.gle/oNobZ1AgfkP4e3rRA",
      "image": "https://res.cloudinary.com/dojuhlxvc/image/upload/v1767004412/neural_clash_el0lyd.svg"
    }
  ],
  "idx": 24,
  "relai": false,
  "description": "Neural Nexus The AI Bootcamp 2026 is the upcoming edition of our flagship AI Bootcamp, brought to you by RAIT ACM SIGAI Student Chapter. Scheduled for February 2026, this week-long event will feature advanced workshops, hackathons, and expert panels. Stay tuned for more details!",
  "created_at": "2025-12-27 12:00:00.000000+00",
  "website_link": "https://rait-sigai.acm.org/neural-nexus/",
  "duration_days": 5
};

export default function Page() {
  return <EventTemplate event={event} />;
}
