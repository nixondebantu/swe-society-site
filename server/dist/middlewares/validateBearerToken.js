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
exports.validateBearerToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = __importDefault(require("../services/CustomError"));
const Token_1 = require("../services/Token");
const validateBearerToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, Token_1.getToken)(req);
        if (!token) {
            throw new CustomError_1.default("Authorization token missing.", 401);
        }
        const secret = "societyJwtKey";
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        if (decodedToken && decodedToken.userid && decodedToken.regno) {
            req.jwtPayload = {
                userid: decodedToken.userid,
                regno: decodedToken.regno,
            };
            next();
        }
        else {
            res.status(401).json({ message: "Invalid token payload." });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized access. Invalid token." });
    }
});
exports.validateBearerToken = validateBearerToken;
