function Progress({ numQuestions, curIndex, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={curIndex + Number(answer !== null)} />

      <p>
        Questions <strong>{curIndex + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
