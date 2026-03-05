import { useState } from "react";
import "./App.css";
import Gielda from "./components/Gielda/Gielda";
import Sklep from "./components/Sklep/Sklep";
import Skrzynie from "./components/skrzynie";
import Timer from "./components/timer";

const GameView = ({
  // ----------- DANE (wartości do wyświetlenia) -----------
  klikniecia,
  setKlikniecia,
  bonusKlik,
  setBonusKlik,
  mieso,
  setMieso,
  zubry,
  setZubry,
  boczek,
  setBoczek,
  // ----------- DANE (koszty) -----------
  // ----------- AKCJE (funkcje z App.js) -----------
  dodajKlik,
  zepsujwszystko,
}) => {
  const [skrzynieaktywne, setSkrzynieAktywne] = useState(false);
  const [_klikery, setKlikery] = useState(0);

  return (
    <div className="uklad-gry">
      <Skrzynie
        skrzynieaktywne={skrzynieaktywne}
        setKlikniecia={setKlikniecia}
      />

      {/* 1) PANEL KLIKACZA = główny panel gry */}
      <div className="panel-gry panel-klikania">
        <h1>
          Kliknij 🦬🦬 <span onClick={zepsujwszystko}>🦬</span>
        </h1>

        {/* Kliknięcie = woła funkcję z App.js */}
        <button className="duzy-przycisk przycisk-glowny" onClick={dodajKlik}>
          Kliknij żubra!
        </button>

        {/* Statystyki = tylko wyświetlanie */}
        <div className="panel-statystyk">
          <div className="wiersz-statystyki">
            Kliknięcia: <b>{klikniecia}</b>
          </div>
          <div className="wiersz-statystyki">
            Bonus: <b>{bonusKlik}</b>
          </div>
          <div className="wiersz-statystyki">
            Mięso: <b>{mieso}</b>
          </div>
        </div>

        {/* Sklep = przyciski, które wywołują akcje */}
        <Sklep
          klikniecia={klikniecia}
          setKlikniecia={setKlikniecia}
          bonusKlik={bonusKlik}
          setBonusKlik={setBonusKlik}
          zubry={zubry}
          setZubry={setZubry}
          boczek={boczek}
          setBoczek={setBoczek}
          mieso={mieso}
          setMieso={setMieso}
          setKlikery={setKlikery}
          setSkrzynieAktywne={setSkrzynieAktywne}
        />
      </div>

      <Gielda klikniecia={klikniecia} setKlikniecia={setKlikniecia} />

      {/* 3) ARENA = miejsce, gdzie latają emoji */}
      <div className="sekcja-areny">
        <div className="arena-glowna">
          {zubry.map((z) => (
            <span
              key={z.id}
              className="ikona-zubra"
              style={{ left: `${z.x}%`, top: `${z.y}%` }}
            >
              🦬
            </span>
          ))}
        </div>

        <div className="panel-timera">
          <Timer />
        </div>
      </div>

      {boczek.map((b) => (
        <span
          key={b.id}
          className="ikona-boczku"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        >
          🥓
        </span>
      ))}
    </div>
  );
};

export default GameView;
