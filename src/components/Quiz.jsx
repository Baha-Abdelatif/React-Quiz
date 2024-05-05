import React, { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import QuizComplete from "../assets/quiz-complete.png";
import Answers from "./Answers.jsx";

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

  if (isQuizCompleted) {
    return (
      <div id='summary'>
        <img src={QuizComplete} alt='Quiz completed' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={"TimerId." + currentQuestionIdx}
          timeout={10000}
          onTimeout={handleTimeout}
        />
        <h2>{QUESTIONS[currentQuestionIdx].text}</h2>
        <Answers
          key={"AnswersId." + currentQuestionIdx}
          answers={QUESTIONS[currentQuestionIdx].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
