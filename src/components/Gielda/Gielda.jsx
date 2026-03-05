import { useState, useEffect } from "react";

const Gielda = ({ klikniecia, setKlikniecia }) => {
  // =========================================================
  // 5) GIEŁDA - kupno/sprzedaż żubrów po zmiennej cenie
  // =========================================================
  const [cena, setCena] = useState(10); // cena żubra na giełdzie (zmienia się co 200ms)
  const [zuberki, setZuberki] = useState(0);

  // ---------- COIN ----------
  const [cena_coina, setCena_coina] = useState(10000); // cena coina (zmienia się co 300ms)
  const [iloscCoinow, setIloscCoinow] = useState(0);

  const kupZubraGielda = () => {
    if (klikniecia >= cena) {
      setKlikniecia((k) => k - cena);
      setZuberki((z) => z + 1);
    } else {
      alert("Jesteś biedny, nie masz hajsu.");
    }
  };

  const sprzedajZubraGielda = () => {
    if (zuberki > 0) {
      setZuberki((z) => z - 1);
      setKlikniecia((k) => k + cena);
    } else {
      alert("Nie masz żubrów do sprzedaży.");
    }
  };

  // cena żubra zmienia się co 200ms o ±1, minimum 1
  useEffect(() => {
    const timer = setInterval(() => {
      setCena((c) => Math.max(1, c + (Math.random() < 0.5 ? -1 : 1)));
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // 6) COINY - kupno/sprzedaż
  // =========================================================
  const kupCoina = () => {
    if (klikniecia >= cena_coina) {
      setKlikniecia((k) => k - cena_coina);
      setIloscCoinow((z) => z + 1);
    } else {
      alert("Nie masz mamony 🪙🪙🪙");
    }
  };

  const sprzedajCoina = () => {
    if (iloscCoinow > 0) {
      setIloscCoinow((c) => c - 1);
      setKlikniecia((k) => k + cena_coina);
    } else {
      alert("Nie masz coinów 🪙");
    }
  };

  // cena coina zmienia się co 300ms o mieszankę ±400 ±40 ±4
  useEffect(() => {
    const timer = setInterval(() => {
      const wynik = Math.random() > 0.5 ? -400 : 400;
      const wynik2 = Math.random() > 0.5 ? -40 : 40;
      const wynik3 = Math.random() < 0.5 ? -4 : 4;

      setCena_coina((c) => {
        const nowaCena = c + wynik + wynik2 + wynik3;
        return nowaCena < 1 ? 200 : nowaCena;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="panel-gry">
      <h2>Giełda żuberkowa</h2>
      <p>
        Cena żubra: <b>{cena}</b>
      </p>
      <p>
        Ilość żubrów: <b>{zuberki}</b>
      </p>

      <button className="duzy-przycisk" onClick={kupZubraGielda}>
        Kup żubra
      </button>

      <button className="duzy-przycisk" onClick={sprzedajZubraGielda}>
        Sprzedaj żubra
      </button>

      <h2>Żuber Coiny</h2>
      <p>Cena coina: {cena_coina}</p>
      <p>Ilość coinów: {iloscCoinow}</p>

      <button className="duzy-przycisk" onClick={kupCoina}>
        Kup coina
      </button>
      <button className="duzy-przycisk" onClick={sprzedajCoina}>
        Sprzedaj coina
      </button>
    </div>
  );
};

export default Gielda;
