import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Startpage from "./Startpage";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";

const Secs_per_quesiton = 30;

const initialState = {
  questions: [],
  //status: loading,error,ready,active,finished
  status: "loading",
  curIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * Secs_per_quesiton,
      };
    case "newAnswer":
      const question = state.questions.at(state.curIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        curIndex: state.curIndex + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "time":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action went wrong");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status,
    questions,
    curIndex,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(() => {
    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataError", payload: err }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Startpage numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              curIndex={curIndex}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              question={questions[curIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                curIndex={curIndex}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <Finish
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
