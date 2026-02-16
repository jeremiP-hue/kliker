import "./App.css";

const GameView = ({
  // ----------- DANE (wartości do wyświetlenia) -----------
  tytl,
  klikniecia,
  bonusKlik,
  mieso,
  zubry,
  boczek,

  // ----------- DANE (koszty) -----------
  koszt1,
  koszt3,
  koszt4,
  koszt5,
  koszt7,
  kosztBoczek,

  // ----------- AKCJE (funkcje z App.js) -----------
  dodajKlik,
  kupBonusKlik,
  kupZubraKlik,
  klik300co5s,
  autoKliker,
  ulepszKliker,
  stoZubrow,
  usunZubry,
  zamienMieso,
  kupBoczek,
  usunBoczek,

  // ----------- GIEŁDA -----------
  cena,
  zuberki,
  kupZubraGielda,
  sprzedajZubraGielda,

  // ----------- COIN -----------
  cena_coina,
  iloscCinuw,
  kupcoina,
  sprzedajCoina
}) => {
  return (
    <div className="app-wrapper">

      {/* 1) PANEL KLIKACZA = główny panel gry */}
      <div className="panel klikacz">
        <h1>{tytl} 🦬</h1>

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
        <h2>Sklep</h2>
        <div className="shop-grid">
          <button className="big-btn" onClick={kupBonusKlik}>
            +1 do klikania<br />({koszt1})
          </button>

          <button className="big-btn" onClick={kupZubraKlik}>
            Dodaj żubra<br />(150)
          </button>

          <button className="big-btn" onClick={klik300co5s}>
            +300 / 5s<br />({koszt3})
          </button>

          <button className="big-btn" onClick={autoKliker}>
            Auto-kliker<br />({koszt4})
          </button>

          <button className="big-btn" onClick={ulepszKliker}>
            Ulepsz kliker<br />({koszt7})
          </button>

          <button className="big-btn" onClick={stoZubrow}>
            +100 żubrów/min<br />({koszt5})
          </button>

          <button className="big-btn" onClick={usunZubry}>
            Żubry → mięso
          </button>

          <button className="big-btn" onClick={zamienMieso}>
            Mięso → kliknięcia
          </button>

          <button className="big-btn" onClick={kupBoczek}>
            Kup boczek<br />({kosztBoczek})
          </button>

          <button className="big-btn" onClick={usunBoczek}>
            Usuń boczek
          </button>
        </div>
      </div>

      {/* 2) PANEL GIEŁDY = handel */}
      <div className="panel">
        <h2>Giełda żubrów</h2>
        <p>Cena żubra: <b>{cena}</b></p>
        <p>Ilość żubrów: <b>{zuberki}</b></p>

        <button className="big-btn" onClick={kupZubraGielda}>
          Kup żubra
        </button>

        <button className="big-btn" onClick={sprzedajZubraGielda}>
          Sprzedaj żubra
        </button>

        <h2>Zuber Cooiny</h2>
        <p>cena coina: {cena_coina}</p>
        <p>ilosc coinów: {iloscCinuw}</p>

        <button className="big-btn" onClick={kupcoina}>kup coina</button>
        <button className="big-btn" onClick={sprzedajCoina}>sprzedaj coina</button>
      </div>

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
