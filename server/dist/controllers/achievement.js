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
exports.deleteAchievement = exports.updateAchievement = exports.getAchievementById = exports.getAllAchievements = exports.createAchievement = exports.removeTeamMember = exports.getTeamMembersByTeamId = exports.getAllTeamMembers = exports.addTeamMember = exports.deleteTeam = exports.updateTeam = exports.getAllTeams = exports.createTeam = void 0;
const errorWrapper_1 = __importDefault(require("../middlewares/errorWrapper"));
const CustomError_1 = __importDefault(require("../services/CustomError"));
const dbconnect_1 = __importDefault(require("../db/dbconnect"));
// Create a new team
const createTeam = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamname } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Teams (teamname) VALUES ($1) RETURNING *', [teamname]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create team` });
exports.createTeam = createTeam;
// Get all teams
const getAllTeams = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Teams');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get teams` });
exports.getAllTeams = getAllTeams;
// Update a team
const updateTeam = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamid } = req.params;
    const { teamname } = req.body;
    const { rows } = yield dbconnect_1.default.query('UPDATE Teams SET teamname = $1 WHERE teamid = $2 RETURNING *', [teamname, teamid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Team not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update team` });
exports.updateTeam = updateTeam;
// Delete a team
const deleteTeam = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamid } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Teams WHERE teamid = $1', [teamid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Team not found', 404);
    }
    res.json({ message: 'Team deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete team` });
exports.deleteTeam = deleteTeam;
//---------------------------- team members-----------------------
const addTeamMember = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, teamid } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO TeamMembers (userid, teamid) VALUES ($1, $2) RETURNING *', [userid, teamid]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't add team member` });
exports.addTeamMember = addTeamMember;
// Get all team members
const getAllTeamMembers = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM TeamMembers');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get team members` });
exports.getAllTeamMembers = getAllTeamMembers;
// Get team members by team ID
const getTeamMembersByTeamId = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamid } = req.params;
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM TeamMembers WHERE teamid = $1', [teamid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('No members found for this team', 404);
    }
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get team members by teamid` });
exports.getTeamMembersByTeamId = getTeamMembersByTeamId;
// Remove a user from a team
const removeTeamMember = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, teamid } = req.body;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM TeamMembers WHERE userid = $1 AND teamid = $2', [userid, teamid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Team member not found', 404);
    }
    res.json({ message: 'Team member removed successfully' });
}), { statusCode: 500, message: `Couldn't remove team member` });
exports.removeTeamMember = removeTeamMember;
// Achievement posts
const createAchievement = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status } = req.body;
    const { rows } = yield dbconnect_1.default.query(`INSERT INTO Achievements (teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create achievement` });
exports.createAchievement = createAchievement;
// Get all achievements
const getAllAchievements = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Achievements');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get achievements` });
exports.getAllAchievements = getAllAchievements;
// Get an achievement by ID
const getAchievementById = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { achieveid } = req.params;
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Achievements WHERE achieveid = $1', [achieveid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Achievement not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't get achievement by achieveid` });
exports.getAchievementById = getAchievementById;
// Update an achievement
const updateAchievement = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { achieveid } = req.params;
    const { teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status } = req.body;
    const { rows } = yield dbconnect_1.default.query(`UPDATE Achievements SET teamid = $1, eventname = $2, organizer = $3, venu = $4, startdate = $5, enddate = $6, rank = $7, rankarea = $8, task = $9, solution = $10, techstack = $11, resources = $12, photos = $13, approval_status = $14
             WHERE achieveid = $15 RETURNING *`, [teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status, achieveid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Achievement not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update achievement` });
exports.updateAchievement = updateAchievement;
// Delete an achievement
const deleteAchievement = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { achieveid } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Achievements WHERE achieveid = $1', [achieveid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Achievement not found', 404);
    }
    res.json({ message: 'Achievement deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete achievement` });
exports.deleteAchievement = deleteAchievement;
