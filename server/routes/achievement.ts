import express from "express";
const router = express.Router();

import {
    createTeam,
    getAllTeams,
    updateTeam,
    deleteTeam,

    addTeamMember,
    getAllTeamMembers,
    getTeamMembersByTeamId,
    removeTeamMember,

    createAchievement,
    getAllAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement,

    getUserAchievements,
    createTeamAndAchievement,
    getUserAchievementsAll
  } from "../controllers/achievement";
  import { validateBearerToken } from "../middlewares/validateBearerToken";



  router.route("/team/create").post(createTeam);
  router.route("/team").get(getAllTeams);
  router.route("/team/:teamid").put(updateTeam);
  router.route("/team/:teamid").delete(deleteTeam);

  router.route("/member/create").post(addTeamMember);
  router.route("/member/:teamid").get(getTeamMembersByTeamId);
  router.route("/member").get(getAllTeamMembers);
  router.route("/member").delete(removeTeamMember);

  router.route("/post/create").post(createAchievement);
  router.route("/post/:achieveid").get(getAchievementById);
  router.route("/post").get(getUserAchievementsAll);
  router.route("/post/:achieveid").put(updateAchievement);
  router.route("/post/:achieveid").delete(deleteAchievement);

  router.route("/individual/:userid").get(getUserAchievements);
  

  router.route("/post/fullachievement").post(validateBearerToken, createTeamAndAchievement);


  export default router;