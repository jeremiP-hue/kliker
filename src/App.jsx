import { useState, useEffect } from "react";
import GameView from "./GameView";

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

  // ---------- UI / TEKST ----------
  const [tytl, setTytl] = useState("Kliknij 🦬");      // tytuł / nagłówek gry

  // ---------- SKLEP: KOSZTY / ULEPSZENIA ----------
  const [koszt1, setKoszt1] = useState(100);           // koszt kupna bonusKlik +1
  const [koszt3, setKoszt3] = useState(500);           // koszt "300 co 5s"
  const [koszt4, setKoszt4] = useState(10000);         // koszt autoklikera
  const [koszt5, setKoszt5] = useState(50000);         // koszt "100 żubrów co minutę"
  const [koszt7, setKoszt7] = useState(1000);          // koszt ulepszenia szybkości autoklikera
  const [kosztBoczek, setKosztBoczek] = useState(300); // koszt boczku
  const [poziomKlikera, setPoziomKlikera] = useState(1000); // co ile ms działa autokliker (mniej = szybciej)

  // (wygląda na niewykorzystane – nie używasz tego nigdzie)
  const [stoZubrowAktywny, setStoZubrowAktywny] = useState(false);

  // ---------- GIEŁDA ----------
  const [cena, setCena] = useState(10);                // cena żubra na giełdzie (zmienia się co 200ms)
  const [zuberki, setZuberki] = useState(0);            // ile masz żubrów giełdowych

  // ---------- COIN ----------
  const [cena_coina, setCena_coina] = useState(10000); // cena coina (zmienia się co 300ms)
  const [iloscCinuw, setiloscCinuw] = useState(0);      // ile masz coinów

  // =========================================================
  // 2) FUNKCJE POMOCNICZE – dodawanie rzeczy / kliknięcie
  // =========================================================

  // klik = 1 + bonusKlik
  const dodajKlik = () => setKlikniecia(k => k + 1 + bonusKlik);

  // dodaje żubra do listy z losową pozycją
  const dodajZubra = () =>
    setZubry(z => [...z, { id: Math.random(), x: Math.random() * 80, y: Math.random() * 80 }]);

  // dodaje boczek do listy z losową pozycją
  const dodajBoczek = () =>
    setBoczek(b => [...b, { id: Math.random(), x: Math.random() * 80, y: Math.random() * 80 }]);

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

  // BONUS: +1 do bonusKlik, rośnie koszt
  const kupBonusKlik = () => {
    if (klikniecia >= koszt1) {
      setKlikniecia(k => k - koszt1);
      setBonusKlik(b => b + 1);
      setKoszt1(k => k + 100);
    }
  };

  // kup żubra za 150 kliknięć (po prostu dodaje żubra na ekran)
  const kupZubraKlik = () => {
    if (klikniecia >= 150) {
      setKlikniecia(k => k - 150);
      dodajZubra();
    }
  };

  // co 5s +300 kliknięć (UWAGA: setInterval się nigdy nie czyści)
  const klik300co5s = () => {
    if (klikniecia >= koszt3) {
      setKlikniecia(k => k - koszt3);
      setKoszt3(k => k + 50);
      setInterval(() => setKlikniecia(k => k + 300), 5000);
    }
  };

  // autokliker: co "poziomKlikera" ms dodaje 1 + bonusKlik (UWAGA: setInterval też się nigdy nie czyści)
  const autoKliker = () => {
    if (klikniecia >= koszt4) {
      setKlikniecia(k => k - koszt4);
      setKoszt4(k => k + 300);
      setInterval(() => setKlikniecia(k => k + 1 + bonusKlik), poziomKlikera);
    }
  };

  // ulepszenie autoklikera: zmniejsza ms o 50 (czyli szybciej), do minimum 50
  const ulepszKliker = () => {
    if (klikniecia >= koszt7 && poziomKlikera > 50) {
      setKlikniecia(k => k - koszt7);
      setKoszt7(k => k + 1000);
      setPoziomKlikera(p => p - 50);
    }
  };

  // co minutę dodaje 100 żubrów (UWAGA: też interval bez czyszczenia)
  const stoZubrow = () => {
    if (klikniecia >= koszt5) {
      setKlikniecia(k => k - koszt5);
      setKoszt5(k => k + 10000);
      setInterval(() => {
        for (let i = 0; i < 100; i++) dodajZubra();
      }, 60000);
    }
  };

  // usuwa wszystkie żubry, daje mięso: 10 za sztukę
  const usunZubry = () => {
    setMieso(m => m + zubry.length * 10);
    setZubry([]);
  };

  // zamienia mięso na kliknięcia: 1 mięso = 16 kliknięć
  const zamienMieso = () => {
    setKlikniecia(k => k + mieso * 16);
    setMieso(0);
  };

  // kup boczek za mięso: -kosztBoczek mięsa, +2 bonusKlik, koszt rośnie, dodaje obiekt boczku
  const kupBoczek = () => {
    if (mieso >= kosztBoczek) {
      setMieso(m => m - kosztBoczek);
      setKosztBoczek(k => k + 20);
      setBonusKlik(b => b + 2);
      dodajBoczek();
    }
  };

  // usuwa boczki i dodatkowo daje bonusKlik = + liczba boczków
  const usunBoczek = () => {
    setBonusKlik(b => b + boczek.length);
    setBoczek([]);
  };

  // =========================================================
  // 5) GIEŁDA – kupno/sprzedaż żubrów po zmiennej cenie
  // =========================================================

  const kupZubraGielda = () => {
    if (klikniecia >= cena) {
      setKlikniecia(k => k - cena);
      setZuberki(z => z + 1);
    } else {
      alert("Za mało kliknięć na zakup żubra!");
    }
  };

  const sprzedajZubraGielda = () => {
    if (zuberki > 0) {
      setZuberki(z => z - 1);
      setKlikniecia(k => k + cena);
    } else {
      alert("Nie masz żubrów do sprzedaży!");
    }
  };

  // cena żubra zmienia się co 200ms o ±1, min 1
  useEffect(() => {
    const timer = setInterval(() => {
      setCena(c => Math.max(1, c + (Math.random() < 0.5 ? -1 : 1)));
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // 6) COINY – kupno/sprzedaż (tu masz błąd w kupowaniu)
  // =========================================================

  // UWAGA: tu masz literówkę-logiczny błąd:
  // robisz setKlikniecia(k => k + cena_coina) – czyli DODAJESZ zamiast ODJĄĆ przy zakupie.
  const kupcoina = () => {
    if (klikniecia >= cena_coina) {
      setKlikniecia(k => k + cena_coina); // <-- powinno być: k - cena_coina
      setiloscCinuw(z => z + 1);
    } else {
      alert("lie masz mamony🪙🪙🪙🦬🦬🦬");
    }
  };

  const sprzedajCoina = () => {
    if (iloscCinuw > 0) {
      setiloscCinuw(c => c - 1);
      setKlikniecia(k => k + cena_coina);
    } else {
      alert("nie masz coinów🪙🪙🪙🪙🪙🪙🪙");
    }
  };

  // cena coina zmienia się co 300ms o mieszankę ±400 ±40 ±4
  useEffect(() => {
    const timer = setInterval(() => {
      const wynik = Math.random() > 0.5 ? -400 : 400;
      const wynik2 = Math.random() > 0.5 ? -40 : 40;
      const wynik3 = Math.random() < 0.5 ? -4 : 4;

      setCena_coina(c => c + wynik + wynik2 + wynik3);
      if (cena_coina < 1) {
        setCena_coina(200);
      }
    }, 300);

    return () => clearInterval(timer);
  }, []);

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
      cena_coina={cena_coina}
      iloscCinuw={iloscCinuw}
      kupcoina={kupcoina}
      sprzedajCoina={sprzedajCoina}
    />
  );
};

export default App;
