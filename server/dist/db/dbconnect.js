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
exports.connectToDB = exports.testDatabaseConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const connectionString = 'postgresql://postgres.oszveqopythlwzqzykjt:G3jRpdr!fnsx.HC@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';
const pool = new pg_1.Pool({
    connectionString: connectionString,
});
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pool.query("SELECT 1");
            console.log("Database connected successfully");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
exports.testDatabaseConnection = testDatabaseConnection;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pool.connect();
            console.log("Connected to PostgreSQL database");
        }
        catch (error) {
            console.error("Error connecting to PostgreSQL database:", error);
        }
    });
}
exports.connectToDB = connectToDB;
exports.default = pool;
