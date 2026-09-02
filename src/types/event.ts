export interface Registration {
  branch: string;
  division: string;
  email: string;
  eventDate: string;
  eventId: string | number;
  eventLocation: string;
  eventTime: string;
  eventTitle: string;
  feeAmount: number;
  firstName: string;
  isAcmMember: boolean;
  lastName: string;
  membershipId: string | null;
  phone: string;
  registeredAt: string;
  rollNumber: string;
  transactionId: string;
  year: string;
}

export interface Speaker {
  name: string;
  title: string;
  image?: string;
}

export interface EventPhase {
  name: string;
  date: string;
  topics: string[];
}

export interface EventDetails {
  relai?: boolean;
  overview?: string;
  topics?: string[];
  prerequisites?: string;
  whatToBring?: string;
  phases?: EventPhase[];
  challenge?: string[];
  [key: string]: any;
}


export interface Event {
  relai?: boolean;
  id: number | string;
  idx?: number;
  title: string;
  description: string;
  time: string;
  location: string;
  image?: string;
  event_homepage_image?: string;
  event_template_image?: string;
  agenda_image?: string;
  category?: string;
  is_featured?: boolean;
  is_flagship?: boolean;
  registration_link?: string | null;
  registration_deadline?: string;
  registration_fee_member?: number;
  registration_fee_non_member?: number;
  registration_fee_outside?: number;
  registration_fee?: number; // Optional registration fee property
  disableRegistration?: boolean; // Disable registration form for this event

  // Dates and Duration
  start_date: string;
  calculated_end_date?: string;
  duration_days?: number;

  // Timestamps
  created_at?: string;
  updated_at?: string;

  // Optional detailed properties that can be retained for flexibility
  slug?: string;
  speakers?: Speaker[];
  details?: EventDetails;
  tags?: string[];
  objectives?: string[];
  theme_scope?: string[];
  eligibility?: string;
  event_gallery?: string[];
  sub_events?: any[];
  website_title?: string;
  website_link?: string;
}