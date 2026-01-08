import { useEffect, useState } from "react";
import "./App.css";

let clicery = []; // Tablica przechowująca intervale auto-klikerów

function App() {
  // ===== STATE =====
  const [klikniecia, setKlikniecia] = useState(0);
  const [bonusKlik, setBonusKlik] = useState(0);
  const [mieso, setMieso] = useState(0);
  const [zubry, setZubry] = useState([]);
  const [boczek, setBoczek] = useState([]);
  const [tytl, setTytl] = useState("kliknij 🦬");
  const [czas, setCzas] = useState(0);
  const [clicey, setclicey] = useState([]);

  const [ulepszKlikertak, setUleprzklikertak] = useState("absolute");

  const [koszt1, setKoszt1] = useState(100);
  const [koszt3, setKoszt3] = useState(500);
  const [koszt4, setKoszt4] = useState(10000);
  const [koszt5, setKoszt5] = useState(50000);
  const [koszt7, setKoszt7] = useState(1000);
  const [kosztboczek, setKosztBoczek] = useState(300);

  const [poziomKlikera, setPoziomKlikera] = useState(1000);

  // ===== PODSTAWOWE KLIKANIE =====
  const dodajKlik = () => {
    setKlikniecia(k => k + 1 + bonusKlik);
  };

  // ===== ŻUBER =====
  const dodajZubra = () => {
    setZubry(z => [
      ...z,
      {
        id: Math.random(),
        x: Math.random() * 80,
        y: Math.random() * 80,
      },
    ]);
  };

  // ===== BOCZEK =====
  const dodajBoczek = () => {
    setBoczek(b => [
      ...b,
      {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
    ]);
  };

  // ===== ANIMACJE =====
  useEffect(() => {
    const timer = setInterval(() => {
      setBoczek(b =>
        b.map(bo => ({
          ...bo,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setZubry(z =>
        z.map(zu => ({
          ...zu,
          x: Math.random() * 80,
          y: Math.random() * 80,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ===== CZAS =====
  useEffect(() => {
    const timer = setInterval(() => {
      setCzas(c => c + 0.1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // ===== SKLEP =====
  const kupBonusKlik = () => {
    if (klikniecia >= koszt1) {
      setKlikniecia(k => k - koszt1);
      setBonusKlik(b => b + 1);
      setKoszt1(k => k + 100);
    }
  };

  const kupZubra = () => {
    if (klikniecia >= 150) {
      setKlikniecia(k => k - 150);
      dodajZubra();
    }
  };

  const klik300co5s = () => {
    if (klikniecia >= koszt3) {
      setKlikniecia(k => k - koszt3);
      setKoszt3(k => k + 50);
      setInterval(() => setKlikniecia(k => k + 300), 5000);
    }
  };

  const wykonajClicer = () => {
    const id = setInterval(() => {
      setKlikniecia(k => k + 1 + bonusKlik);
    }, poziomKlikera);
    clicery.push(id);
  };

  const autoKliker = () => {
    if (klikniecia >= koszt4) {
      setKlikniecia(k => k - koszt4);
      setKoszt4(k => k + 300);
      setclicey(c => [...c, "a"]);
      wykonajClicer();
    }
  };

  // ===== Ulepsz kliker z dynamicznym position =====
  const ulepszKliker = () => {
    if (klikniecia >= koszt7) {
      setKlikniecia(k => k - koszt7);
      setKoszt7(k => k + 1000);

      setPoziomKlikera(p => {
        if (p <= 50) {
          setUleprzklikertak("none"); // zmiana position przycisku po osiągnięciu limitu
          return p;
        }
        return p - 50;
      });

      // restart auto-klikerów
      clicery.forEach(id => clearInterval(id));
      clicery = [];
      clicey.forEach(() => wykonajClicer());
    }
  };

  const stoZubrow = () => {
    if (klikniecia >= koszt5) {
      setKlikniecia(k => k - koszt5);
      setKoszt5(k => k + 10000);
      setInterval(() => {
        for (let i = 0; i < 100; i++) dodajZubra();
      }, 60000);
    }
  };

  const usunZubry = () => {
    setMieso(m => m + zubry.length * 10);
    setZubry([]);
  };

  const usunBoczek = () => {
    setBonusKlik(b => b + boczek.length);
    setBoczek([]);
  };

  const zamienMieso = () => {
    setKlikniecia(k => k + mieso * 16);
    setMieso(0);
  };

  const kupBoczek = () => {
    if (mieso >= kosztboczek) {
      setMieso(m => m - kosztboczek);
      setKosztBoczek(k => k + 20);
      setBonusKlik(b => b + 2);
      dodajBoczek();
    }
  };

  // ===== RENDER =====
  return (
    <div className="app">
      {boczek.map(z => (
        <span
          key={z.id}
          style={{
            position: "absolute",
            left: `${z.x}%`,
            top: `${z.y}%`,
            fontSize: 30,
          }}
        >
          🥓
        </span>
      ))}

      <h1>{tytl}</h1>

      <button onClick={dodajKlik}>Kliknij!</button>
      <p>Kliknięcia: {klikniecia}</p>
      <p>Bonus: {bonusKlik}</p>

      <h2>Sklep</h2>
      <p>🥩 Mięso: {mieso}</p>

      <button onClick={kupBonusKlik}>+1 klik ({koszt1})</button>
      <button onClick={kupZubra}>Żubr (150)</button>
      <button onClick={klik300co5s}>+300 / 5s ({koszt3})</button>
      <button onClick={autoKliker}>Auto kliker ({koszt4})</button>

      {/* Tylko ten przycisk ma dynamiczne position */}
      <button
        style={{ position: ulepszKlikertak }}
        onClick={ulepszKliker}
      >
        Ulepsz kliker ({koszt7})
      </button>

      <button onClick={stoZubrow}>+100 żubrów / min</button>
      <button onClick={usunZubry}>Zamień żubry na mięso</button>
      <button onClick={zamienMieso}>Zamień mięso</button>
      <button onClick={kupBoczek}>Kup boczek</button>
      <button onClick={usunBoczek}>Usuń boczek</button>

      <div
        style={{
          position: "relative",
          margin: "20px auto",
          width: 400,
          height: 200,
          background: "white",
          overflow: "hidden",
        }}
      >
        {zubry.map(z => (
          <span
            key={z.id}
            style={{
              position: "absolute",
              left: `${z.x}%`,
              top: `${z.y}%`,
              fontSize: 30,
            }}
          >
            🦬
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;