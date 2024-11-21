import express from "express";
const router = express.Router();

import {

  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventById,
} from "../controllers/events";
import { validateBearerToken } from "../middlewares/validateBearerToken";

router.route("/create").post(validateBearerToken, createEvent);
router.route("/:eventid").get(getEventById);
router.route("/").get(getAllEvents);
router.route("/:eventid").put(validateBearerToken, updateEvent);
router.route("/:eventid").delete(validateBearerToken, deleteEvent);


export default router;
