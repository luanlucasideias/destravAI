export interface Question {
  id: number;
  competencyId: number;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
} 