export interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  guest_count: number;
  dietary_notes?: string;
  message?: string;
}

export interface RSVPRecord extends RSVPFormData {
  id: number;
  created_at: string;
}

export interface RSVPSummaryResponse {
  total_responses: number;
  total_attending: number;
  total_declined: number;
  total_guests_expected: number;
  rsvps: RSVPRecord[];
}

export interface ProgramItem {
  time: string;
  title: string;
  description: string;
  iconType: "church" | "arrival" | "cocktail" | "ring" | "cake" | "dinner" | "party" | "dance";
}

export interface StoryChapter {
  title: string;
  subtitle: string;
  content: string;
  image?: string;
}

export interface MomentImage {
  src: string;
  title: string;
  caption: string;
}
