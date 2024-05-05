import React from "react";
import QuizLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={QuizLogo} alt='A quiz about ReactJs' />
      <h1>ReactQuiz</h1>
    </header>
  );
}
