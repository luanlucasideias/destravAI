import { AppDataSource } from "../config/database";
import { Question } from "../entities/Question";
import { StudentCompetencyProgress } from "../entities/StudentCompetencyProgress";
import { StudentQuestionSession } from "../entities/StudentQuestionSession";

export class QuestionService {
  private questionRepository = AppDataSource.getRepository(Question);
  private progressRepository = AppDataSource.getRepository(StudentCompetencyProgress);
  private sessionRepository = AppDataSource.getRepository(StudentQuestionSession);

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

    // Buscar a última sessão para obter a última competência abordada
    const lastSession = await this.sessionRepository.findOne({
      where: { student_id: studentId },
      order: { created_at: "DESC" }
    });
    const lastCompetencyId = lastSession?.competency_id;

    // Criar sessão de questões
    const session = this.sessionRepository.create({
      student_id: studentId,
      competency_id: competencyId,
      question_ids: selectedQuestions.map(q => q.id),
      answers_given: [],
      current_question_index: 0,
      total_questions_required: numberOfQuestions,
      session_completed: false,
      last_competency_id: lastCompetencyId ?? null
    });
    await this.sessionRepository.save(session);

    return {
      questions: selectedQuestions,
      masteryLevel,
      competencyInfo: {
        id: competencyId,
        description: allQuestions[0]?.competencyDescription,
        subjectCode: allQuestions[0]?.subjectCode,
        topicCode: allQuestions[0]?.topicCode
      },
      sessionId: session.id
    };
  }

  async processAnswers(
    studentId: string,
    competencyId: number,
    answers: Array<{ questionId: number; answer: string }>,
    sessionId?: string
  ): Promise<{ success: boolean; newLevel?: number; message?: string }> {
    try {
      // Validar sessão
      if (!sessionId) {
        return { success: false, message: "SessionId é obrigatório." };
      }
      const session = await this.sessionRepository.findOne({ where: { id: sessionId, student_id: studentId, competency_id: competencyId } });
      if (!session) {
        return { success: false, message: "Sessão não encontrada." };
      }
      if (session.session_completed) {
        return { success: false, message: "Sessão já finalizada." };
      }
      // Registrar respostas
      session.answers_given = answers.map(a => a.answer);
      session.session_completed = true;
      session.last_interaction_at = new Date();
      session.last_competency_id = session.competency_id;
      await this.sessionRepository.save(session);

      // Verificar respostas corretas
      const correctAnswers = await Promise.all(
        answers.map(async ({ questionId, answer }) => {
          const question = await this.questionRepository.findOne({ where: { id: questionId } });
          return question && question.correct_answer === answer;
        })
      );
      const correctCount = correctAnswers.filter(Boolean).length;

      // Atualizar progresso
      const currentProgress = await this.progressRepository.findOne({
        where: {
          student_id: studentId,
          competency_id: competencyId
        }
      });
      const currentLevel = currentProgress?.mastery_level || 0;
      let newLevel = currentLevel;
      if (currentLevel === 0) {
        if (correctCount === 1) newLevel = 1;
        else if (correctCount === 2) newLevel = 2;
        else if (correctCount === 3) newLevel = 3;
      } else if (currentLevel === 1) {
        if (correctCount === 1) newLevel = 1;
        else if (correctCount === 2) newLevel = 2;
        else if (correctCount === 0) newLevel = 0;
      } else if (currentLevel === 2) {
        if (correctCount === 1) newLevel = 3;
        else if (correctCount === 0) newLevel = 1;
      }
      await this.progressRepository.upsert(
        {
          student_id: studentId,
          competency_id: competencyId,
          mastery_level: newLevel,
          last_updated: new Date()
        },
        ["student_id", "competency_id"]
      );
      return { success: true, newLevel };
    } catch (error) {
      console.error('Error processing answers:', error);
      throw error;
    }
  }
} 