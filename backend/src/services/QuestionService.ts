import { AppDataSource } from "../config/database";
import { Question } from "../entities/Question";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";

export class QuestionService {
  private questionRepository = AppDataSource.getRepository(Question);
  private progressRepository = AppDataSource.getRepository(StudentCompetencyProgress);

  async getQuestionsForCompetency(studentId: string, competencyId: number) {
    console.log(`Iniciando busca de questões para estudante ${studentId} e competência ${competencyId}`);

    // Obter o nível de domínio do estudante para esta competência
    const progress = await this.progressRepository.findOne({
      where: {
        student_id: studentId,
        competency_id: competencyId
      },
      relations: ["competency"]
    });

    console.log(`Progresso encontrado:`, progress);

    const masteryLevel = progress?.mastery_level || 0;
    console.log(`Nível de domínio: ${masteryLevel}`);
    
    // Determinar quantas questões retornar baseado no nível de domínio
    let numberOfQuestions = 1;
    if (masteryLevel === 0) {
      numberOfQuestions = 3;
    } else if (masteryLevel === 1) {
      numberOfQuestions = 2;
    } else if (masteryLevel === 2) {
      numberOfQuestions = 1;
    }

    console.log(`Buscando ${numberOfQuestions} questões para nível de domínio ${masteryLevel}`);

    // Buscar todas as questões para a competência
    const allQuestions = await AppDataSource.query(`
      SELECT 
        q.id,
        q.competency_id as "competencyId",
        q.text,
        q.options,
        q.correct_answer as "correctAnswer",
        q.difficulty,
        q.created_at as "createdAt",
        q.updated_at as "updatedAt",
        cm.description as "competencyDescription",
        cm.subject_code as "subjectCode",
        cm.topic_code as "topicCode"
      FROM question q
      JOIN competency_metadata cm ON q.competency_id = cm.id
      WHERE q.competency_id = $1
    `, [competencyId]);

    console.log(`Total de questões encontradas: ${allQuestions.length}`);

    // Selecionar aleatoriamente o número necessário de questões
    const selectedQuestions = [];
    const availableQuestions = [...allQuestions];

    for (let i = 0; i < numberOfQuestions && availableQuestions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      selectedQuestions.push(availableQuestions[randomIndex]);
      availableQuestions.splice(randomIndex, 1);
    }

    console.log(`Selecionadas ${selectedQuestions.length} questões`);

    return {
      questions: selectedQuestions,
      masteryLevel,
      competencyInfo: {
        id: competencyId,
        description: allQuestions[0]?.competencyDescription,
        subjectCode: allQuestions[0]?.subjectCode,
        topicCode: allQuestions[0]?.topicCode
      }
    };
  }

  async processAnswers(
    studentId: string,
    competencyId: number,
    answers: Array<{ questionId: number; answer: string }>
  ): Promise<{ success: boolean; newLevel: number }> {
    try {
      // Verificar respostas
      const correctAnswers = await Promise.all(
        answers.map(async ({ questionId, answer }) => {
          const question = await this.questionRepository.findOne({
            where: { id: questionId }
          });
          console.log(`Questão:`, question);
          console.log(`Resposta recebida: ${answer}`);
          console.log(`Resposta correta: ${question?.correct_answer}`);
          return question && question.correct_answer === answer;
        })
      );

      const correctCount = correctAnswers.filter(Boolean).length;
      console.log(`Número de acertos: ${correctCount}`);

      const currentProgress = await this.progressRepository.findOne({
        where: {
          student_id: studentId,
          competency_id: competencyId
        }
      });
      const currentLevel = currentProgress?.mastery_level || 0;
      console.log(`Nível atual: ${currentLevel}`);

      // Determinar novo nível baseado no nível atual e número de acertos
      let newLevel = currentLevel;
      
      if (currentLevel === 0) {
        // Nível 0: 1 acerto -> nível 1, 2 acertos -> nível 2, 3 acertos -> nível 3
        if (correctCount === 1) {
          newLevel = 1;
        } else if (correctCount === 2) {
          newLevel = 2;
        } else if (correctCount === 3) {
          newLevel = 3;
        }
      } else if (currentLevel === 1) {
        // Nível 1: 1 acerto -> nível 1, 2 acertos -> nível 2, 0 acertos -> nível 0
        if (correctCount === 1) {
          newLevel = 1;
        } else if (correctCount === 2) {
          newLevel = 2;
        }
        else if (correctCount === 0) {
          newLevel = 0;
        }
      } else if (currentLevel === 2) {
        // Nível 2: 1 acerto -> nível 3
        if (correctCount === 1) {
          newLevel = 3;
        }
        else if (correctCount === 0) {
          newLevel = 1;
        }
      }

      console.log(`Novo nível calculado: ${newLevel}`);

      // Atualizar nível de domínio
      await this.progressRepository.upsert(
        {
          student_id: studentId,
          competency_id: competencyId,
          mastery_level: newLevel,
          last_updated: new Date()
        },
        ["student_id", "competency_id"]
      );

      return {
        success: true,
        newLevel
      };
    } catch (error) {
      console.error('Error processing answers:', error);
      throw error;
    }
  }
} 