export interface CONVENTION {
  id: number;
  name: string;
  description?: string | null;

  dateStart: string;
  dateEnd: string;
  location: string;
  venue?: string | null;

  website_url: string;
  attendee_count?: number | null;

  active: boolean;
  created_at: string;
  updated_at: string;
  
  latitude?: number | null;
  longitude?: number | null;
}
