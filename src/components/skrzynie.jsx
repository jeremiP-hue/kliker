import { useEffect, useState } from "react";

const Skrzynie = ({ skrzynieaktywne, setKlikniecia }) => {
  const [pozX, setPozX] = useState(0);
  const [pozY, setPozY] = useState(0);
  const [widoczna, setWidoczna] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (skrzynieaktywne && !widoczna && Math.random() < 0.1) {
        setPozX(Math.random() * 100);
        setPozY(Math.random() * 100);
        setWidoczna(true);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [skrzynieaktywne, widoczna]);

  useEffect(() => {
    if (!widoczna) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setWidoczna(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [widoczna]);

  if (!skrzynieaktywne || !widoczna) {
    return null;
  }

  return (
    <span
      className="skrzynia"
      style={{ left: `${pozX}%`, top: `${pozY}%`, zIndex: 10000000000000000}}
      onClick={() => {
        setKlikniecia((k) => k + Math.floor(k / 5));
        setWidoczna(false);
      }}
    >
      🎁
    </span>
  );
};

export default Skrzynie;
