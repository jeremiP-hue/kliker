import { useEffect, useState } from "react";
import {
  pobierzLocalStorage,
  ustawLocalStorage,
} from "../../useLocalStorageState";

const Gielda = ({ klikniecia, setKlikniecia }) => {
  const [cena, setCena] = useState(() =>
    pobierzLocalStorage("gieldaCenaZubra", 10)
  );
  const [zuberki, setZuberki] = useState(() =>
    pobierzLocalStorage("gieldaZuberki", 0)
  );
  const [cena_coina, setCena_coina] = useState(() =>
    pobierzLocalStorage("gieldaCenaCoina", 10000)
  );
  const [iloscCoinow, setIloscCoinow] = useState(() =>
    pobierzLocalStorage("gieldaIloscCoinow", 0)
  );

  useEffect(() => {
    ustawLocalStorage("gieldaCenaZubra", cena);
  }, [cena]);

  useEffect(() => {
    ustawLocalStorage("gieldaZuberki", zuberki);
  }, [zuberki]);

  useEffect(() => {
    ustawLocalStorage("gieldaCenaCoina", cena_coina);
  }, [cena_coina]);

  useEffect(() => {
    ustawLocalStorage("gieldaIloscCoinow", iloscCoinow);
  }, [iloscCoinow]);

  const kupZubraGielda = () => {
    if (klikniecia >= cena) {
      setKlikniecia((k) => k - cena);
      setZuberki((z) => z + 1);
    } else {
      alert("Jestes biedny, nie masz hajsu.");
    }
  };

  const sprzedajZubraGielda = () => {
    if (zuberki > 0) {
      setZuberki((z) => z - 1);
      setKlikniecia((k) => k + cena);
    } else {
      alert("Nie masz zubrow do sprzedazy.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCena((c) => Math.max(1, c + (Math.random() < 0.5 ? -1 : 1)));
    }, 200);

    return () => clearInterval(timer);
  }, [setCena]);

  const kupCoina = () => {
    if (klikniecia >= cena_coina) {
      setKlikniecia((k) => k - cena_coina);
      setIloscCoinow((z) => z + 1);
    } else {
      alert("Nie masz mamony");
    }
  };

  const sprzedajCoina = () => {
    if (iloscCoinow > 0) {
      setIloscCoinow((c) => c - 1);
      setKlikniecia((k) => k + cena_coina);
    } else {
      alert("Nie masz coinow");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const wynik = Math.random() > 0.5 ? -400 : 400;
      const wynik2 = Math.random() > 0.5 ? -40 : -0;
      const wynik3 = Math.random() < 0.5 ? -4 : 4;

      setCena_coina((c) => {
        const nowaCena = c + wynik + wynik2 + wynik3;
        return nowaCena < 1 ? 200 : nowaCena;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [setCena_coina]);

  return (
    <div className="panel-gry">
      <h2>Gielda zuberkowa</h2>
      <p>
        Cena zubra: <b>{cena}</b>
      </p>
      <p>
        Ilosc zubrow: <b>{zuberki}</b>
      </p>

      <button className="duzy-przycisk" onClick={kupZubraGielda}>
        Kup zubra
      </button>

      <button className="duzy-przycisk" onClick={sprzedajZubraGielda}>
        Sprzedaj zubra
      </button>

      <h2>Zuber Coiny</h2>
      <p>Cena coina: {cena_coina}</p>
      <p>Ilosc coinow: {iloscCoinow}</p>

      <button className="duzy-przycisk" onClick={kupCoina}>
        Kup coina
      </button>
      <button className="duzy-przycisk" onClick={sprzedajCoina}>
        Sprzedaj coina
      </button>
    </div>
  );
};

export default Gielda;
