import express from "express";
const router = express.Router();

import {
    createSkill,
    getAllSkills,
    updateSkill,
    deleteSkill,
    createUserSkill,
    getAllUserSkills,
    updateUserSkill,
    deleteUserSkill
  } from "../controllers/skills";

  router.route("/create").post(createSkill);
  router.route("/").get(getAllSkills);
  router.route("/:skillId").put(updateSkill);
  router.route("/:skillId").delete(deleteSkill);

  router.route("/user/create").post(createUserSkill);
  router.route("/user").get(getAllUserSkills);
  router.route("/user/:userSkillId").put(updateUserSkill);
  router.route("/user/:userSkillId").delete(deleteUserSkill);

  export default router;