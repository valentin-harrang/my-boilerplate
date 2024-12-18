export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  description: string | null;
  avatar_url: string | null;
  location: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string | null;
  full_name: string;
}
