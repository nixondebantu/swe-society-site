"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const skills_1 = require("../controllers/skills");
router.route("/create").post(skills_1.createSkill);
router.route("/").get(skills_1.getAllSkills);
router.route("/:skillId").put(skills_1.updateSkill);
router.route("/:skillId").delete(skills_1.deleteSkill);
router.route("/user/create").post(skills_1.createUserSkill);
router.route("/user").get(skills_1.getAllUserSkills);
router.route("/user/:userSkillId").put(skills_1.updateUserSkill);
router.route("/user/:userSkillId").delete(skills_1.deleteUserSkill);
router.route("/individual/:userid").get(skills_1.getUserSkills);
router.route("/individual/multiple").post(skills_1.addUserMultipleSkills);
exports.default = router;
