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
exports.getCommitteeMembersByElectionId = exports.deleteCommitteeMember = exports.updateCommitteeMember = exports.getCommitteeMemberById = exports.getAllCommitteeMembers = exports.createCommitteeMember = exports.deleteCommitteepost = exports.updateCommitteepost = exports.getCommitteepostById = exports.getAllCommitteeposts = exports.createCommitteepost = exports.deleteElection = exports.updateElection = exports.getElectionById = exports.getAllElections = exports.createElection = void 0;
const errorWrapper_1 = __importDefault(require("../middlewares/errorWrapper"));
const CustomError_1 = __importDefault(require("../services/CustomError"));
const dbconnect_1 = __importDefault(require("../db/dbconnect"));
// Create a new election
const createElection = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Elections (year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create election` });
exports.createElection = createElection;
// Get all elections
const getAllElections = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Elections');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get elections` });
exports.getAllElections = getAllElections;
// Get election by ID
const getElectionById = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { electionid } = req.params;
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Elections WHERE electionid = $1', [electionid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Election not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't get election by electionid` });
exports.getElectionById = getElectionById;
// Update an election
const updateElection = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { electionid } = req.params;
    const { year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date } = req.body;
    const { rows } = yield dbconnect_1.default.query('UPDATE Elections SET year = $1, election_type = $2, batch = $3, election_commissioner = $4, assistant_commissioner = $5, candidate_form_date = $6, election_date = $7 WHERE electionid = $8 RETURNING *', [year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date, electionid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Election not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update election` });
exports.updateElection = updateElection;
// Delete an election
const deleteElection = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { electionid } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Elections WHERE electionid = $1', [electionid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Election not found', 404);
    }
    res.json({ message: 'Election deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete election` });
exports.deleteElection = deleteElection;
//--------------Election Posts----------------------------------
const createCommitteepost = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_name } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Committeeposts (post_name) VALUES ($1) RETURNING *', [post_name]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create committeepost` });
exports.createCommitteepost = createCommitteepost;
// Get all committeeposts
const getAllCommitteeposts = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Committeeposts');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get committeeposts` });
exports.getAllCommitteeposts = getAllCommitteeposts;
// Get committeepost by ID
const getCommitteepostById = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { committeepostid } = req.params;
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Committeeposts WHERE committeepostid = $1', [committeepostid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Committeepost not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't get committeepost by committeepostid` });
exports.getCommitteepostById = getCommitteepostById;
// Update a committeepost
const updateCommitteepost = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { committeepostid } = req.params;
    const { post_name } = req.body;
    const { rows } = yield dbconnect_1.default.query('UPDATE Committeeposts SET post_name = $1 WHERE committeepostid = $2 RETURNING *', [post_name, committeepostid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Committeepost not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update committeepost` });
exports.updateCommitteepost = updateCommitteepost;
// Delete a committeepost
const deleteCommitteepost = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { committeepostid } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Committeeposts WHERE committeepostid = $1', [committeepostid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Committeepost not found', 404);
    }
    res.json({ message: 'Committeepost deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete committeepost` });
exports.deleteCommitteepost = deleteCommitteepost;
//------------- commmitteee members ----------------------------------
const createCommitteeMember = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, postid, electionid } = req.body;
    const { rows } = yield dbconnect_1.default.query('INSERT INTO Committee (userid, postid, electionid) VALUES ($1, $2, $3) RETURNING *', [userid, postid, electionid]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create committee member` });
exports.createCommitteeMember = createCommitteeMember;
// Get all committee members
const getAllCommitteeMembers = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Committee');
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get committee members` });
exports.getAllCommitteeMembers = getAllCommitteeMembers;
// Get committee member by ID
const getCommitteeMemberById = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { committeeid } = req.params;
    const { rows } = yield dbconnect_1.default.query('SELECT * FROM Committee WHERE committeeid = $1', [committeeid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Committee member not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't get committee member by committeeid` });
exports.getCommitteeMemberById = getCommitteeMemberById;
// Update a committee member
const updateCommitteeMember = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { committeeid } = req.params;
    const { userid, postid, electionid } = req.body;
    const { rows } = yield dbconnect_1.default.query('UPDATE Committee SET userid = $1, postid = $2, electionid = $3 WHERE committeeid = $4 RETURNING *', [userid, postid, electionid, committeeid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Committee member not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update committee member` });
exports.updateCommitteeMember = updateCommitteeMember;
// Delete a committee member
const deleteCommitteeMember = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { committeeid } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Committee WHERE committeeid = $1', [committeeid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Committee member not found', 404);
    }
    res.json({ message: 'Committee member deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete committee member` });
exports.deleteCommitteeMember = deleteCommitteeMember;
const getCommitteeMembersByElectionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { electionid } = req.params;
    try {
        const query = `
        SELECT 
            e.year,
            u.fullname,
            u.profile_picture,
            u.email,
            u.regno,
            u.session,
            cp.post_name AS committee_post
        FROM 
            Committee c
        JOIN 
            Elections e ON c.electionid = e.electionid
        LEFT JOIN 
            Users ec ON e.election_commissioner = ec.userId
        LEFT JOIN 
            Users ac ON e.assistant_commissioner = ac.userId
        JOIN 
            Users u ON c.userid = u.userId
        JOIN 
            Committeeposts cp ON c.postid = cp.committeepostid
        WHERE 
            c.electionid = $1;
    `;
        const { rows } = yield dbconnect_1.default.query(query, [electionid]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No committee members found for the specified election ID' });
        }
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching committee members:', error);
        res.status(500).json({ error: "Couldn't get committee members data" });
    }
});
exports.getCommitteeMembersByElectionId = getCommitteeMembersByElectionId;
