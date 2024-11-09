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
exports.createTables = void 0;
const dbconnect_1 = __importDefault(require("./dbconnect"));
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbconnect_1.default.query(`
        CREATE TABLE IF NOT EXISTS Users (
            userId SERIAL PRIMARY KEY,
            fullname VARCHAR(100),
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            profile_picture VARCHAR(200),
            regno VARCHAR(20) UNIQUE NOT NULL,
            session VARCHAR(10),
            phone_number VARCHAR(15),
            bio TEXT,
            linkedin_id VARCHAR(100),
            github_id VARCHAR(100),
            stop_stalk_id VARCHAR(100),
            whatsapp VARCHAR(20),
            facebook_id VARCHAR(100),
            blood_group VARCHAR(5),
            school VARCHAR(100),
            college VARCHAR(100),
            hometown VARCHAR(100),
            CV VARCHAR(200),
            experience TEXT[],
            projects TEXT[],
            skills TEXT[],
            is_alumni BOOLEAN DEFAULT FALSE,
            role VARCHAR(20) NOT NULL DEFAULT 'general_member'
        );

        CREATE TABLE IF NOT EXISTS GeneralNotices (
            noticeId SERIAL PRIMARY KEY,
            notice_provider INT,
            notice_date DATE,
            expire_date DATE,
            headline VARCHAR(200),
            notice_body TEXT,
            picture TEXT,
            file TEXT,
            FOREIGN KEY (notice_provider) REFERENCES Users(userId) ON DELETE CASCADE

        );

        CREATE TABLE IF NOT EXISTS Events (
            eventid SERIAL PRIMARY KEY,
            event_creator INT,
            start_time TIMESTAMP,
            end_time TIMESTAMP,
            headline VARCHAR(200),
            event_details TEXT,
            coverphoto TEXT,
            created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_creator) REFERENCES Users(userId) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS Event_Updates (
            event_updateid SERIAL PRIMARY KEY,
            eventid INT,
            caption TEXT,
            photos TEXT[],
            created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (eventid) REFERENCES Events(eventid) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS Skills (
            skill_id SERIAL PRIMARY KEY,
            skill VARCHAR(50),
            area VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS UserSkills (
            userskillid SERIAL,
            userid INT,
            skill_id INT,
            PRIMARY KEY (userid, skill_id),
            FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE,
            FOREIGN KEY (userid) REFERENCES Users(userId) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS Teams (
            teamid SERIAL PRIMARY KEY,
            teamname VARCHAR(100),
            mentor VARCHAR(100),
            created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS TeamMembers (
            team_member_id SERIAL,
            userid INT, 
            teamid INT,
            othermember TEXT,
            other_member_institute TEXT,
            PRIMARY KEY (team_member_id),
            FOREIGN KEY (userid) REFERENCES Users(userId) ON DELETE CASCADE,
            FOREIGN KEY (teamid) REFERENCES Teams(teamid) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS Achievements (
            achieveid SERIAL PRIMARY KEY,
            teamid INT NOT NULL,
            eventname TEXT NOT NULL,
            segment TEXT NOT NULL,
            organizer VARCHAR(100),
            venu VARCHAR(100),
            startdate DATE,
            enddate DATE,
            rank VARCHAR(100),
            rankarea VARCHAR(100) NOT NULL,
            task TEXT,
            solution TEXT,
            techstack TEXT,
            resources TEXT,
            photos TEXT[],
            approval_status BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (teamid) REFERENCES Teams(teamid) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS Blogs (
            blogid SERIAL PRIMARY KEY,
            userid INT NOT NULL,
            headline TEXT,
            designation TEXT,
            current_institution TEXT,
            article TEXT,
            photos TEXT[],
            blogtype VARCHAR(200),
            approval_status BOOLEAN DEFAULT FALSE, 
            FOREIGN KEY (userid) REFERENCES Users(userId) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS Elections (
            electionid SERIAL PRIMARY KEY,
            year VARCHAR(6),
            election_type VARCHAR(50),
            batch VARCHAR(10),
            election_commissioner INT,
            assistant_commissioner INT,
            candidate_form_date DATE,
            election_date DATE,
            FOREIGN KEY (election_commissioner) REFERENCES Users(userId) ON DELETE SET NULL,
            FOREIGN KEY (assistant_commissioner) REFERENCES Users(userId) ON DELETE SET NULL
        );


        CREATE TABLE IF NOT EXISTS Committeeposts (
            committeepostid SERIAL PRIMARY KEY,
            post_name VARCHAR(50)
        );



        CREATE TABLE IF NOT EXISTS Committee (
            committeeid SERIAL PRIMARY KEY,
            userid INT,
            postid INT,
            electionid INT,
            FOREIGN KEY (userid) REFERENCES Users(userId) ON DELETE SET NULL,
            FOREIGN KEY (postid) REFERENCES Committeeposts(committeepostid) ON DELETE SET NULL,
            FOREIGN KEY (electionid) REFERENCES Elections(electionid) ON DELETE SET NULL
        );



  
        

        `);
            console.log('Tables created successfully');
        }
        catch (error) {
            console.error('Unable to create any table:', error);
        }
    });
}
exports.createTables = createTables;
//Deployment note: User(userid) On delete null hobe.
