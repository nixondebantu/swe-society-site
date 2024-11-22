import express from "express";
import {
  assignRole,
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  getRoleInfo,
  updateDefaultRole,
  updateRole,
} from "../controllers/role";
import { validateBearerToken } from "../middlewares/validateBearerToken";
const roleRoute = express.Router();

roleRoute.put("/assign", validateBearerToken, assignRole);
roleRoute.post("/", validateBearerToken, createRole);
roleRoute.put("/:roleid", validateBearerToken, updateRole);
roleRoute.delete("/:roleid", validateBearerToken, deleteRole);
roleRoute.put("/default/:roleid", validateBearerToken, updateDefaultRole);
roleRoute.get("/info", validateBearerToken, getRoleInfo);
roleRoute.get("/", getAllRole);
roleRoute.get("/:roleid", getRoleById);

export default roleRoute;
