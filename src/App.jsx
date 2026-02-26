import { useState, useEffect, useRef } from "react";
import GameView from "./GameView";
import "./App.css"

const App = () => {
  // =========================================================
  // 1) STANY (useState) – czyli "pamięć gry"
  // =========================================================

  // ---------- KLIKACZ / WALUTY ----------
  const [klikniecia, setKlikniecia] = useState(0);     // główna waluta gry
  const [bonusKlik, setBonusKlik] = useState(0);       // ile dodatkowych kliknięć dostajesz do każdego kliku
  const [mieso, setMieso] = useState(0);               // mięso zbierane z usuwania żubrów

  // ---------- OBIEKTY NA EKRANIE ----------
  const [zubry, setZubry] = useState([]);              // lista żubrów (każdy ma id, x, y)
  const [boczek, setBoczek] = useState([]);            // lista boczków (też id, x, y)

  const [isZepsute, setZepsute] = useState(false);

  // =========================================================
  // 2) FUNKCJE POMOCNICZE – dodawanie rzeczy / kliknięcie
  // =========================================================

  // klik = 1 + bonusKlik
  const dodajKlik = () => setKlikniecia(k => k + 1 + bonusKlik);


  // =========================================================
  // 3) ANTY-CHEAT / KLAWISZE (useEffect + eventListener)
  // =========================================================

  // Enter -> alert
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        alert("nie czituj cziterze");
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, []);

  // f -> ustaw kliknięcia na 100000 (to jest tak naprawdę cheat)
  useEffect(() => {
    const handleF = (e) => {
      if (e.key === "f") {
        setKlikniecia(100000);
      }
    };

    window.addEventListener("keydown", handleF);
    return () => window.removeEventListener("keydown", handleF);
  }, []);

  // =========================================================
  // 4) SKLEP / ULEPSZENIA – co kupujesz za kliknięcia/mięso
  // =========================================================

 

  // =========================================================
  // 7) RUCH ŻUBRÓW I BOCZKÓW – co 2s losujesz nowe pozycje
  // =========================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setZubry(z =>
        z.map(zz => ({ ...zz, x: Math.random() * 80, y: Math.random() * 80 }))
      );
      setBoczek(b =>
        b.map(bb => ({ ...bb, x: Math.random() * 80, y: Math.random() * 80 }))
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // 8) WYGRANA – warunek końca gry
  // =========================================================

  useEffect(() => {
    if (klikniecia >= 1_000_000_000 && mieso >= 200_000) {
      alert("🏆 WYGRAŁEŚ GRĘ! Jesteś królem żubrów! 🦬👑");
    }
  }, [klikniecia, mieso]);

  // =========================================================
  // 9) RENDER – przekazujesz wszystko do GameView
  // =========================================================

  return (
    <div className={isZepsute ? "zepsute" : ""}>
      <GameView

        klikniecia={klikniecia}
        setKlikniecia={setKlikniecia}
        bonusKlik={bonusKlik}
        setBonusKlik={setBonusKlik}
        mieso={mieso}
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
