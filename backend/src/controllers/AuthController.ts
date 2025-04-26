import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key', // Usa variável de ambiente ou fallback
        { expiresIn: '1d' }
      );

      // Retornar token e informações do usuário (sem a senha)
      const { password: _, ...userWithoutPassword } = user;
      return res.json({
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
} 