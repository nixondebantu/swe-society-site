import express from "express";
const router = express.Router();

import {
  changePass,
  createMultiUsersWithMailSend,
  createUser,
  createUserWithMailSend,
  login,
  updateUserPassword,
} from "../controllers/auth";
import { validateBearerToken } from "../middlewares/validateBearerToken";

router.route("/create").post(validateBearerToken, createUser);
router
  .route("/createbymailing")
  .post(validateBearerToken, createUserWithMailSend);
router
  .route("/multiUserCreate")
  .post(validateBearerToken, createMultiUsersWithMailSend);
router.route("/updatePassword").post(updateUserPassword); // for forget pass in login page
router.route("/login").post(login);
router.route("/changePassword").put(validateBearerToken, changePass); // for change pass in dashboard profile page

export default router;
