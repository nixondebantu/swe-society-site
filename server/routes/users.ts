import express from "express";
const router = express.Router();

import {
  deleteMultipleUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users";

router.route("/:userId").put(updateUser);
router.route("/").get(getAllUsers);
router.route("/:userId").get(getUserById);
router.route("/:userId").delete(deleteUser);
router.route("/").delete(deleteMultipleUser);

export default router;
