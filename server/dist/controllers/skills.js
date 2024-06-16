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
exports.addUserMultipleSkills = exports.getUserSkills = exports.deleteUserSkill = exports.updateUserSkill = exports.getAllUserSkills = exports.createUserSkill = exports.deleteSkill = exports.updateSkill = exports.getAllSkills = exports.createSkill = void 0;
const errorWrapper_1 = __importDefault(require("../middlewares/errorWrapper"));
const CustomError_1 = __importDefault(require("../services/CustomError"));
const dbconnect_1 = __importDefault(require("../db/dbconnect"));
// Create a new skill
const createSkill = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skill, area } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Skills (skill, area) VALUES ($1, $2) RETURNING *', [skill, area]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create skill` });
exports.createSkill = createSkill;
// Get all skills
const getAllSkills = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Skills');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get skills` });
exports.getAllSkills = getAllSkills;
// Update a skill
const updateSkill = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillId } = req.params;
    const { skill, area } = req.body;
    const { rows } = yield dbconnect_1.default.query('UPDATE Skills SET skill = $1, area = $2 WHERE skill_id = $3 RETURNING *', [skill, area, skillId]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Skill not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update skill` });
exports.updateSkill = updateSkill;
// Delete a skill
const deleteSkill = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillId } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Skills WHERE skill_id = $1', [skillId]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Skill not found', 404);
    }
    res.json({ message: 'Skill deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete skill` });
exports.deleteSkill = deleteSkill;
// Create a new userSkill
const createUserSkill = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, skill_id } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO UserSkills (userid, skill_id) VALUES ($1, $2) RETURNING *', [userid, skill_id]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create user skill` });
exports.createUserSkill = createUserSkill;
// Get all user skills
const getAllUserSkills = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM UserSkills');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get user skills` });
exports.getAllUserSkills = getAllUserSkills;
// Update a userSkill
const updateUserSkill = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userSkillId } = req.params;
    const { userid, skill_id } = req.body;
    const { rows } = yield dbconnect_1.default.query('UPDATE UserSkills SET userid = $1, skill_id = $2 WHERE userskillid = $3 RETURNING *', [userid, skill_id, userSkillId]);
    if (rows.length === 0) {
        throw new CustomError_1.default('User skill not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update user skill` });
exports.updateUserSkill = updateUserSkill;
// Delete a userSkill
const deleteUserSkill = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userSkillId } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM UserSkills WHERE userskillid = $1', [userSkillId]);
    if (rowCount === 0) {
        throw new CustomError_1.default('User skill not found', 404);
    }
    res.json({ message: 'User skill deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete user skill` });
exports.deleteUserSkill = deleteUserSkill;
// custom Apis
const getUserSkills = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.params;
    const { rows } = yield dbconnect_1.default.query(`SELECT s.skill_id, s.skill 
             FROM Skills s 
             JOIN UserSkills us ON s.skill_id = us.skill_id 
             WHERE us.userid = $1`, [userid]);
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get user skills` });
exports.getUserSkills = getUserSkills;
const addUserMultipleSkills = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, skills } = req.body;
    // Prepare query to ignore existing (userid, skill_id) pairs
    const insertQuery = `
            INSERT INTO UserSkills (userid, skill_id)
            SELECT $1, unnest($2::int[])
            ON CONFLICT (userid, skill_id) DO NOTHING
            RETURNING skill_id;
        `;
    const { rows: insertedSkills } = yield dbconnect_1.default.query(insertQuery, [userid, skills]);
    // Fetch the inserted skills to return their details
    if (insertedSkills.length > 0) {
        const skillIds = insertedSkills.map(skill => skill.skill_id);
        const { rows: skillDetails } = yield dbconnect_1.default.query('SELECT skill_id, skill FROM Skills WHERE skill_id = ANY($1::int[])', [skillIds]);
        res.status(201).json(skillDetails);
    }
    else {
        res.status(204).json({ message: 'No new skills were added.' });
    }
}), { statusCode: 500, message: `Couldn't add user skills` });
exports.addUserMultipleSkills = addUserMultipleSkills;
