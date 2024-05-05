import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx = userAnswers.length;
  const shuffledAnswers = QUESTIONS[currentQuestionIdx].answers;
  shuffledAnswers.sort(() => 0.5 - Math.random());

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  return currentQuestionIdx < 7 ? (
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
  ) : (
    <div>
      <h2>No more questions</h2>
    </div>
  );
}
