import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function QuestionTimer({ onTimeout, timeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);
    return () => {
      clearInterval(questionInterval);
    };
  }, []);

  return (
    <progress id='question-time' value={remainingTime} max={timeout} min={0} />
  );
}
QuestionTimer.propTypes = {
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
};
