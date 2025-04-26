import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import competencyRoutes from './routes/competencyRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rotas de competência
app.use('/api/auth', authRoutes);
app.use('/api/competencies', competencyRoutes);

// Inicializar conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida");
    
    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  }); 