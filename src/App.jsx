import { useState, useEffect } from "react";
import GameView from "./GameView";
import "./App.css";

const MIN = 0;
const MAX = 88;
const KROK_ZUBRA = Math.random();
const KROK_BOCZKU = Math.random();

const App = () => {
  // =========================================================
  // 1) STANY (useState) - czyli "pamięć gry"
  // =========================================================

  // ---------- KLIKACZ / WALUTY ----------
  const [klikniecia, setKlikniecia] = useState(0); // główna waluta gry
  const [bonusKlik, setBonusKlik] = useState(0); // dodatkowe kliknięcia do każdego kliku
  const [mieso, setMieso] = useState(0); // mięso z usuwania żubrów

  // ---------- OBIEKTY NA EKRANIE ----------
  const [zubry, setZubry] = useState([]); // lista żubrów (id, x, y)
  const [boczek, setBoczek] = useState([]); // lista boczków (id, x, y)

  const [isZepsute, setZepsute] = useState(false);

  // =========================================================
  // 2) FUNKCJE POMOCNICZE - dodawanie rzeczy / kliknięcie
  // =========================================================
  const dodajKlik = () => setKlikniecia((k) => k + 1 + bonusKlik);

  // =========================================================
  // 3) ANTY-CHEAT / KLAWISZE (useEffect + eventListener)
  // =========================================================
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
  }, []);

  // =========================================================
  // 4) RUCH ŻUBRÓW I BOCZKÓW - płynny ruch (stały krok + odbicia)
  // =========================================================
  useEffect(() => {
    const ruszListe = (lista) =>
      lista.map((o) => {
        const krok = Math.random() 
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

        x += kierunekPrawo ? krok : -krok;
        y += kierunekGora ? -krok : krok;

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

        return { ...o, x, y, kierunekGora, kierunekPrawo };
      });

    const timer = setInterval(() => {
      setZubry((z) => ruszListe(z));
      setBoczek((b) => ruszListe(b));
    }, 16);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // =========================================================
  // 5) WYGRANA - warunek końca gry
  // =========================================================
  useEffect(() => {
    if (klikniecia >= 1_000_000_000 && mieso >= 200_000) {
      alert("🏆 WYGRAŁEŚ GRĘ! Jesteś królem żubrów! 🦬👑");
    }
  }, [klikniecia, mieso]);

  // =========================================================
  // 6) RENDER - przekazanie danych do GameView
  // =========================================================
  return (
    <div className={isZepsute ? "tryb-zepsucia" : ""}>
      <GameView
        klikniecia={klikniecia}
        setKlikniecia={setKlikniecia}
        bonusKlik={bonusKlik}
        setBonusKlik={setBonusKlik}
        mieso={mieso}
        setMieso={setMieso}
        zubry={zubry}
        boczek={boczek}
        dodajKlik={dodajKlik}
        zepsujwszystko={() => setZepsute(true)}
        setZubry={setZubry}
        setBoczek={setBoczek}
      />
    </div>
  );
};

export default App;
