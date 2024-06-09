import Cookies from "js-cookie";
import { dpurl, jwt, username, userregno } from "./cookiesName";

export const clearCookies = () => {
  Cookies.remove(jwt);
  Cookies.remove(username);
  Cookies.remove(dpurl);
  Cookies.remove(userregno);
};
