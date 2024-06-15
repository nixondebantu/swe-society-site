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
