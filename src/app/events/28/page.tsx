
'use client';
import EventTemplate from '../../../components/EventTemplate';
import type { Event } from '../../../types/event';

const event: Event = {
  "location": "Lab 301, Geoinformatics Lab, Ramrao Adik Institute of Technology, Nerul",
  "image": "https://res.cloudinary.com/dkqlmsxtg/image/upload/v1788098232/SIW_t1kmli.png",
  "description": "A three-day hands-on workshop organized by the Department of Computer Science and Engineering in collaboration with EDS Technologies and the RAIT ACM SIGAI Student Chapter. Participants explored Geographic Information Systems (GIS), GeoAI, satellite image analysis, ArcGIS, Google Earth Engine, and cloud-scale geospatial analytics through practical laboratory sessions.",
  "relai": false,
  "registration_fee_member": 0,
  "start_date": "2026-01-02",
  "time": "10:00 AM – 4:00 PM",
  "idx": 28,
  "updated_at": "2026-01-05 18:00:00+00",
  "calculated_end_date": "2026-01-05",
  "id": "spatial-intelligence-workshop-2026",
  "registration_fee_non_member": 50,
  "title": "Spatial Intelligence Workshop 2026",
  "is_featured": true,
  "duration_days": 3,
  "created_at": "2026-01-01 00:00:00+00",
  "category": "Workshop",
  "registration_link": null
};

export default function Page() {
  return <EventTemplate event={event} />;
}
