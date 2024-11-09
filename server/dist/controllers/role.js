"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.updateDefaultRole = exports.getRoleById = exports.getAllRole = exports.deleteRole = exports.createRole = void 0;
const dbconnect_1 = __importDefault(require("../db/dbconnect"));
const errorWrapper_1 = __importDefault(require("../middlewares/errorWrapper"));
const getAllRole = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query(`SELECT * FROM Roles`);
    res.json(rows);
}), {
    statusCode: 500,
    message: "Couldn't get roles",
});
exports.getAllRole = getAllRole;
const getRoleById = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleid } = req.params;
    const { rows } = yield dbconnect_1.default.query(`SELECT * FROM Roles WHERE roleid = $1`, [
        roleid,
    ]);
    if (rows.length === 0) {
        return res.status(404).json({ message: "Role not found." });
    }
    res.json(rows[0]);
}), { statusCode: 500, message: "Couldn't get role by ID." });
exports.getRoleById = getRoleById;
const createRole = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roletitle, blogAccess, achievementAccess, bulkmailAccess, eventAccess, ecAccess, landingpageAccess, membersAccess, noticeAccess, rolesAccess, statisticsAccess, isDefaultRole, } = req.body;
    // Access Check
    const { rows: accessCheckRows } = yield dbconnect_1.default.query(`SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`, [req.jwtPayload.userid]);
    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
        return res.status(403).json({
            message: "Access denied. You do not have permission to create roles.",
        });
    }
    if (isDefaultRole) {
        const { rowCount } = yield dbconnect_1.default.query(`SELECT 1 FROM Roles WHERE isDefaultRole = true`);
        if (rowCount && rowCount > 0) {
            return res
                .status(400)
                .json({ message: "Only one default role is allowed." });
        }
    }
    const { rows } = yield dbconnect_1.default.query(`INSERT INTO Roles (roletitle, blogAccess, achievementAccess, bulkmailAccess, eventAccess, ecAccess, landingpageAccess, membersAccess, noticeAccess, rolesAccess, statisticsAccess, isDefaultRole) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`, [
        roletitle,
        blogAccess,
        achievementAccess,
        bulkmailAccess,
        eventAccess,
        ecAccess,
        landingpageAccess,
        membersAccess,
        noticeAccess,
        rolesAccess,
        statisticsAccess,
        isDefaultRole,
    ]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: "Failed to create role." });
exports.createRole = createRole;
const updateRole = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleid } = req.params;
    const { roletitle, blogAccess, achievementAccess, bulkmailAccess, eventAccess, ecAccess, landingpageAccess, membersAccess, noticeAccess, rolesAccess, statisticsAccess, } = req.body;
    const { rows: accessCheckRows } = yield dbconnect_1.default.query(`SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`, [req.jwtPayload.userid]);
    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
        return res.status(403).json({
            message: "Access denied. You do not have permission to create roles.",
        });
    }
    const { rows } = yield dbconnect_1.default.query(`UPDATE Roles SET roletitle = $1, blogAccess = $2, achievementAccess = $3, bulkmailAccess = $4, eventAccess = $5, ecAccess = $6, landingpageAccess = $7, membersAccess = $8, noticeAccess = $9, rolesAccess = $10, statisticsAccess = $11
         WHERE roleid = $12 RETURNING *`, [
        roletitle,
        blogAccess,
        achievementAccess,
        bulkmailAccess,
        eventAccess,
        ecAccess,
        landingpageAccess,
        membersAccess,
        noticeAccess,
        rolesAccess,
        statisticsAccess,
        roleid,
    ]);
    if (rows.length === 0) {
        return res.status(404).json({ message: "Role not found." });
    }
    res.json(rows[0]);
}), { statusCode: 500, message: "Failed to update role." });
exports.updateRole = updateRole;
const deleteRole = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleid } = req.params;
    //   Check if the super role
    if (roleid === "1") {
        return res.status(400).json({ message: "Cannot delete the super role." });
    }
    // Check if the role is default
    const { rows: defaultCheckRows } = yield dbconnect_1.default.query(`SELECT isDefaultRole FROM Roles WHERE roleid = $1`, [roleid]);
    if (defaultCheckRows.length === 0) {
        return res.status(404).json({ message: "Role not found." });
    }
    if (defaultCheckRows[0].isDefaultRole) {
        return res
            .status(400)
            .json({ message: "Cannot delete the default role." });
    }
    // Access check
    const { rows: accessCheckRows } = yield dbconnect_1.default.query(`SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`, [req.jwtPayload.userid]);
    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
        return res.status(403).json({
            message: "Access denied. You do not have permission to create roles.",
        });
    }
    // Find default role ID
    const { rows: defaultRoleRows } = yield dbconnect_1.default.query(`SELECT roleid FROM Roles WHERE isDefaultRole = true`);
    if (defaultRoleRows.length === 0) {
        return res
            .status(500)
            .json({ message: "No default role found for reassignment." });
    }
    const defaultRoleId = defaultRoleRows[0].roleid;
    // Update users with this role to the default role
    yield dbconnect_1.default.query(`UPDATE Users SET roleid = $1 WHERE roleid = $2`, [
        defaultRoleId,
        roleid,
    ]);
    // Delete the role
    yield dbconnect_1.default.query(`DELETE FROM Roles WHERE roleid = $1`, [roleid]);
    res.status(204).send();
}), { statusCode: 500, message: "Failed to delete role." });
exports.deleteRole = deleteRole;
const updateDefaultRole = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleid } = req.params;
    // Access check
    const { rows: accessCheckRows } = yield dbconnect_1.default.query(`SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`, [req.jwtPayload.userid]);
    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
        return res.status(403).json({
            message: "Access denied. You do not have permission to create roles.",
        });
    }
    try {
        // Start transaction
        yield dbconnect_1.default.query("BEGIN");
        // Set isDefaultRole = false for the current default role
        yield dbconnect_1.default.query(`UPDATE Roles SET isDefaultRole = false WHERE isDefaultRole = true`);
        // Set isDefaultRole = true for the specified role
        const { rows } = yield dbconnect_1.default.query(`UPDATE Roles SET isDefaultRole = true WHERE roleid = $1 RETURNING *`, [roleid]);
        if (rows.length === 0) {
            yield dbconnect_1.default.query("ROLLBACK"); // Rollback transaction on failure
            return res.status(404).json({ message: "Role not found." });
        }
        // Commit the transaction
        yield dbconnect_1.default.query("COMMIT");
        res.json(rows[0]);
    }
    catch (error) {
        yield dbconnect_1.default.query("ROLLBACK"); // Rollback transaction on error
        res.status(500).json({
            message: "Failed to update default role.",
            details: error,
        });
    }
}), { statusCode: 500, message: "Failed to update default role." });
exports.updateDefaultRole = updateDefaultRole;
