import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../validators/auth.validator";

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await userRepository.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = userRepository.create({
      email: data.email,
      password: hashedPassword,
      role: "user", //default
    });

    await userRepository.save(user);

    return user;
  }

  static async login(data: LoginInput) {
    const user = await userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) {
      throw new Error("Email atau password salah");
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return { token };
  }
}
