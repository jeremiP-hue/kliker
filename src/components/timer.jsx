import { useEffect, useState } from "react";

const Timer = () => {
  const [sekundy, setSekundy] = useState(0);
  const [minuty, setMinuty] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSekundy((s) => {
        const nowaSekunda = s + 1;

        if (nowaSekunda >= 60) {
          setMinuty((m) => m + 1);
          return 0;
        }

        return nowaSekunda;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>minuty {minuty}, sekundy {sekundy}</div>;
};

export default Timer;
