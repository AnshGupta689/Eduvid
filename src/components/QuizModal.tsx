import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, X } from 'lucide-react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type QuizModalProps = {
  questions: QuizQuestion[];
  topic: string;
  onClose: () => void;
  onComplete: (score: number, answers: any[]) => void;
};

export default function QuizModal({ questions, topic, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const answerRecord = {
      question: questions[currentQuestion].question,
      selectedAnswer: selectedAnswer,
      correctAnswer: questions[currentQuestion].correctAnswer,
      isCorrect: isCorrect,
    };

    setAnswers([...answers, answerRecord]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const finalAnswers = [...answers];
      const score = finalAnswers.filter(a => a.isCorrect).length;
      setShowResults(true);
      onComplete(score, finalAnswers);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setShowResults(false);
  };

  const score = answers.filter(a => a.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-slate-300 mb-6">Great job learning about {topic}</p>

            <div className="bg-slate-700 rounded-xl p-6 mb-6">
              <div className="text-5xl font-bold text-white mb-2">{percentage}%</div>
              <div className="text-xl text-slate-300">
                {score} out of {questions.length} correct
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    answer.isCorrect ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'
                  }`}
                >
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-white text-left">
                    {answer.question}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-all"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentQuestion
                      ? 'bg-blue-500'
                      : index < currentQuestion
                      ? 'bg-green-500'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : showExplanation && index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black bg-opacity-20 flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showExplanation && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 ml-auto flex-shrink-0" />
                  )}
                  {showExplanation && selectedAnswer === index && !isCorrect && (
                    <XCircle className="w-5 h-5 ml-auto flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-500 bg-opacity-20 border-2 border-green-500' : 'bg-blue-500 bg-opacity-20 border-2 border-blue-500'}`}>
              <p className="text-white font-medium mb-2">
                {isCorrect ? '✓ Correct!' : 'ℹ️ Learning Point:'}
              </p>
              <p className="text-slate-200">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
