import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(email: string, password: string, role: UserRole) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, role });
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, data: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error("User tidak ditemukan");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error("User tidak ditemukan");

    return await this.userRepository.remove(user);
  }
}
