import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { CompetencyMetadata } from "../entities/CompetencyMetadata";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";
import { Question } from "../entities/Question";
import { StudentQuestionSession } from "../entities/StudentQuestionSession";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "distravAI_questions",
  synchronize: false, // Desativando a sincronização automática
  logging: process.env.NODE_ENV === "development",
  entities: [User, CompetencyMetadata, StudentCompetencyProgress, Question, StudentQuestionSession],
  migrations: [__dirname + "/../migrations/**/*.ts"],
  subscribers: [__dirname + "/../subscribers/**/*.ts"],
}); 



