import { useState, useEffect } from "react";
import GameView from "./GameView";
import "./App.css";

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
  // 4) RUCH ŻUBRÓW I BOCZKÓW - losowanie nowych pozycji
  // =========================================================
  useEffect(() => {
    const timer = setInterval(() => {
      setZubry((z) =>
        z.map((zz) => ({ ...zz, x: Math.random() * 80, y: Math.random() * 80 }))
      );
      setBoczek((b) =>
        b.map((bb) => ({ ...bb, x: Math.random() * 80, y: Math.random() * 80 }))
      );
    }, 20);

    return () => clearInterval(timer);
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
