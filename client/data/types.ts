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
  achievementmanage: boolean;
  blog: boolean;
  usersblog: boolean;
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
  email: string;
  regno: string;
  session: string | null;
  role: string;
  roleid: number;
  roletitle: string;
}

export interface Achievement {
  teamid: number;
  eventname: string | null;
  organizer: string | null;
  venu: string | null;
  startdate: string | null;
  enddate: string | null;
  rank: string | null;
  rankarea: string | null;
  task: string | null;
  solution: string | null;
  techstack: string | null;
  resources: string | null;
  photos: string[] | null;
  approval_status: boolean | null;
}

export interface TableProps {
  data: MemberDataType[];
  selectedUserIds: number[];
  onSelectUser: (userId: number, selected: boolean) => void;
  onSelectAllVisible: (selectAll: boolean) => void;
}

export interface UserProfile {
  userid: number;
  fullname: string;
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
  skills: string[] | null;
}


export interface Role {
  roleid: number;
  roletitle: string;
  blogaccess: boolean;
  achievementaccess: boolean;
  bulkmailaccess: boolean;
  eventaccess: boolean;
  ecaccess: boolean;
  landingpageaccess: boolean;
  membersaccess: boolean;
  noticeaccess: boolean;
  rolesaccess: boolean;
  statisticsaccess: boolean;
  isdefaultrole: boolean;
}


export interface EventType {
  eventid: number;
  start_time: string;
  end_time: string;
  headline: string;
  event_details: string;
  coverphoto: string;
  fullname: string | null;
  created_time: string;
}

