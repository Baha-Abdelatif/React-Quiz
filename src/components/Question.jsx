import React from "react";
import PropTypes from "prop-types";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({
  questionText,
  answers,
  onSelectAnswers,
  selectedAnswer,
  answerState,
  handleTimeout,
}) {
  return (
    <div id='question'>
      <QuestionTimer timeout={10000} onTimeout={handleTimeout} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswers}
      />
    </div>
  );
}
Question.propTypes = {
  questionText: PropTypes.string,
  answers: PropTypes.array,
  onSelectAnswers: PropTypes.func,
  selectedAnswer: PropTypes.string,
  handleTimeout: PropTypes.func,
  answerState: PropTypes.string,
};
