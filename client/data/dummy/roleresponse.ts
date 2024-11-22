import { RoleAccessType } from "@/data/types";
import axios from "axios";
import { APIENDPOINTS } from "../urls";

export const fetchRoleAccess = async (): Promise<RoleAccessType> => {
  try {
    const response = await axios.get(APIENDPOINTS.users.getRoleAccess);
    return response.data;
  } catch (error) {
    console.error("Error fetching role access:", error);
    return {
      statistics: false,
      achievement: false,
      achievementmanage: false,
      blog: false,
      usersblog: false,
      member: false,
      notice: false,
      bulkmail: false,
      landingpage: false,
      events: false,
      ec: false,
      roles: false,
    };
  }
};
