import { RequestHandler } from "express";
import { z } from "zod";
import AuthService from "../services/auth.service";

export const login: RequestHandler = async (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });

  const body = loginSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: "Invalid data" });

  if (!AuthService.validatePassword(body.data.password)) {
    return res.status(403).json({ error: "Access denied" });
  }

  res.json({ token: AuthService.createToken() });
};
