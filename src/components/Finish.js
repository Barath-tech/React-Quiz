function Finish({ points, maxPoints, highscore, dispatch }) {
  const percent = (points / maxPoints) * 100;
  let emoji;
  if (percent === 100) emoji = "🥳🥳";
  if (percent >= 80 && percent < 100) emoji = "🎖️👍";
  if (percent >= 50 && percent < 80) emoji = "🙌✨";
  if (percent >= 30 && percent < 50) emoji = "🫤🫠";
  if (percent < 30) emoji = "🥴🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji} You have scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percent)} %)
      </p>
      <p className="highscore">HighScore is {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset Quiz
      </button>
    </>
  );
}

export default Finish;
