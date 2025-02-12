import QUESTIONS from "../questions";
import { useState, useCallback } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Summary from "./Summary";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  // user has chosen an answer for current question, this maps to the question in QUESTIONS[length-1]
  // because after answering, the length of the userAnswers increases by 1 after appending the user's answer [see handleOnAnswerClick]
  const activeQuestionIndex = answerState
    ? userAnswers.length - 1
    : userAnswers.length;

  const handleOnAnswerClick = useCallback(
    function handleClick(selectedAnswer) {
      setUserAnswers((prevAnswers) => {
        setAnswerState("selected");
        return [...prevAnswers, selectedAnswer];
      });
      // Pause re-render for 1 second, then check if user answer is correct
      setTimeout(() => {
        // correct answer is always the first option in QUESTIONS
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        // need to reset answet state to "" after styling the answer button for next question as activeQuestionIndex depends on it
        // this timeout will be called after the parent timeout finishes
        setTimeout(() => {
          setAnswerState("");
        }, 1000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  // handleOnAnswerClick is a dependancy because this function changes the state indirectly by calling setState inside
  const handleOnSkip = useCallback(
    () => handleOnAnswerClick(null),
    [handleOnAnswerClick]
  );

  return (
    <>
      {!answerState && userAnswers.length === QUESTIONS.length ? (
        <Summary />
      ) : (
        <div id="quiz">
          <div id="question">
            <QuestionTimer
              // sibling elements cannot have the same key in React
              key={`timer-${activeQuestionIndex}`}
              timeout={10000}
              onTimeout={handleOnSkip}
            />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            {/* Answers component does re-render as prop values change but the previous useRef value still persists so the component appears with the previous answers
          so we need to tell react to unmount and remount the component with the new values using a new key prop */}
            <Answers
              key={`answers-${activeQuestionIndex}`}
              answersList={QUESTIONS[activeQuestionIndex].answers}
              selectedAnswerString={userAnswers[activeQuestionIndex]}
              answerState={answerState}
              onAnswerClick={handleOnAnswerClick}
            />
          </div>
        </div>
      )}
    </>
  );
}
