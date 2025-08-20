import "reflect-metadata"; // wajib untuk TypeORM
import dotenv from "dotenv";
import app from "./app";
import { User } from "./entities/User";
import { AppDataSource } from "./config/data-source";
import { seedAdmin } from "./seeds/admin.seed";

// Load environment
dotenv.config();

// Setup database
const PORT = process.env.PORT || 3001;
console.log(User);
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected ✅");

    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database ❌", err);
  });

//NODE: Configurasi app data source belum ngambil dari salah
