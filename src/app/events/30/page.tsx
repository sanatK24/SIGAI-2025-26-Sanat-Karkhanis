
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "location": "413 Lab, Ramrao Adik Institute of Technology, Nerul",
  "details": {
    "phases": [
      {
        "name": "Phase 01 — Python Foundations",
        "date": "2026-09-05",
        "topics": [
          "Variables, Data Types & Loops",
          "Functions & OOP Concepts",
          "NumPy & Pandas"
        ]
      },
      {
        "name": "Phase 02 — Machine Learning",
        "date": "2026-09-06",
        "topics": [
          "AI & ML Fundamentals",
          "Machine Learning Concepts",
          "House Price Prediction Model",
          "Project Development"
        ]
      }
    ],
    "challenge": [
      "Calculator",
      "Password Generator",
      "Quiz Game"
    ]
  },
  "registration_link": "https://forms.gle/DSDf1cRYANCzLYdt7",
  "updated_at": "2026-08-31 00:00:00+00",
  "created_at": "2026-08-31 00:00:00+00",
  "description": "OMEGA is a 2-phase journey from Python fundamentals to the foundations of AI & Machine Learning, organized by RAIT ACM SIGAI Student Chapter. Phase 01 covers Python Foundations including Variables, Data Types, Loops, Functions, OOP Concepts, NumPy & Pandas. Phase 02 covers Machine Learning including AI & ML Fundamentals, Machine Learning Concepts, House Price Prediction Model, and Project Development. Participants also get to build their own Calculator, Password Generator, and Quiz Game.",
  "registration_fee_non_member": 50,
  "title": "OMEGA 2026",
  "duration_days": 2,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1788117306/OMEGA_GD_Banner_qd5ggb.jpg",
  "id": "omega-2026",
  "time": "9:00 AM – 5:00 PM",
  "is_flagship": false,
  "start_date": "2026-09-05",
  "registration_fee_member": 0,
  "is_featured": true,
  "category": "Workshop",
  "idx": 30,
  "relai": false,
  "calculated_end_date": "2026-09-06"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
