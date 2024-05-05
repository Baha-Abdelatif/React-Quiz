import React, { useState, useCallback } from "react";
import Question from "./Question.jsx";
import QUESTIONS from "../questions.js";
import QuizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx = userAnswers.length;
  const isQuizCompleted = currentQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleTimeout = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  return isQuizCompleted ? (
    <div id='summary'>
      <img src={QuizComplete} alt='Quiz completed' />
      <h2>Quiz Completed!</h2>
    </div>
  ) : (
    <div id='quiz'>
      <Question
        key={currentQuestionIdx}
        questionIdx={currentQuestionIdx}
        handleTimeout={handleTimeout}
        onSelectAnswers={handleSelectAnswer}
      />
    </div>
  );
}
