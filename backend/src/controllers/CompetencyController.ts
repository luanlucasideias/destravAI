import { Request, Response } from "express";
import { CompetencySelectorService } from "../services/CompetencySelectorService";
import { QuestionService } from "../services/QuestionService";
import { AppDataSource } from "../config/database";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";

export class CompetencyController {
  private selectorService = new CompetencySelectorService();
  private questionService = new QuestionService();
  private progressRepository = AppDataSource.getRepository(StudentCompetencyProgress);

  async getNextCompetency(req: Request, res: Response) {
    try {
      console.log("Recebida requisição para getNextCompetency");
      const { studentId } = req.params;
      console.log("studentId:", studentId);
      
      const nextCompetency = await this.selectorService.getNextCompetency(studentId);
      console.log("nextCompetency:", nextCompetency);

      if (!nextCompetency) {
        console.log("Nenhuma competência disponível encontrada");
        return res.status(404).json({ message: "No available competencies found" });
      }

      console.log("Retornando competência:", nextCompetency);
      return res.json({ competencyId: nextCompetency });
    } catch (error) {
      console.error("Erro detalhado ao obter próxima competência:", error);
      return res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }

  async getQuestions(req: Request, res: Response) {
    try {
      const { studentId, competencyId } = req.params;
      console.log('Recebida requisição para buscar questões:', { studentId, competencyId });
      
      // Validate competencyId
      const competencyIdNumber = parseInt(competencyId);
      if (isNaN(competencyIdNumber)) {
        console.log('ID da competência inválido:', competencyId);
        return res.status(400).json({ message: "Invalid competency ID" });
      }

      // Buscar questões do banco relacional (PostgreSQL)
      const result = await this.questionService.getQuestionsForCompetency(studentId, competencyIdNumber);
      if (!result.questions.length) {
        return res.status(404).json({ message: "Nenhuma questão encontrada para a competência informada." });
      }
      return res.json(result);
    } catch (error) {
      console.error("Erro detalhado ao buscar questões:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async submitAnswers(req: Request, res: Response) {
    try {
      const { studentId, competencyId } = req.params;
      const { answers } = req.body;

      if (!Array.isArray(answers)) {
        return res.status(400).json({ message: "Answers must be an array" });
      }

      const result = await this.questionService.processAnswers(
        studentId,
        parseInt(competencyId),
        answers
      );

      return res.json(result);
    } catch (error) {
      console.error("Error processing answers:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getMasteryLevel(req: Request, res: Response) {
    try {
      const { studentId, competencyId } = req.params;
      const progress = await this.progressRepository.findOne({
        where: {
          student_id: studentId,
          competency_id: parseInt(competencyId)
        }
      });
      return res.json({ masteryLevel: progress?.mastery_level || 0 });
    } catch (error) {
      console.error("Error getting mastery level:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateMasteryLevel(req: Request, res: Response) {
    try {
      const { studentId, competencyId } = req.params;
      const { newLevel } = req.body;

      await this.selectorService.updateMasteryLevel(studentId, parseInt(competencyId), newLevel);
      return res.json({ message: "Mastery level updated successfully" });
    } catch (error) {
      console.error("Error updating mastery level:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
} 