import React, { useState } from "react";

export default function Quiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  return <div>Quiz</div>;
}
