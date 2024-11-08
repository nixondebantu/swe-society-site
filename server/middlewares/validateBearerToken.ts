import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import CustomError from "../services/CustomError";
import { getToken } from "../services/Token";

const validateBearerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getToken(req);
    if (!token) {
      throw new CustomError("Authorization token missing.", 401);
    }
    const secret: Secret | undefined = "societyJwtKey";
    const decodedToken = jwt.verify(token, secret) as JWTPAYLOAD;
    if (decodedToken && decodedToken.userid && decodedToken.regno) {
      req.jwtPayload = {
        userid: decodedToken.userid,
        regno: decodedToken.regno,
      };
      next();
    } else {
      res.status(401).json({ error: "Invalid token payload." });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized access. Invalid token." });
  }
};

export { validateBearerToken };
