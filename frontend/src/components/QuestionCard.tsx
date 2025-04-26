import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => Promise<boolean>;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onNextQuestion,
  onPreviousQuestion,
  questionNumber,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionClick = (option: string) => {
    if (showResult) return;
    console.log('Opção selecionada:', option);
    setSelectedAnswer(option);
  };

  const handleFinishQuestion = async () => {
    if (!selectedAnswer || isSubmitting || showResult) return;
    
    setIsSubmitting(true);
    try {
      const result = await onAnswer(selectedAnswer);
      setIsCorrect(result);
      setShowResult(true);
    } catch (error) {
      console.error('Erro ao processar resposta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
    onNextQuestion();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Questão {questionNumber} de {totalQuestions}
        </span>
      </div>

      <h3 className="text-lg font-medium mb-4">{question.text}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-3 rounded-lg border transition-colors text-left ${
              selectedAnswer === option
                ? showResult
                  ? isCorrect && option === selectedAnswer
                    ? 'bg-green-100 border-green-500'
                    : !isCorrect && option === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : option === question.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : 'bg-gray-100 border-gray-300'
                  : 'bg-blue-100 border-blue-500'
                : showResult
                ? option === question.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : 'bg-gray-100 border-gray-300'
                : 'border-gray-300 hover:border-blue-300'
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={showResult}
          >
            <div className="flex items-center">
              <span className="flex-grow">{option}</span>
              {showResult && option === question.correctAnswer && (
                <span className="text-green-600 ml-2">✓</span>
              )}
              {showResult && option === selectedAnswer && option !== question.correctAnswer && (
                <span className="text-red-600 ml-2">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Área de resultado */}
      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <p className="font-medium text-center text-lg">
            {isCorrect ? '✓ Resposta correta!' : '✗ Resposta incorreta!'}
          </p>
          {!isCorrect && (
            <p className="text-center mt-2">
              A resposta correta era: {question.correctAnswer}
            </p>
          )}
        </div>
      )}

      {/* Área dos botões */}
      <div className="mt-6 flex justify-between">
        <button
          className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
          onClick={onPreviousQuestion}
        >
          Anterior
        </button>

        <button
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleFinishQuestion}
        >
          Finalizar
        </button>

        <button
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          onClick={onNextQuestion}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}; 