import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "time" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{secs}
      {secs < 10 && "0"}
    </div>
  );
}

export default Timer;
