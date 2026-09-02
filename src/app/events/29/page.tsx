
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "registration_fee_non_member": 500,
  "time": "10:00 AM – 5:00 PM",
  "is_featured": true,
  "created_at": "2026-05-01 00:00:00+00",
  "registration_fee_outside": 5000,
  "eligibility": "Undergraduate engineering students with basic programming knowledge and an interest in Data Analytics, Artificial Intelligence, and Machine Learning.",
  "relai": false,
  "theme_scope": [
    "Python Programming for Data Analytics",
    "Exploratory Data Analysis (EDA)",
    "Machine Learning Fundamentals",
    "Deep Learning Concepts",
    "Data Visualization using Matplotlib and Seaborn",
    "Power BI Dashboard Development",
    "Streamlit Deployment",
    "Industry Analytics Workflows",
    "Healthcare and Finance AI Applications",
    "Project-Based Learning"
  ],
  "duration_days": 32,
  "objectives": [
    "Develop strong foundations in Python programming for data analytics.",
    "Perform exploratory data analysis and feature engineering on real-world datasets.",
    "Build and evaluate machine learning models using industry-standard workflows.",
    "Deploy interactive AI applications using Streamlit.",
    "Create business intelligence dashboards using Power BI.",
    "Complete an end-to-end guided analytics project with industry mentorship."
  ],
  "registration_link": null,
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1788098710/SIP-IDA-GD_BANNER_bnvodm.jpg",
  "updated_at": "2026-06-18 18:00:00+00",
  "id": "summer-internship-intelligent-data-analytics-2026",
  "location": "Lab 413, Ramrao Adik Institute of Technology, Nerul",
  "is_flagship": true,
  "calculated_end_date": "2026-06-18",
  "category": "Internship Program",
  "start_date": "2026-05-18",
  "description": "A one-month internship organized by the Department of Computer Science and Engineering in collaboration with the RAIT ACM SIGAI Student Chapter. The programme covered Python for Data Analytics, Exploratory Data Analysis, Machine Learning, Streamlit deployment, Power BI, and a guided project phase, enabling participants to build AI-driven, data-driven solutions for real-world applications.",
  "title": "Summer Internship Programme 2026 on Intelligent Data Analytics",
  "idx": 29,
  "registration_fee_member": 200
};

export default function Page() {
  return <EventTemplate event={event} />;
}
