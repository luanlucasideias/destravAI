import { AppDataSource } from "../config/database";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";

export class CompetencySelectorService {
  private studentProgressRepository = AppDataSource.getRepository(StudentCompetencyProgress);

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

      // Pega o maior nível disponível
      const maxLevel = Math.max(...Array.from(competenciesByLevel.keys()));
      console.log("Maior nível encontrado:", maxLevel);

      // Seleciona aleatoriamente entre as competências do maior nível
      const competenciesAtMaxLevel = competenciesByLevel.get(maxLevel) || [];
      const randomIndex = Math.floor(Math.random() * competenciesAtMaxLevel.length);
      const selectedCompetency = competenciesAtMaxLevel[randomIndex];
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