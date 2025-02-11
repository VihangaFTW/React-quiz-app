import QUESTIONS from "../questions";
import { useState } from "react";
import completeImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizCompleted = QUESTIONS.length === activeQuestionIndex;

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={completeImg} alt="quiz compelte icon"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  function handleOnButtonClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
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
    </div>
  );
}
