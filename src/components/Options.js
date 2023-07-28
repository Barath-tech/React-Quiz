function Options({ question, dispatch, answer }) {
  const answerValue = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, curIndex) => (
        <button
          className={`btn btn-option ${curIndex === answer ? "answer" : ""}
          ${
            answerValue
              ? curIndex === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answerValue}
          onClick={() => dispatch({ type: "newAnswer", payload: curIndex })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
