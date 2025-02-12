import { useRef } from "react";

export default function Answers({ answersList, selectedAnswerString, answerState, onAnswerClick }) {
  const shuffledAnswers = useRef();
  
	// load up shuffled answers for first time
	if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answersList];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        // check if user has chosen this answer as his final answer
        const isCurrentAnswerSelected =
          selectedAnswerString === answer;
        let btnClass = "";
        // provided that user has chosen this answer, check if it is right or wrong
        if (isCurrentAnswerSelected && answerState === "selected") {
          btnClass = "selected";
        } else if (
          isCurrentAnswerSelected &&
          (answerState === "correct" || answerState === "wrong")
        ) {
          btnClass = answerState;
        }
        return (
          <li className="answer" key={answer}>
            <button
              disabled = {answerState === 'selected'}
              className={btnClass}
              onClick={() => onAnswerClick(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
