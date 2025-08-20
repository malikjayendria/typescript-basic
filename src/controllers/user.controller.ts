import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserRole } from "../entities/User";

const userService = new UserService();

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  static async getById(req: Request, res: Response) {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
  }

  static async create(req: Request, res: Response) {
    const { email, password, role } = req.body;
    const user = await userService.createUser(email, password, role as UserRole);
    res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(Number(req.params.id), req.body);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number(req.params.id));
      res.json({ message: "User berhasil dihapus" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }
}
