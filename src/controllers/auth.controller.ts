import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.validator";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      console.log(req.body);
      const parsed = registerSchema.parse(req.body);
      console.log(parsed);
      const user = await AuthService.register(parsed);
      return res.status(201).json({ message: "Registrasi berhasil", user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Registrasi gagal" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const parsed = loginSchema.parse(req.body);
      const result = await AuthService.login(parsed);
      return res.status(200).json({ message: "Login berhasil", ...result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Login gagal" });
    }
  }
}
