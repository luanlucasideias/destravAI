import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "detrav",
  synchronize: process.env.NODE_ENV === "development", // Não use em produção!
  logging: process.env.NODE_ENV === "development",
  entities: [__dirname + "/../entities/**/*.ts"],
  migrations: [__dirname + "/../migrations/**/*.ts"],
  subscribers: [__dirname + "/../subscribers/**/*.ts"],
}); 