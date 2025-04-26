import { AppDataSource } from "../config/database";
import { CompetencyMetadata } from "../entities/CompetencyMetadata";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";

async function seedCompetencies() {
  try {
    const competencyRepository = AppDataSource.getRepository(CompetencyMetadata);
    const progressRepository = AppDataSource.getRepository(StudentCompetencyProgress);

    // Criar partições para student_competency_progress
    await AppDataSource.query(`
      CREATE TABLE IF NOT EXISTS student_competency_progress_1 PARTITION OF student_competency_progress
        FOR VALUES IN ('1');
      CREATE TABLE IF NOT EXISTS student_competency_progress_2 PARTITION OF student_competency_progress
        FOR VALUES IN ('2');
      CREATE TABLE IF NOT EXISTS student_competency_progress_3 PARTITION OF student_competency_progress
        FOR VALUES IN ('3');
      CREATE TABLE IF NOT EXISTS student_competency_progress_4 PARTITION OF student_competency_progress
        FOR VALUES IN ('4');
      CREATE TABLE IF NOT EXISTS student_competency_progress_5 PARTITION OF student_competency_progress
        FOR VALUES IN ('5');
    `);

    // Inserir competências de exemplo
    const competencies = [
      {
        id: 1,
        subject_code: "MAT",
        topic_code: "GEO",
        competency_code: "C12",
        description: "Cálculo de volume de prismas"
      },
      {
        id: 2,
        subject_code: "MAT",
        topic_code: "GEO",
        competency_code: "C13",
        description: "Cálculo de área de figuras planas"
      },
      {
        id: 3,
        subject_code: "MAT",
        topic_code: "ALG",
        competency_code: "C21",
        description: "Resolução de equações do primeiro grau"
      },
      {
        id: 4,
        subject_code: "MAT",
        topic_code: "ALG",
        competency_code: "C22",
        description: "Resolução de equações do segundo grau"
      },
      {
        id: 5,
        subject_code: "MAT",
        topic_code: "ALG",
        competency_code: "C23",
        description: "Sistemas de equações"
      }
    ];

    await competencyRepository.save(competencies);

    // Inserir progresso dos alunos de exemplo
    const studentProgress = [
      // Aluno 1
      {
        student_id: "1",
        competency_id: 1,
        mastery_level: 0 // Não domina
      },
      {
        student_id: "1",
        competency_id: 2,
        mastery_level: 1 // Domina vagamente
      },
      {
        student_id: "1",
        competency_id: 3,
        mastery_level: 2 // Domina parcialmente
      },
      {
        student_id: "1",
        competency_id: 4,
        mastery_level: 1 // Domina vagamente
      },
      {
        student_id: "1",
        competency_id: 5,
        mastery_level: 0 // Não domina
      },
      // Aluno 12345678900 (mantendo os dados existentes)
      {
        student_id: "12345678900",
        competency_id: 1,
        mastery_level: 0
      },
      {
        student_id: "12345678900",
        competency_id: 2,
        mastery_level: 3
      },
      {
        student_id: "12345678900",
        competency_id: 3,
        mastery_level: 2
      },
      {
        student_id: "12345678900",
        competency_id: 4,
        mastery_level: 1
      },
      {
        student_id: "12345678900",
        competency_id: 5,
        mastery_level: 1
      }
    ];

    await progressRepository.save(studentProgress);

    console.log("Dados de teste inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados de teste:", error);
  }
}

// Executar o seed
AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida");
    return seedCompetencies();
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  }); 