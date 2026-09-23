import { useCallback, useEffect, useRef, useState } from "react";
import GameView from "./GameView";
import { pobierzLocalStorage, ustawLocalStorage } from "./useLocalStorageState";
import "./App.css";

const MIN = 0;
const MAX = 88;
const KROK_ZUBRA = Math.random();
const KROK_BOCZKU = Math.random();

const App = () => {
  const [klikniecia, setKlikniecia] = useState(() =>
    pobierzLocalStorage("klikniecia", 0)
  );
  const [bonusKlik, setBonusKlik] = useState(() =>
    pobierzLocalStorage("bonusKlik", 0)
  );
  const [mieso, setMieso] = useState(() => pobierzLocalStorage("mieso", 0));
  const [zubry, setZubry] = useState(() => pobierzLocalStorage("zubry", []));
  const [boczek, setBoczek] = useState(() =>
    pobierzLocalStorage("boczek", [])
  );
  const [isZepsute, setZepsute] = useState(() =>
    pobierzLocalStorage("isZepsute", false)
  );

  const pokazanoWygrana = useRef(false);
  const wygranaRef = useRef(false);

  const wygrana = klikniecia >= 1_000_000_000 && mieso >= 200_000;
  const ustawZubry = useCallback((updater) => {
    setZubry((aktualne) => {
      if (wygranaRef.current) {
        return [];
      }

      return typeof updater === "function" ? updater(aktualne) : updater;
    });
  }, []);

  const dodajKlik = () => setKlikniecia((k) => k + 1 + bonusKlik);

  useEffect(() => {
    ustawLocalStorage("klikniecia", klikniecia);
  }, [klikniecia]);

  useEffect(() => {
    ustawLocalStorage("bonusKlik", bonusKlik);
  }, [bonusKlik]);

  useEffect(() => {
    ustawLocalStorage("mieso", mieso);
  }, [mieso]);

  useEffect(() => {
    ustawLocalStorage("zubry", zubry);
  }, [zubry]);

  useEffect(() => {
    ustawLocalStorage("boczek", boczek);
  }, [boczek]);

  useEffect(() => {
    ustawLocalStorage("isZepsute", isZepsute);
  }, [isZepsute]);

  useEffect(() => {
    wygranaRef.current = wygrana;
  }, [wygrana]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        alert("Nie czituj, cziterze.");
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, []);

  useEffect(() => {
    const handleF = (e) => {
      if (e.key === "f") {
        setKlikniecia((k) => k + 100000000000);
      }
    };

    window.addEventListener("keydown", handleF);
    return () => window.removeEventListener("keydown", handleF);
  }, [setKlikniecia]);

  useEffect(() => {
    const ruszListe = (lista) =>
      lista.map((o) => {
        const krok_lewo =
          typeof o.krok_lewo === "number" ? o.krok_lewo : Math.random() * 2;
        const krok_prawo =
          typeof o.krok_prawo === "number" ? o.krok_prawo : Math.random() * 2;
        const krok_gora = Math.random() * 2;
        let x = typeof o.x === "number" ? o.x : Math.random() * 80;
        let y = typeof o.y === "number" ? o.y : Math.random() * 80;
        let kierunekGora = o.kierunekGora;
        let kierunekPrawo = o.kierunekPrawo;

        if (typeof kierunekGora !== "boolean") {
          kierunekGora = Math.random() < 0.5;
        }
        if (typeof kierunekPrawo !== "boolean") {
          kierunekPrawo = Math.random() < 0.5;
        }

        x += kierunekPrawo ? krok_prawo : -krok_lewo;
        y += kierunekGora ? -krok_gora : krok_gora;

        if (x <= MIN) {
          x = MIN;
          kierunekPrawo = true;
        } else if (x >= MAX) {
          x = MAX;
          kierunekPrawo = false;
        }

        if (y <= MIN) {
          y = MIN;
          kierunekGora = false;
        } else if (y >= MAX) {
          y = MAX;
          kierunekGora = true;
        }

        return { ...o, x, y, kierunekGora, kierunekPrawo, krok_lewo, krok_prawo };
      });

    const timer = setInterval(() => {
      setZubry((z) => (wygranaRef.current ? [] : ruszListe(z)));
      setBoczek((b) => ruszListe(b));
    }, 16);

    return () => {
      clearInterval(timer);
    };
  }, [setBoczek, setZubry]);

  useEffect(() => {
    if (wygrana && !pokazanoWygrana.current) {
      alert("WYGRALES GRE! Jestes krolem zubrow!");

      pokazanoWygrana.current = true;
    }
  }, [wygrana]);

  return (
    <div className={isZepsute ? "tryb-zepsucia" : ""}>
      <GameView
        wygrana={wygrana}
        klikniecia={klikniecia}
        setKlikniecia={setKlikniecia}
        bonusKlik={bonusKlik}
        setBonusKlik={setBonusKlik}
        mieso={mieso}
        setMieso={setMieso}
        zubry={wygrana ? [] : zubry}
        boczek={boczek}
        dodajKlik={dodajKlik}
        zepsujwszystko={() => setZepsute(true)}
        setZubry={ustawZubry}
        setBoczek={setBoczek}
      />
    </div>
  );
};

export default App;
