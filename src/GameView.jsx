import "./App.css";
import Gielda from "./components/Gielda/Gielda";
import Sklep from "./components/Sklep/Sklep";

const GameView = ({
  // ----------- DANE (wartości do wyświetlenia) -----------
  klikniecia,
  setKlikniecia,
  bonusKlik,
  setBonusKlik,
  mieso,
  zubry,
  setZubry,
  boczek,
setBoczek,
  // ----------- DANE (koszty) -----------
  // ----------- AKCJE (funkcje z App.js) -----------
  dodajKlik,


  zepsujwszystko,

}) => {
  return (
    <div className="app-wrapper">

      {/* 1) PANEL KLIKACZA = główny panel gry */}
      <div className="panel klikacz">
        <h1>Kliknij 🦬 <span onClick={zepsujwszystko}>🦬</span></h1>
        {/* Kliknięcie = woła funkcję z App.js */}
        <button className="big-btn main" onClick={dodajKlik}>
          Kliknij żubra!
        </button>

        {/* Statystyki = tylko wyświetlanie */}
        <div className="stats">
          <div className="stat-line">Kliknięcia: <b>{klikniecia}</b></div>
          <div className="stat-line">Bonus: <b>{bonusKlik}</b></div>
          <div className="stat-line">Mięso: <b>{mieso}</b></div>
        </div>

        {/* Sklep = przyciski które wywołują akcje */}
        <Sklep
          klikniecia={klikniecia}
          setKlikniecia={setKlikniecia}
          setBonusKlik={setBonusKlik}
        setZubry={setZubry}
        setBoczek={setBoczek}
        />
      </div>


      <Gielda
        klikniecia={klikniecia}
        setKlikniecia={setKlikniecia}
      />




      {/* 3) ARENA = miejsce gdzie latają emoji */}
      <div className="arena">
        {zubry.map((z) => (
          <span
            key={z.id}
            className="zubr"
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
          >
            🦬
          </span>
        ))}

        {boczek.map((b) => (
          <span
            key={b.id}
            className="boczek"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            🥓
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameView;
