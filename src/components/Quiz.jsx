import React, { useState, useCallback } from "react";
import Question from "./Question.jsx";
import QUESTIONS from "../questions.js";
import QuizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const currentQuestionIdx =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizCompleted = currentQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[currentQuestionIdx].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [currentQuestionIdx]
  );

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
        questionText={QUESTIONS[currentQuestionIdx].text}
        answers={QUESTIONS[currentQuestionIdx].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswers={handleSelectAnswer}
        handleTimeout={handleTimeout}
      />
    </div>
  );
}
