import express from "express";
const router = express.Router();

import {
  deleteMultipleUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users";
import { validateBearerToken } from "../middlewares/validateBearerToken";

router.route("/:userId").put(validateBearerToken, updateUser);
router.route("/").get(getAllUsers);
router.route("/:userId").get(getUserById);
router.route("/:userId").delete(validateBearerToken, deleteUser);
router.route("/").delete(validateBearerToken, deleteMultipleUser);

export default router;
