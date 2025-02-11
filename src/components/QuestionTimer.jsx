import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('setting timer!')
    const timerId = setTimeout(onTimeout, timeout);
    return () => {clearTimeout(timerId); console.log('timer closed!')};
  }, [onTimeout, timeout]);

  useEffect(() => {
    console.log('SETTING INTERVAL!')
    const intervalId = setInterval(() => {
        setRemainingTime((prevTime)=> prevTime-100);
    }, 100);
    return () => clearInterval(intervalId);
  }, [])

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
