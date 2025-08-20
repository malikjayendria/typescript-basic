import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Middleware umum
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "API berjalan 🚀" });
});

export default app;
