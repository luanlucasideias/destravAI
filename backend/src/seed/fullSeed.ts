import { AppDataSource } from "../config/database";
import { CompetencyMetadata } from "../entities/CompetencyMetadata";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";
import { Question } from "../entities/Question";
import { User } from "../entities/User";
import { StudentQuestionSession } from "../entities/StudentQuestionSession";

// UUID fixo para o usuário de teste
const TEST_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

async function fullSeed() {
  try {
    console.log("Iniciando atualização do seed...");

    // Conectar ao banco
    await AppDataSource.initialize();

    // Atualizar questões existentes e inserir novas
    console.log("Atualizando questões...");
    const questionRepository = AppDataSource.getRepository(Question);

    // Array com todas as questões
    const questions = [
      // Competência 1 (Cálculo de volume de prismas)
      {
        competency_id: 1,
        text: "Qual é o volume de um prisma retangular com base 5cm, altura 4cm e profundidade 3cm?",
        options: ["60cm³", "50cm³", "45cm³", "40cm³"],
        correct_answer: "60cm³",
        difficulty: 1
      },
      {
        competency_id: 1,
        text: "Um prisma triangular tem área da base 12cm² e altura 5cm. Qual seu volume?",
        options: ["60cm³", "50cm³", "45cm³", "40cm³"],
        correct_answer: "60cm³",
        difficulty: 1
      },
      {
        competency_id: 1,
        text: "Calcule o volume de um cubo com aresta 4cm.",
        options: ["64cm³", "48cm³", "56cm³", "60cm³"],
        correct_answer: "64cm³",
        difficulty: 2
      },

      // Competência 2 (Cálculo de área de figuras planas)
      {
        competency_id: 2,
        text: "Qual é a área de um retângulo com base 6cm e altura 4cm?",
        options: ["24cm²", "20cm²", "28cm²", "22cm²"],
        correct_answer: "24cm²",
        difficulty: 1
      },
      {
        competency_id: 2,
        text: "Um triângulo tem base 8cm e altura 6cm. Qual sua área?",
        options: ["24cm²", "48cm²", "36cm²", "42cm²"],
        correct_answer: "24cm²",
        difficulty: 1
      },
      {
        competency_id: 2,
        text: "Qual é a área de um círculo com raio 3cm? (use π = 3.14)",
        options: ["28.26cm²", "18.84cm²", "31.4cm²", "25.12cm²"],
        correct_answer: "28.26cm²",
        difficulty: 2
      },

      // Competência 3 (Resolução de equações do primeiro grau)
      {
        competency_id: 3,
        text: "Resolva a equação: 2x + 5 = 15",
        options: ["x = 5", "x = 6", "x = 4", "x = 7"],
        correct_answer: "x = 5",
        difficulty: 1
      },
      {
        competency_id: 3,
        text: "Qual o valor de x na equação: 3x - 7 = 8",
        options: ["x = 5", "x = 6", "x = 4", "x = 7"],
        correct_answer: "x = 5",
        difficulty: 1
      },
      {
        competency_id: 3,
        text: "Encontre x: 4(x + 2) = 24",
        options: ["x = 4", "x = 5", "x = 6", "x = 3"],
        correct_answer: "x = 4",
        difficulty: 2
      },

      // Competência 4 (Resolução de equações do segundo grau)
      {
        competency_id: 4,
        text: "Resolva a equação: x² - 5x + 6 = 0",
        options: ["x = 2 ou x = 3", "x = 1 ou x = 4", "x = -2 ou x = 3", "x = 2 ou x = 4"],
        correct_answer: "x = 2 ou x = 3",
        difficulty: 1
      },
      {
        competency_id: 4,
        text: "Qual é a solução de x² + 2x - 8 = 0?",
        options: ["x = 2 ou x = -4", "x = -2 ou x = 4", "x = 3 ou x = -5", "x = -3 ou x = 5"],
        correct_answer: "x = 2 ou x = -4",
        difficulty: 1
      },
      {
        competency_id: 4,
        text: "Encontre as raízes de x² - 9 = 0",
        options: ["x = 3 ou x = -3", "x = 4 ou x = -4", "x = √9 ou x = -√9", "x = 9 ou x = -9"],
        correct_answer: "x = 3 ou x = -3",
        difficulty: 1
      },

      // Competência 5 (Sistemas de equações)
      {
        competency_id: 5,
        text: "Resolva o sistema: x + y = 5, x - y = 1",
        options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
        correct_answer: "x = 3, y = 2",
        difficulty: 1
      },
      {
        competency_id: 5,
        text: "Encontre x e y: 2x + y = 7, x - y = 1",
        options: ["x = 3, y = 1", "x = 2, y = 3", "x = 4, y = -1", "x = 1, y = 5"],
        correct_answer: "x = 3, y = 1",
        difficulty: 1
      },
      {
        competency_id: 5,
        text: "Qual a solução do sistema: 3x + 2y = 12, x - y = 2",
        options: ["x = 4, y = 2", "x = 3, y = 1", "x = 2, y = 3", "x = 5, y = 3"],
        correct_answer: "x = 4, y = 2",
        difficulty: 2
      }
    ];

    // Para cada questão
    for (const question of questions) {
      // Tentar encontrar questão existente
      const existingQuestion = await questionRepository.findOne({
        where: {
          competency_id: question.competency_id,
          text: question.text
        }
      });

      if (existingQuestion) {
        // Atualizar questão existente
        await questionRepository.update(existingQuestion.id, question);
      } else {
        // Inserir nova questão
        await questionRepository.save(question);
      }
    }

    console.log("Atualização do seed concluída com sucesso!");
  } catch (error) {
    console.error("Erro durante a atualização:", error);
    throw error;
  }
}

// Executar o seed
fullSeed()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
  }); 