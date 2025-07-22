export interface CONVENTION {
  id: number;
  name: string;
  description?: string | null;

  date_start: string;
  date_end: string;
  location: string;
  venue?: string | null;

  website_url: string;
  attendee_count?: number | null;

  active: boolean;
  created_at: string;
  updated_at: string;

  latitude?: number | null;
  longitude?: number | null;

  // Use for favourites
  is_favourite: boolean
}
