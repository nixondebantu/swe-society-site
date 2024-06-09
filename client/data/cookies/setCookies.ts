import Cookies from "js-cookie";
import { dpurl, jwt, username, userregno } from "./cookiesName";

export const setLoginCookies = (
  token: string,
  duration: number,
  fullname: string,
  profile_picture: string,
  regno: string
) => {
  Cookies.set(jwt, token, { expires: duration });
  Cookies.set(username, fullname, { expires: duration });
  Cookies.set(userregno, regno, { expires: duration });
  Cookies.set(dpurl, profile_picture, { expires: duration });
};
