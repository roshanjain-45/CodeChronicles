import { useState, useEffect } from "react";

function Timer({ onTimeUp }) {
  const [time, setTime] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  return <h3>Time Left: {Math.floor(time / 60)}:{time % 60}</h3>;
}

export default Timer;
