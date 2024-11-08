import express from "express";
import {
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  updateDefaultRole,
  updateRole,
} from "../controllers/role";
import { validateBearerToken } from "../middlewares/validateBearerToken";
const roleRoute = express.Router();

roleRoute.post("/", validateBearerToken, createRole);
roleRoute.put("/:roleid", validateBearerToken, updateRole);
roleRoute.delete("/:roleid", validateBearerToken, deleteRole);
roleRoute.put("/:roleid/default", validateBearerToken, updateDefaultRole);
roleRoute.get("/", getAllRole);
roleRoute.get("/:roleid", getRoleById);

export default roleRoute;
