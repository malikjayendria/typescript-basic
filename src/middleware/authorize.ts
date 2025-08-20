import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";

export function authorize(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({ message: "Forbidden: tidak punya akses" });
    }
    next();
  };
}
