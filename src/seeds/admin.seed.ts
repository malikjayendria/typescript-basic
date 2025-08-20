import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export async function seedAdmin() {
  const userRepo = AppDataSource.getRepository(User);

  const superAdminExists = await userRepo.findOne({ where: { email: "superadmin@example.com" } });
  if (!superAdminExists) {
    const hashedPassword = await bcrypt.hash("superadmin123", 10);
    const superadmin = userRepo.create({
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    });
    await userRepo.save(superadmin);
    console.log("Superadmin created!");
  }

  const adminExists = await userRepo.findOne({ where: { email: "admin@example.com" } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = userRepo.create({
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });
    await userRepo.save(admin);
    console.log("Admin created!");
  }
}
