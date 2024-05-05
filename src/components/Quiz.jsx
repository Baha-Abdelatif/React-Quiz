import React, { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";
import QuestionTimer from "./QuestionTimer.jsx";
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

  if (isQuizCompleted) {
    return (
      <div id='summary'>
        <img src={QuizComplete} alt='Quiz completed' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = QUESTIONS[currentQuestionIdx].answers;
  shuffledAnswers.sort(() => 0.5 - Math.random());

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={currentQuestionIdx}
          timeout={10000}
          onTimeout={handleTimeout}
        />
        <h2>{QUESTIONS[currentQuestionIdx].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.map((answer) => {
            return (
              <li className='answer' key={uuid()}>
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
