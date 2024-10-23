import React, { useState, useEffect, useCallback } from "react";
import questionData from "./QuestionsData";
export default function MCQs() {
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomQuestions = useCallback((questions, count) => {
    const shuffled = shuffleArray([...questions]);
    return shuffled.slice(0, count);
  }, []);

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const shuffledQuestions = getRandomQuestions(questionData, 5);
    setQuestions(shuffledQuestions);
  }, [getRandomQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledOptions(
        shuffleArray([...questions[currentQuestionIndex].options])
      );
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (option === correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setIsQuizCompleted(true);
      }
    }, 1000);
  };

  const handleRetry = () => {
    const shuffledQuestions = getRandomQuestions(questionData, 10);
    setQuestions(shuffledQuestions);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsQuizCompleted(false);
    setIsCorrect(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 text-white bg-gray-900 h-screen flex flex-col items-center">
      {isQuizCompleted ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-3xl font-bold mb-4">Score {score}</p>
          <button
            className="p-2 rounded-lg text-lg border-2 border-gray-300 hover:bg-gray-700"
            onClick={handleRetry}
          >
            Retry Quiz
          </button>
        </div>
      ) : currentQuestion ? (
        <>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
            {currentQuestion.question}
          </h1>
          <img
            src={currentQuestion.flag}
            alt="Country Flag"
            className="w-60 h-40 mb-6"
          />
          <div className="flex flex-row space-x-2">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl text-lg md:text-xl lg:text-2xl border-2 border-gray-300 hover:bg-gray-700 transition-all duration-300 ${
                  selectedAnswer === option
                    ? isCorrect === null
                      ? "bg-gray-800"
                      : isCorrect && option === currentQuestion.correctAnswer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-gray-800"
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <p
              className={`mt-4 text-lg ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {isCorrect ? "Shabash Its Correct!" : "Insaaan bano its Wrong!"}
            </p>
          )}
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
