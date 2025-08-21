import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { ZodError } from "zod";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const parsed = registerSchema.parse(req.body);
      const user = await AuthService.register(parsed);
      return res.status(201).json({ message: "Registrasi berhasil", user });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      return res.status(400).json({ message: error.message || "Registrasi gagal" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const parsed = loginSchema.parse(req.body);
      const result = await AuthService.login(parsed);
      return res.status(200).json({ message: "Login berhasil", ...result });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(400).json({ message: error.message || "Login gagal" });
    }
  }
}
