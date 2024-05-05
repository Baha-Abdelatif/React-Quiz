import React, { useState } from "react";
import PropTypes from "prop-types";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({
  questionIdx,
  handleTimeout,
  onSelectAnswers,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIdx].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswers(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id='question'>
      <QuestionTimer timeout={10000} onTimeout={handleTimeout} />
      <h2>{QUESTIONS[questionIdx].text}</h2>
      <Answers
        answers={QUESTIONS[questionIdx].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
Question.propTypes = {
  questionIdx: PropTypes.number,
  onSelectAnswers: PropTypes.func,
  handleTimeout: PropTypes.func,
};
