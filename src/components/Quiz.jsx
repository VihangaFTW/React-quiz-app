import QUESTIONS from "../questions";
import { useState, useCallback } from "react";
import completeImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizCompleted = QUESTIONS.length === activeQuestionIndex;

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={completeImg} alt="quiz completed icon"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const handleOnAnswerClick = useCallback(function handleClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }, [])

  // handleOnAnswerClick is a dependancy because this function changes the state indirectly by calling setState inside
  const handleOnSkip = useCallback(() =>handleOnAnswerClick(null), [handleOnAnswerClick])

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key = {activeQuestionIndex}
          timeout={10000}
          onTimeout={handleOnSkip}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li className="answer" key={answer}>
                <button onClick={() => handleOnAnswerClick(answer)}>
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
