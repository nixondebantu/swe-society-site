"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const achievement_1 = require("../controllers/achievement");
router.route("/team/create").post(achievement_1.createTeam);
router.route("/team").get(achievement_1.getAllTeams);
router.route("/team/:teamid").put(achievement_1.updateTeam);
router.route("/team/:teamid").delete(achievement_1.deleteTeam);
router.route("/member/create").post(achievement_1.addTeamMember);
router.route("/member/:teamid").get(achievement_1.getTeamMembersByTeamId);
router.route("/member").get(achievement_1.getAllTeamMembers);
router.route("/member").delete(achievement_1.removeTeamMember);
router.route("/post/create").post(achievement_1.createAchievement);
router.route("/post/:achieveid").get(achievement_1.getAchievementById);
router.route("/post").get(achievement_1.getAllAchievements);
router.route("/post/:achieveid").put(achievement_1.updateAchievement);
router.route("/post/:achieveid").delete(achievement_1.deleteAchievement);
exports.default = router;
