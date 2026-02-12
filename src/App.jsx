import { useState, useEffect } from "react";
import GameView from "./GameView";

const App = () => {
  // ===================== KLIKACZ =====================
  const [klikniecia, setKlikniecia] = useState(0);
  const [bonusKlik, setBonusKlik] = useState(0);
  const [mieso, setMieso] = useState(0);

  const [zubry, setZubry] = useState([]);
  const [boczek, setBoczek] = useState([]);

  const [tytl, setTytl] = useState("Kliknij 🦬");

  const [koszt1, setKoszt1] = useState(100);
  const [koszt3, setKoszt3] = useState(500);
  const [koszt4, setKoszt4] = useState(10000);
  const [koszt5, setKoszt5] = useState(50000);
  const [koszt7, setKoszt7] = useState(1000);
  const [kosztBoczek, setKosztBoczek] = useState(300);
  const [poziomKlikera, setPoziomKlikera] = useState(1000);
  const [stoZubrowAktywny, setStoZubrowAktywny] = useState(false);

  // ===================== GIEŁDA =====================
  const [cena, setCena] = useState(10);
  const [zuberki, setZuberki] = useState(0);

  // ===================== FUNKCJE =====================
  const dodajKlik = () => setKlikniecia(k => k + 1 + bonusKlik);

  const dodajZubra = () =>
    setZubry(z => [...z, { id: Math.random(), x: Math.random() * 80, y: Math.random() * 80 }]);
  const dodajBoczek = () =>
    setBoczek(b => [...b, { id: Math.random(), x: Math.random() * 80, y: Math.random() * 80 }]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        alert("nie czituj cziterze");
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "f") {
        setKlikniecia(100000)
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  const kupBonusKlik = () => {
    if (klikniecia >= koszt1) {
      setKlikniecia(k => k - koszt1);
      setBonusKlik(b => b + 1);
      setKoszt1(k => k + 100);
    }
  };

  const kupZubraKlik = () => {
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

  const autoKliker = () => {
    if (klikniecia >= koszt4) {
      setKlikniecia(k => k - koszt4);
      setKoszt4(k => k + 300);
      setInterval(() => setKlikniecia(k => k + 1 + bonusKlik), poziomKlikera);
    }
  };

  const ulepszKliker = () => {
    if (klikniecia >= koszt7 && poziomKlikera > 50) {
      setKlikniecia(k => k - koszt7);
      setKoszt7(k => k + 1000);
      setPoziomKlikera(p => p - 50);
    }
  };

  const stoZubrow = () => {
    if (klikniecia >= koszt5) {
      setKlikniecia(k => k - koszt5);
      setKoszt5(k => k + 10000);
      setInterval(() => {
        for (let i = 0; i < 100; i++) { dodajZubra(); }
      }, 60000);;
    }
  };

  const usunZubry = () => {
    setMieso(m => m + zubry.length * 10);
    setZubry([]);
  };
  const zamienMieso = () => {
    setKlikniecia(k => k + mieso * 16);
    setMieso(0);
  };
  const kupBoczek = () => {
    if (mieso >= kosztBoczek) {
      setMieso(m => m - kosztBoczek);
      setKosztBoczek(k => k + 20);
      setBonusKlik(b => b + 2);
      dodajBoczek();
    }
  };
  const usunBoczek = () => {
    setBonusKlik(b => b + boczek.length);
    setBoczek([]);
  };

  // ===================== GIEŁDA =====================
  const kupZubraGielda = () => {
    if (klikniecia >= cena) {
      setKlikniecia(k => k - cena);
      setZuberki(z => z + 1);
    } else alert("Za mało kliknięć na zakup żubra!");
  };

  const sprzedajZubraGielda = () => {
    if (zuberki > 0) {
      setZuberki(z => z - 1);
      setKlikniecia(k => k + cena);
    } else alert("Nie masz żubrów do sprzedaży!");
  };

  useEffect(() => {
    const timer = setInterval(() => setCena(c => Math.max(1, c + (Math.random() < 0.5 ? -1 : 1))), 200);
    return () => clearInterval(timer);
  }, []);

  // ===================== RUCH ŻUBRÓW I BOCZKÓW =====================
  useEffect(() => {
    const timer = setInterval(() => {
      setZubry(z =>
        z.map(zz => ({
          ...zz,
          x: Math.random() * 80,
          y: Math.random() * 80,
        }))
      );
      setBoczek(b =>
        b.map(bb => ({
          ...bb,
          x: Math.random() * 80,
          y: Math.random() * 80,
        }))
      );
    }, 2000); // co 2 sekundy losowa pozycja
    return () => clearInterval(timer);
  }, []);

  // ===================== WYGRANA =====================
  useEffect(() => {
    if (klikniecia >= 1_000_000_000 && mieso >= 200_000) {
      alert("🏆 WYGRAŁEŚ GRĘ! Jesteś królem żubrów! 🦬👑");
    }
  }, [klikniecia, mieso]);


  return (
    <GameView
      tytl={tytl}
      klikniecia={klikniecia}
      bonusKlik={bonusKlik}
      mieso={mieso}
      zubry={zubry}
      boczek={boczek}
      koszt1={koszt1}
      koszt3={koszt3}
      koszt4={koszt4}
      koszt5={koszt5}
      koszt7={koszt7}
      kosztBoczek={kosztBoczek}
      dodajKlik={dodajKlik}
      kupBonusKlik={kupBonusKlik}
      kupZubraKlik={kupZubraKlik}
      klik300co5s={klik300co5s}
      autoKliker={autoKliker}
      ulepszKliker={ulepszKliker}
      stoZubrow={stoZubrow}
      usunZubry={usunZubry}
      zamienMieso={zamienMieso}
      kupBoczek={kupBoczek}
      usunBoczek={usunBoczek}
      cena={cena}
      zuberki={zuberki}
      kupZubraGielda={kupZubraGielda}
      sprzedajZubraGielda={sprzedajZubraGielda}
    />
  );
};

export default App;
