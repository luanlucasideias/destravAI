import { AppDataSource } from "../config/database";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";

const TEST_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

async function updateMasteryLevels() {
  try {
    await AppDataSource.initialize();
    
    const progressRepository = AppDataSource.getRepository(StudentCompetencyProgress);
    
    // Atualizando cada competência individualmente
    const updates = [
      { competency_id: 1, mastery_level: 1 },
      { competency_id: 2, mastery_level: 0 },
      { competency_id: 3, mastery_level: 1 },
      { competency_id: 4, mastery_level: 3 },
      { competency_id: 5, mastery_level: 0 }
    ];

    for (const update of updates) {
      await progressRepository.update(
        { student_id: TEST_USER_ID, competency_id: update.competency_id },
        { mastery_level: update.mastery_level }
      );
    }

    console.log("Níveis de dominância atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar níveis de dominância:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

updateMasteryLevels(); 