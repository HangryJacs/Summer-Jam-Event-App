export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  postcode: string;
  role: string;
  name?: string; // specific display name if needed, or derived from first+last
  location?: string; // derived from postcode
  ageBracket?: string; // derived from dob
  favoriteTeam?: string;
}

export interface ActivationStatus {
  id: string;
  name: string;
  completed: boolean;
  type: 'Challenge' | 'Retail' | 'Experience' | 'VIP' | 'Food' | 'Feedback' | 'General';
}

export interface EventDate {
  city: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  coordinates: { lat: number; lng: number };
}

export const EVENT_SCHEDULE: EventDate[] = [
  {
    city: 'Brisbane',
    date: '18 Jan',
    location: 'UQ, St. Lucia',
    status: 'Upcoming',
    coordinates: { lat: -27.4975, lng: 153.0137 }
  },
  {
    city: 'Perth',
    date: '24 Jan',
    location: 'Sterling Leisure Centre',
    status: 'Upcoming',
    coordinates: { lat: -31.9505, lng: 115.8605 }
  },
  {
    city: 'Melbourne',
    date: '26 Jan',
    location: 'Princes Gardens',
    status: 'Upcoming',
    coordinates: { lat: -37.8136, lng: 144.9631 }
  },
  {
    city: 'Sydney',
    date: '31 Jan',
    location: 'Sydenham Green',
    status: 'Upcoming',
    coordinates: { lat: -33.8688, lng: 151.2093 }
  },
  {
    city: 'Championship',
    date: '20-22 Feb',
    location: 'Peanut Farm Reserve, St Kilda',
    status: 'Upcoming',
    coordinates: { lat: -37.867, lng: 144.975 }
  }
];

export const BRAND_COLORS = {
  orange: '#FF7812',
  yellow: '#FFA605',
  red: '#FF4C29',
  teal: '#00A89E',
  blue: '#365CAB',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#0A0A0A'
};