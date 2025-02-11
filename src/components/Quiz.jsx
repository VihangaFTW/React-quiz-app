import QUESTIONS from "../questions";
import { useState } from "react";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  function handleOnButtonClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }

  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex]}</h2>;
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
          return (
            <li className="answer" key={answer}>
              <button onClick={() => handleOnButtonClick(answer)}>
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
