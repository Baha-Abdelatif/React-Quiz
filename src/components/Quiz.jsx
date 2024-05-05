import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import QUESTIONS from "../questions.js";
import QuizComplete from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx = userAnswers.length;
  const isQuizCompleted = currentQuestionIdx === QUESTIONS.length;

  if (isQuizCompleted) {
    return (
      <div id='summary'>
        <img src={QuizComplete} alt='Quiz completed' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  const shuffledAnswers = QUESTIONS[currentQuestionIdx].answers;
  shuffledAnswers.sort(() => 0.5 - Math.random());

  return (
    <div id='quiz'>
      <div id='question'>
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
