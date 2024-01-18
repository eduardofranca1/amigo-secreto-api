import { RequestHandler } from "express";
import AuthService from "../services/auth.service";

export const authenticate: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "Access denied" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!AuthService.validateToken(token)) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};
