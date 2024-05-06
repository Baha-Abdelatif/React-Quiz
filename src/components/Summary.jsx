import React from "react";
import PropTypes from "prop-types";
import QUESTIONS from "../questions.js";
import QuizComplete from "../assets/quiz-complete.png";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, idx) => answer === QUESTIONS[idx].answers[0]
  );
  const wrongAnswers = userAnswers.filter(
    (answer, idx) => answer !== null && answer !== QUESTIONS[idx].answers[0]
  );
  const count = {
    skipped: "",
    correct: "",
    wrong: "",
  };
  count.skipped = ((skippedAnswers.length * 100) / QUESTIONS.length).toFixed();
  count.correct = ((correctAnswers.length * 100) / QUESTIONS.length).toFixed();
  count.wrong = ((wrongAnswers.length * 100) / QUESTIONS.length).toFixed();

  return (
    <div id='summary'>
      <img src={QuizComplete} alt='Quiz completed' />
      <h2>Quiz Completed!</h2>
      <div id='summary-stats'>
        <p>
          <span className='text'>correct answers</span>
          <span className='number'>{count.correct}%</span>
        </p>
        <p>
          <span className='text'>wrong answers</span>
          <span className='number'>{count.wrong}%</span>
        </p>
        <p>
          <span className='text'>skipped answers</span>
          <span className='number'>{count.skipped}%</span>
        </p>
      </div>
      <ol>
        {QUESTIONS.map((question, idx) => {
          const cssClass =
            userAnswers[idx] === null
              ? "skipped"
              : userAnswers[idx] === question.answers[0]
              ? "correct"
              : "wrong";
          return (
            <li key={question.id}>
              <h3>{idx + 1}</h3>
              <p className='question'>{question.text}</p>
              <p className={`user-answer ${cssClass}`}>
                {userAnswers[idx] ?? "skipped"}
              </p>
              {(cssClass === "wrong" || cssClass === "skipped") && (
                <p className='user-answer correct'>{question.answers[0]}</p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
Summary.propTypes = {
  userAnswers: PropTypes.array,
};
