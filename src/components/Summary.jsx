import completeImg from "../assets/quiz-complete.png";

export default function Summary() {
  return (
    <div id="summary">
      <img src={completeImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
    </div>
  );
}
