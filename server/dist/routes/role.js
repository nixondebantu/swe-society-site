"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_1 = require("../controllers/role");
const validateBearerToken_1 = require("../middlewares/validateBearerToken");
const roleRoute = express_1.default.Router();
roleRoute.post("/", validateBearerToken_1.validateBearerToken, role_1.createRole);
roleRoute.put("/:roleid", validateBearerToken_1.validateBearerToken, role_1.updateRole);
roleRoute.delete("/:roleid", validateBearerToken_1.validateBearerToken, role_1.deleteRole);
roleRoute.put("/:roleid/default", validateBearerToken_1.validateBearerToken, role_1.updateDefaultRole);
roleRoute.get("/", role_1.getAllRole);
roleRoute.get("/:roleid", role_1.getRoleById);
exports.default = roleRoute;
