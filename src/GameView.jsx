import "./App.css";

const GameView = ({
  tytl,
  klikniecia,
  bonusKlik,
  mieso,
  zubry,
  boczek,
  koszt1,
  koszt3,
  koszt4,
  koszt5,
  koszt7,
  kosztBoczek,
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
  cena,
  zuberki,
  kupZubraGielda,
  sprzedajZubraGielda,
}) => {
  return (
    <div className="app-wrapper">
      {/* PANEL KLIKACZA */}
      <div className="panel klikacz">
        <h1>{tytl} 🦬</h1>

        <button className="big-btn main" onClick={dodajKlik}>
          Kliknij żubra!
        </button>

        <div className="stats">
          <div className="stat-line">Kliknięcia: <b>{klikniecia}</b></div>
          <div className="stat-line">Bonus: <b>{bonusKlik}</b></div>
          <div className="stat-line">Mięso: <b>{mieso}</b></div>
        </div>

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

      {/* PANEL GIEŁDY */}
      <div className="panel gielda">
        <h2>Giełda żubrów</h2>
        <p>Cena żubra: <b>{cena}</b></p>
        <p>Ilość żubrów: <b>{zuberki}</b></p>

        <button className="big-btn" onClick={kupZubraGielda}>
          Kup żubra
        </button>

        <button className="big-btn" onClick={sprzedajZubraGielda}>
          Sprzedaj żubra
        </button>
      </div>

      {/* ARENA */}
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
