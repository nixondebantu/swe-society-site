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

router.route("/create").post(createUser);
router.route("/createbymailing").post(createUserWithMailSend);
router.route("/multiUserCreate").post(createMultiUsersWithMailSend);
router.route("/updatePassword").post(updateUserPassword); // for forget pass in login page
router.route("/login").post(login);
router.route("/changePassword").put(changePass); // for change pass in dashboard profile page

export default router;
