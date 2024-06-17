import { LucideIcon } from "lucide-react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    Icon?: LucideIcon;
  }>;
}

export interface RoleAccessType {
  statistics: boolean;
  achievement: boolean;
  blog: boolean;
  member: boolean;
  notice: boolean;
  bulkmail: boolean;
  landingpage: boolean;
  events: boolean;
  ec: boolean;
  roles: boolean;
}

export interface UserDataType {
  reg: number;
  name: string;
  role: string;
  photourl: string;
}

export interface MemberRowType {
  regno: string;
  session: string;
  email: string;
}

export interface MemberDataType {
  userid: number;
  fullname: string | null;
  password: string;
  email: string;
  profile_picture: string | null;
  regno: string | null;
  session: string | null;
  phone_number: string | null;
  bio: string | null;
  linkedin_id: string | null;
  github_id: string | null;
  stop_stalk_id: string | null;
  whatsapp: string | null;
  facebook_id: string | null;
  blood_group: string | null;
  school: string | null;
  college: string | null;
  hometown: string | null;
  cv: string | null;
  experience: string | null;
  projects: string | null;
  is_alumni: string | null;
  role: string;
}

export interface UserProfile {
  userid: number;
  fullname: string;
  password: string;
  email: string;
  profile_picture: string;
  regno: string;
  session: string;
  phone_number: string;
  bio: string;
  linkedin_id: string;
  github_id: string;
  stop_stalk_id: string;
  whatsapp: string;
  facebook_id: string;
  blood_group: string;
  school: string;
  college: string;
  hometown: string;
  cv: string | null;
  experience: string | null;
  projects: string[] | null;
  is_alumni: boolean;
  role: string;
}
