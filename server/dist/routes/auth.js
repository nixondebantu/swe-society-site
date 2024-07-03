"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../controllers/auth");
router.route("/create").post(auth_1.createUser);
router.route("/createbymailing").post(auth_1.createUserWithMailSend);
router.route("/multiUserCreate").post(auth_1.createMultiUsersWithMailSend);
router.route("/updatePassword").post(auth_1.updateUserPassword); // for forget pass in login page
router.route("/login").post(auth_1.login);
router.route("/changePassword").put(auth_1.changePass); // for change pass in dashboard profile page
exports.default = router;
