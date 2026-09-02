import { Event as EventType } from '@/types/event';

export async function getEvents(): Promise<EventType[]> {
  try {
    const response = await fetch('/data/events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getUpcomingEvents(limit: number = 6): Promise<EventType[]> {
  const events = await getEvents();
  const today = new Date();
  
  return events
    .filter(event => new Date(event.start_date) >= today)
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .slice(0, limit);
}

export async function getPastEvents(limit: number = 6): Promise<EventType[]> {
  const events = await getEvents();
  const today = new Date();
  
  return events
    .filter(event => new Date(event.start_date) < today)
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
    .slice(0, limit);
}

export type AttendanceType = 'basic' | 'yellow_flag' | 'hash';

export interface BasicAttendance {
  eventId: string | number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventTime: string;
  registrationId: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  branch: string;
  division: string;
  year: string;
  isAcmMember: boolean;
  membershipId: string | null;
  feeAmount: number;
  transactionId: string;
}

export interface YellowFlag {
  type: 'yellow_flag';
  reason?: string;
  participant: string;
  eventId: string | number;
  eventTitle: string;
  registrationId: string;
  flaggedAt: string;
}

export interface AttendanceRecord {
  types: AttendanceType[];
  hash: {
    type: 'hash';
    value: string;
  };
  yellowFlag?: YellowFlag | null;
  eventDetails: {
    eventId: string | number;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    eventTime: string;
  };
  createdAt: string;
}
