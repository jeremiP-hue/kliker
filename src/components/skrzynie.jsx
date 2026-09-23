import { useEffect, useState } from "react";
import { pobierzLocalStorage, ustawLocalStorage } from "../useLocalStorageState";

const Skrzynie = ({ skrzynieaktywne, setKlikniecia }) => {
  const [pozX, setPozX] = useState(() =>
    pobierzLocalStorage("skrzyniaPozX", 0)
  );
  const [pozY, setPozY] = useState(() =>
    pobierzLocalStorage("skrzyniaPozY", 0)
  );
  const [widoczna, setWidoczna] = useState(() =>
    pobierzLocalStorage("skrzyniaWidoczna", false)
  );

  useEffect(() => {
    ustawLocalStorage("skrzyniaPozX", pozX);
  }, [pozX]);

  useEffect(() => {
    ustawLocalStorage("skrzyniaPozY", pozY);
  }, [pozY]);

  useEffect(() => {
    ustawLocalStorage("skrzyniaWidoczna", widoczna);
  }, [widoczna]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (skrzynieaktywne && !widoczna && Math.random() < 0.1) {
        setPozX(Math.random() * 100);
        setPozY(Math.random() * 100);
        setWidoczna(true);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [setPozX, setPozY, setWidoczna, skrzynieaktywne, widoczna]);

  useEffect(() => {
    if (!widoczna) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setWidoczna(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [setWidoczna, widoczna]);

  if (!skrzynieaktywne || !widoczna) {
    return null;
  }

  return (
    <span
      className="ikona-skrzyni"
      style={{ left: `${pozX}%`, top: `${pozY}%`, zIndex: 10000000000000000 }}
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
