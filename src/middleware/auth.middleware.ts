import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Token tidak valid atau sudah kadaluarsa" });
  }

  // simpan data user di request agar bisa dipakai di controller berikutnya
  (req as any).user = decoded;
  next();
}
