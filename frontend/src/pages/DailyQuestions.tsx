import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { QuestionCard } from '../components/QuestionCard';
import { api } from '../services/api';

interface Question {
  id: number;
  competencyId: number;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
  competencyDescription: string;
  subjectCode: string;
  topicCode: string;
}

interface Competency {
  id: number;
  description: string;
  subjectCode: string;
  topicCode: string;
}

export const DailyQuestions: React.FC = () => {
  const { user } = useAuth();
  const [currentCompetency, setCurrentCompetency] = useState<Competency | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar próxima competência
  const fetchNextCompetency = async () => {
    try {
      const response = await api.get(`/competencies/student/${user?.id}/competencies/next`);
      setCurrentCompetency(response.data);
      return response.data;
    } catch (err) {
      setError('Erro ao buscar próxima competência');
      console.error(err);
      return null;
    }
  };

  // Buscar questões da competência
  const fetchQuestions = async (competencyId: number) => {
    try {
      const response = await api.get(`/competencies/student/${user?.id}/competencies/${competencyId}/questions`);
      setCurrentQuestions(response.data.questions);
      setCurrentQuestionIndex(0);
    } catch (err) {
      setError('Erro ao buscar questões');
      console.error(err);
    }
  };

  // Processar resposta
  const handleAnswer = async (answer: string): Promise<boolean> => {
    if (!currentCompetency || !currentQuestions[currentQuestionIndex]) return false;

    try {
      // Enviar resposta
      await api.post(`/competencies/student/${user?.id}/competencies/${currentCompetency.id}/answers`, {
        answers: [{
          questionId: currentQuestions[currentQuestionIndex].id,
          answer: answer
        }]
      });

      // Retornar se a resposta está correta
      return answer === currentQuestions[currentQuestionIndex].correctAnswer;
    } catch (err) {
      setError('Erro ao processar resposta');
      console.error(err);
      return false;
    }
  };

  // Avançar para a próxima questão
  const handleNextQuestion = async () => {
    // Verificar se é a última questão da rodada
    if (currentQuestionIndex === currentQuestions.length - 1) {
      setIsLoading(true);
      // Buscar nova competência
      const newCompetency = await fetchNextCompetency();
      if (newCompetency) {
        await fetchQuestions(newCompetency.id);
      }
      setIsLoading(false);
    } else {
      // Próxima questão da rodada
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Voltar para a questão anterior
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Inicialização
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      const competency = await fetchNextCompetency();
      if (competency) {
        await fetchQuestions(competency.id);
      }
      setIsLoading(false);
    };

    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  if (!currentCompetency || !currentQuestions[currentQuestionIndex]) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Nenhuma questão disponível no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Questões Diárias</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {currentCompetency.subjectCode} - {currentCompetency.topicCode}
        </h2>
        <p className="text-gray-600">{currentCompetency.description}</p>
      </div>
      <QuestionCard
        key={`${currentQuestions[currentQuestionIndex].id}-${currentQuestionIndex}`}
        question={currentQuestions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={currentQuestions.length}
      />
    </div>
  );
}; 