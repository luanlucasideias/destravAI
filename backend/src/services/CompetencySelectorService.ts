import { AppDataSource } from "../config/database";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";
import { StudentQuestionSession } from "../entities/StudentQuestionSession";

export class CompetencySelectorService {
  private studentProgressRepository = AppDataSource.getRepository(StudentCompetencyProgress);
  private sessionRepository = AppDataSource.getRepository(StudentQuestionSession);

  async getNextCompetency(studentId: string): Promise<number | null> {
    try {
      console.log("Buscando progresso do aluno:", studentId);
      // Busca o progresso do aluno em todas as competências
      const progress = await this.studentProgressRepository.find({
        where: { student_id: studentId },
        relations: ["competency"]
      });
      console.log("Progresso encontrado:", progress);

      if (!progress.length) {
        console.log("Nenhum progresso encontrado para o aluno");
        return null;
      }

      // Busca a última competência abordada na sessão mais recente FINALIZADA
      const lastSession = await this.sessionRepository.findOne({
        where: { student_id: studentId, session_completed: true },
        order: { created_at: "DESC" }
      });
      const lastCompetencyId = lastSession?.competency_id;
      console.log("Última competência abordada:", lastCompetencyId);

      // Filtra competências não dominadas (mastery_level < 3)
      const availableCompetencies = progress.filter(p => p.mastery_level < 3);
      console.log("Competências disponíveis:", availableCompetencies);

      if (!availableCompetencies.length) {
        console.log("Nenhuma competência disponível (todas dominadas)");
        return null;
      }

      // Agrupa competências por nível de domínio
      const competenciesByLevel = new Map<number, number[]>();
      availableCompetencies.forEach(comp => {
        if (!competenciesByLevel.has(comp.mastery_level)) {
          competenciesByLevel.set(comp.mastery_level, []);
        }
        competenciesByLevel.get(comp.mastery_level)?.push(comp.competency_id);
      });
      console.log("Competências agrupadas por nível:", Object.fromEntries(competenciesByLevel));

      // Ordena os níveis do maior para o menor
      const sortedLevels = Array.from(competenciesByLevel.keys()).sort((a, b) => b - a);
      let eligibleCompetencies: number[] = [];
      for (const level of sortedLevels) {
        const comps = competenciesByLevel.get(level) || [];
        const filtered = lastCompetencyId ? comps.filter(cid => cid !== lastCompetencyId) : comps;
        if (filtered.length > 0) {
          eligibleCompetencies = filtered;
          break;
        }
      }
      // Se não encontrou nenhuma elegível, pode repetir a última (única opção)
      if (eligibleCompetencies.length === 0 && lastCompetencyId) {
        eligibleCompetencies = [lastCompetencyId];
      }
      const randomIndex = Math.floor(Math.random() * eligibleCompetencies.length);
      const selectedCompetency = eligibleCompetencies[randomIndex];
      console.log("Competência selecionada:", selectedCompetency);

      return selectedCompetency;
    } catch (error) {
      console.error("Erro detalhado no serviço:", error);
      throw error;
    }
  }

  async updateMasteryLevel(studentId: string, competencyId: number, newLevel: number): Promise<void> {
    try {
      console.log(`Atualizando nível de domínio para estudante ${studentId}, competência ${competencyId} para ${newLevel}`);
      
      // Primeiro, tenta atualizar
      const updateResult = await this.studentProgressRepository.update(
        { student_id: studentId, competency_id: competencyId },
        { mastery_level: newLevel, last_updated: new Date() }
      );

      // Se nenhum registro foi atualizado, significa que não existe, então insere
      if (updateResult.affected === 0) {
        console.log("Registro não encontrado, criando novo...");
        await this.studentProgressRepository.insert({
          student_id: studentId,
          competency_id: competencyId,
          mastery_level: newLevel,
          last_updated: new Date()
        });
      }

      console.log("Nível de domínio atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar nível de domínio:", error);
      throw error;
    }
  }
} 