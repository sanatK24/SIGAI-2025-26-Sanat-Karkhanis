
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "registration_deadline": "2025-12-03 17:29:59 IST",
  "created_at": "2025-11-05 16:00:00.000000+00",
  "calculated_end_date": "2026-01-07",
  "description": "Organized by the Department of Computer Science and Engineering, D Y Patil Deemed to be University – Ramrao Adik Institute of Technology, this one-month winter internship introduces participants to the world of Secure and Intelligent Quantum Computing. Covering Quantum Computing, Quantum Machine Learning, and Quantum Cybersecurity, the program provides hands-on experience with tools like Qiskit and IBM Quantum Lab, empowering learners to explore the future of computing and AI securely and intelligently.",
  "event_template_image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768930905/WIP2025_-_QUANTUM_-_FRONTPAGE_1080x1350_fox0bg.webp",
  "title": "Winter Internship on Secure and Intelligent Quantum Computing",
  "objectives": [
    "To introduce participants to the fundamentals of Quantum Computing and Quantum Information Science.",
    "To train participants in implementing Quantum Algorithms and exploring their applications in Machine Learning and AI.",
    "To provide hands-on exposure to tools such as Qiskit, Quantum Simulators, and the IBM Quantum Lab.",
    "To create awareness of Quantum Cybersecurity, Quantum Key Distribution (QKD), and Post-Quantum Threats.",
    "To encourage innovation, research, and project-based learning in futuristic quantum technologies."
  ],
  "theme_scope": [
    "Overview of Quantum Computing, Qubits, Quantum Gates, and Quantum Circuits.",
    "Introduction to Quantum AI/ML (QML) and real-world use-cases.",
    "Demonstration of Quantum Cryptography & QKD Protocols for quantum-secure communication.",
    "Exploration of research opportunities and career pathways in Quantum Technologies.",
    "Discussion on ethics, challenges, and global trends in Quantum Computing.",
    "Sessions by experts from Quantum industry, research labs, and academia."
  ],
  "registration_fee_outside": 5000,
  "time": "Full Day (As per schedule)",
  "agenda_image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768930931/WIP2025_-_QUANTUM_-_FRONTPAGE_1080x443_qsulmj.webp",
  "location": "Ramrao Adik Institute of Technology, Nerul, Navi Mumbai",
  "is_featured": true,
  "relai": false,
  "eligibility": "Undergraduate, postgraduate, and Ph.D. research scholars with a basic understanding of mathematics, computing, and AI concepts.",
  "registration_fee_non_member": 500,
  "category": "Internship Program",
  "duration_days": 32,
  "idx": 22,
  "registration_link": "https://forms.gle/G591vCvCgdqVwTk49",
  "updated_at": "2025-11-05 16:00:00.000000+00",
  "registration_fee_member": 200,
  "start_date": "2025-12-07",
  "id": "winter-quantum-int2025",
  "is_flagship": true,
  "event_homepage_image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1768930924/WIP2025_-_QUANTUM_-_FRONTPAGE_1080x_wgoyx0.webp"
};

export default function Page() {
  return <EventTemplate event={event} />;
}
