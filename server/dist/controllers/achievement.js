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
exports.getUserAchievementsAll = exports.createTeamAndAchievement = exports.getUserAchievements = exports.deleteAchievement = exports.updateAchievement = exports.getAchievementById = exports.getAllAchievements = exports.createAchievement = exports.removeTeamMember = exports.getTeamMembersByTeamId = exports.getAllTeamMembers = exports.addTeamMember = exports.deleteTeam = exports.updateTeam = exports.getAllTeams = exports.createTeam = void 0;
const errorWrapper_1 = __importDefault(require("../middlewares/errorWrapper"));
const CustomError_1 = __importDefault(require("../services/CustomError"));
const dbconnect_1 = __importDefault(require("../db/dbconnect"));
// Create a new team
const createTeam = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamname, mentor } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Teams (teamname, mentor) VALUES ($1, $2) RETURNING *', [teamname, mentor]);
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
    const { teamname, mentor } = req.body;
    // Collect columns to update and corresponding values
    const updates = [];
    const values = [];
    if (teamname) {
        updates.push('teamname = $' + (updates.length + 1));
        values.push(teamname);
    }
    if (mentor) {
        updates.push('mentor = $' + (updates.length + 1));
        values.push(mentor);
    }
    // If there are no fields to update, return an error
    if (updates.length === 0) {
        throw new CustomError_1.default('No fields to update', 400);
    }
    // Add teamid as the last parameter
    values.push(teamid);
    const query = `UPDATE Teams SET ${updates.join(', ')} WHERE teamid = $${values.length} RETURNING *`;
    const { rows } = yield dbconnect_1.default.query(query, values);
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
    const { userid, teamid, othermember, other_member_institute } = req.body;
    // Collect columns and values dynamically based on provided fields
    const columns = ['teamid'];
    const values = [teamid];
    const placeholders = ['$1'];
    if (userid) {
        columns.push('userid');
        values.push(userid);
        placeholders.push(`$${placeholders.length + 1}`);
    }
    if (othermember) {
        columns.push('othermember');
        values.push(othermember);
        placeholders.push(`$${placeholders.length + 1}`);
    }
    if (other_member_institute) {
        columns.push('other_member_institute');
        values.push(other_member_institute);
        placeholders.push(`$${placeholders.length + 1}`);
    }
    // Build the query string dynamically
    const query = `INSERT INTO TeamMembers (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
    const { rows } = yield dbconnect_1.default.query(query, values);
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
// custom api's
const getUserAchievements = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.params;
    // Query to get achievements of the user
    const achievementsQuery = `
        SELECT
            a.achieveid,
            a.teamid,
            t.teamname,
            t.mentor,
            a.eventname,
            a.segment,
            a.organizer,
            a.venu,
            a.startdate,
            a.enddate,
            a.rank,
            a.rankarea,
            a.task,
            a.solution,
            a.techstack,
            a.resources,
            a.photos,
            a.approval_status,
            (
                SELECT json_agg(json_build_object('userid', u.userid, 'fullname', u.fullname, 'session', u.session))
                FROM TeamMembers tm
                JOIN Users u ON tm.userid = u.userid
                WHERE tm.teamid = a.teamid
            ) AS teamMembers
        FROM
            Achievements a
        JOIN
            TeamMembers tm ON a.teamid = tm.teamid
        JOIN
            Teams t ON a.teamid = t.teamid
        WHERE
            tm.userid = $1;
    `;
    const { rows } = yield dbconnect_1.default.query(achievementsQuery, [userid]);
    if (rows.length === 0) {
        throw new CustomError_1.default(`No achievements found for user ID ${userid}`, 404);
    }
    res.json({ achievement: rows });
}), {
    statusCode: 500,
    message: `Couldn't retrieve achievements`
});
exports.getUserAchievements = getUserAchievements;
const getUserAchievementsAll = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Query to get achievements of all users
    const achievementsQuery = `
    SELECT DISTINCT ON (a.achieveid)
        a.achieveid,
        a.teamid,
        t.teamname,
        t.mentor,
        a.eventname,
        a.segment,
        a.organizer,
        a.venu,
        a.startdate,
        a.enddate,
        a.rank,
        a.rankarea,
        a.task,
        a.solution,
        a.techstack,
        a.resources,
        a.photos,
        a.approval_status,
        (
            SELECT json_agg(json_build_object('userid', u.userid, 'fullname', u.fullname, 'session', u.session))
            FROM TeamMembers tm
            JOIN Users u ON tm.userid = u.userid
            WHERE tm.teamid = a.teamid
        ) AS teamMembers
    FROM
        Achievements a
    JOIN
        TeamMembers tm ON a.teamid = tm.teamid
    JOIN
        Teams t ON a.teamid = t.teamid
    WHERE
        a.achieveid >= 0;
`;
    const { rows } = yield dbconnect_1.default.query(achievementsQuery);
    if (rows.length === 0) {
        throw new CustomError_1.default("No achievements found", 404);
    }
    res.json({ achievements: rows });
}), {
    statusCode: 500,
    message: "Couldn't retrieve achievements"
});
exports.getUserAchievementsAll = getUserAchievementsAll;
// interface TeamMember {
//     userid?: number;
//     othermember?: string;
//     other_member_institute?: string;
// }
const createTeams = (teamname, mentor) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting into Teams table...");
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Teams (teamname, mentor) VALUES ($1, $2) RETURNING *', [teamname, mentor]);
    if (rows.length === 0) {
        throw new CustomError_1.default("Could not create team", 500);
    }
    const teamid = rows[0].teamid;
    console.log("Team created with ID:", teamid);
    return teamid; // Ensure teamid is returned as a number
});
// Function to add team members
const insertTeamMembers = (teamid, teammembers, others) => __awaiter(void 0, void 0, void 0, function* () {
    const memberQueries = [];
    // Insert team members (users)
    if (teammembers && Array.isArray(teammembers)) {
        for (let i = 0; i < teammembers.length; i++) {
            const userid = teammembers[i];
            const columns = ['teamid', 'userid'];
            const values = [teamid, userid];
            const placeholders = ['$1', `$2`];
            const query = `INSERT INTO TeamMembers (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
            memberQueries.push(dbconnect_1.default.query(query, values)); // Push each query to the array
        }
    }
    // Insert other members (non-users)
    if (others && Array.isArray(others)) {
        for (let i = 0; i < others.length; i++) {
            const { othermember, other_member_institute } = others[i];
            const columns = ['teamid', 'othermember', 'other_member_institute'];
            const values = [teamid, othermember, other_member_institute];
            const placeholders = ['$1', `$2`, `$3`];
            const query = `INSERT INTO TeamMembers (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
            memberQueries.push(dbconnect_1.default.query(query, values)); // Push each query to the array
        }
    }
    // Execute all queries concurrently
    const results = yield Promise.all(memberQueries);
    // Return inserted members
    return results.map(result => result.rows[0]);
});
// Function to add achievement
const addAchievement = (client, teamid, eventname, segment, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting into Achievements table...");
    const { rows } = yield client.query(`INSERT INTO Achievements 
            (teamid, eventname, segment, organizer, venu, startdate, enddate, rank, 
            rankarea, task, solution, techstack, resources, photos, approval_status) 
         VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
         RETURNING *`, [teamid, eventname, segment, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status]);
    if (rows.length === 0) {
        throw new CustomError_1.default("Could not create achievement", 500);
    }
    console.log("Achievement created with ID:", rows[0].achieveid);
    return rows[0]; // Ensure the returned value is of the correct type
});
const createTeamAndAchievement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield dbconnect_1.default.connect();
    try {
        const { teamname, mentor, teammembers, others, eventname, segment, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status } = req.body;
        console.log("Starting the transaction...");
        ;
        // Step 1: Create Team
        const teamid = yield createTeams(teamname, mentor); // Returns a number (teamid)
        // Step 2: Add Team Members
        yield insertTeamMembers(teamid, teammembers, others);
        // Step 3: Add Achievement
        const achievement = yield addAchievement(client, teamid, eventname, segment, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status);
        yield client.query('COMMIT');
        console.log("Transaction committed successfully.");
        // Return the created team and achievement
        res.status(201).json({
            team: { teamid, teamname, mentor },
            achievement
        });
    }
    catch (error) {
        yield client.query('ROLLBACK');
        console.error("Error during the transaction:", error);
        if (error instanceof CustomError_1.default) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Could not complete the transaction" });
        }
    }
    finally {
        client.release();
        console.log("Database client released.");
    }
});
exports.createTeamAndAchievement = createTeamAndAchievement;
