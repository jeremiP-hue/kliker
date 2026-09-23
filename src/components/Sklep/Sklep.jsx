import { useCallback, useEffect, useState } from "react";
import {
  pobierzLocalStorage,
  ustawLocalStorage,
} from "../../useLocalStorageState";

const Sklep = ({
  wygrana,
  klikniecia,
  setKlikniecia,
  bonusKlik,
  setBonusKlik,
  zubry,
  setZubry,
  boczek,
  setBoczek,
  aktywna,
  setSkrzynieAktywne,
  mieso,
  setMieso,
  setKlikery,
}) => {
  const [koszta, setKoszta] = useState(() =>
    pobierzLocalStorage("koszta", {
      koszt1bonuskilk: 100,
      koszt300klik: 500,
      kosztautokliker: 10000,
      kosztu100zubruwcomin: 50000,
      kosztuleprzkliker: 1000,
      kosztBoczek: 300,
    })
  );
  const [poziomKlikera, setPoziomKlikera] = useState(() =>
    pobierzLocalStorage("poziomKlikera", 1000)
  );
  const [klik300Liczniki, setKlik300Liczniki] = useState(() =>
    pobierzLocalStorage("klik300Liczniki", 0)
  );
  const [autoKlikery, setAutoKlikery] = useState(() =>
    pobierzLocalStorage("autoKlikery", 0)
  );
  const [stoZubrowLiczniki, setStoZubrowLiczniki] = useState(() =>
    pobierzLocalStorage("stoZubrowLiczniki", 0)
  );

  const addWithRandomPoz = useCallback((lista) => [
    ...lista,
    {
      id: Math.random(),
      x: Math.random() * 80,
      y: Math.random() * 80,
      krok_lewo: Math.random() * 2,
      krok_prawo: Math.random() * 2,
    },
  ], []);

  const dodajZubra = () => {
    if (wygrana) {
      return;
    }

    setZubry((z) => addWithRandomPoz(z));
  };

  const dodajWieleZubrow = useCallback((liczba) => {
    setZubry((aktualne) => {
      let nowe = aktualne;

      for (let i = 0; i < liczba; i++) {
        nowe = addWithRandomPoz(nowe);
      }

      return nowe;
    });
  }, [addWithRandomPoz, setZubry]);

  const dodajBoczek = () => {
    setBoczek((b) => addWithRandomPoz(b));
  };

  useEffect(() => {
    ustawLocalStorage("koszta", koszta);
  }, [koszta]);

  useEffect(() => {
    ustawLocalStorage("poziomKlikera", poziomKlikera);
  }, [poziomKlikera]);

  useEffect(() => {
    ustawLocalStorage("klik300Liczniki", klik300Liczniki);
  }, [klik300Liczniki]);

  useEffect(() => {
    ustawLocalStorage("autoKlikery", autoKlikery);
  }, [autoKlikery]);

  useEffect(() => {
    ustawLocalStorage("stoZubrowLiczniki", stoZubrowLiczniki);
  }, [stoZubrowLiczniki]);

  const kupBonusKlik = () => {
    if (klikniecia >= koszta.koszt1bonuskilk) {
      setKlikniecia((k) => k - koszta.koszt1bonuskilk);
      setBonusKlik((b) => b + 1);
      setKoszta((k) => ({
        ...k,
        koszt1bonuskilk: k.koszt1bonuskilk + 100,
      }));
    }
  };

  const kupZubraKlik = () => {
    if (!wygrana && klikniecia >= 150) {
      setKlikniecia((k) => k - 150);
      dodajZubra();
    }
  };

  const klik300co5s = () => {
    if (klikniecia >= koszta.koszt300klik) {
      setKlikniecia((k) => k - koszta.koszt300klik);
      setKoszta((k) => ({
        ...k,
        koszt300klik: k.koszt300klik + 50,
      }));
      setKlik300Liczniki((liczba) => liczba + 1);
    }
  };

  const autoKliker = () => {
    if (klikniecia >= koszta.kosztautokliker) {
      setKlikniecia((k) => k - koszta.kosztautokliker);
      setKoszta((k) => ({
        ...k,
        kosztautokliker: k.kosztautokliker + 300,
      }));
      setAutoKlikery((liczba) => liczba + 1);
      setKlikery((k) => k + 1);
    }
  };

  const ulepszKliker = () => {
    if (klikniecia >= koszta.kosztuleprzkliker && poziomKlikera > 50) {
      setKlikniecia((k) => k - koszta.kosztuleprzkliker);
      setKoszta((k) => ({
        ...k,
        kosztuleprzkliker: k.kosztuleprzkliker + 1000,
      }));
      setPoziomKlikera((p) => p - 50);
    }
  };

  const stoZubrow = () => {
    if ( klikniecia >= koszta.kosztu100zubruwcomin) {
      setKlikniecia((k) => k - koszta.kosztu100zubruwcomin);
      setKoszta((k) => ({
        ...k,
        kosztu100zubruwcomin: k.kosztu100zubruwcomin + 10000,
      }));
      setStoZubrowLiczniki((liczba) => liczba + 1);
      dodajWieleZubrow(100);
    }
  };

  useEffect(() => {
    if (klik300Liczniki <= 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setKlikniecia((k) => k + 300 * klik300Liczniki);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [klik300Liczniki, setKlikniecia]);

  useEffect(() => {
    if (autoKlikery <= 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setKlikniecia((k) => k + (1 + bonusKlik) * autoKlikery);
    }, poziomKlikera);

    return () => clearInterval(intervalId);
  }, [autoKlikery, bonusKlik, poziomKlikera, setKlikniecia]);

  useEffect(() => {
    if (stoZubrowLiczniki <= 0 || wygrana) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      dodajWieleZubrow(100 * stoZubrowLiczniki);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dodajWieleZubrow, stoZubrowLiczniki, wygrana]);

  const usunZubry = () => {
    setMieso((m) => m + zubry.length * 10);
    setZubry([]);
  };

  const zamienMieso = () => {
    setKlikniecia((k) => k + mieso * 16);
    setMieso(0);
  };

  const kupBoczek = () => {
    if (mieso >= koszta.kosztBoczek) {
      setMieso((m) => m - koszta.kosztBoczek);
      setKoszta((k) => ({
        ...k,
        kosztBoczek: k.kosztBoczek + 20,
      }));
      setBonusKlik((b) => b + 2);
      dodajBoczek();
    }
  };

  const usunBoczek = () => {
    setBonusKlik((b) => b + boczek.length);
    setBoczek([]);
  };

  const aktywujskrzynie = () => {
    if (klikniecia >= 30000 && !aktywna) {
      setSkrzynieAktywne(true);
      setKlikniecia((k) => k - 30000);
    }
  };

  return (
    <>
      <h2>Sklep</h2>

      <div className="siatka-sklepu">
        <button className="duzy-przycisk" onClick={kupBonusKlik}>
          +1 do klikania
          <br />({koszta.koszt1bonuskilk})
        </button>

        <button className="duzy-przycisk" onClick={kupZubraKlik} disabled={wygrana}>
          Dodaj żubra
          <br />(150)
        </button>

        <button className="duzy-przycisk" onClick={klik300co5s}>
          +300 / 5s
          <br />({koszta.koszt300klik})
        </button>

        <button className="duzy-przycisk" onClick={autoKliker}>
          Auto-kliker
          <br />({koszta.kosztautokliker})
        </button>

        <button className="duzy-przycisk" onClick={ulepszKliker}>
          Ulepsz kliker
          <br />({koszta.kosztuleprzkliker})
        </button>

        <button className="duzy-przycisk" onClick={stoZubrow} disabled={wygrana}>
          +100 żubrów / min
          <br />({koszta.kosztu100zubruwcomin}) x{stoZubrowLiczniki}
        </button>

        <button className="duzy-przycisk" onClick={usunZubry}>
          Żubry → mięso
        </button>

        <button className="duzy-przycisk" onClick={zamienMieso}>
          Mięso → kliknięcia
        </button>

        <button className="duzy-przycisk" onClick={kupBoczek}>
          Kup boczek
          <br />({koszta.kosztBoczek})
        </button>

        <button className="duzy-przycisk" onClick={usunBoczek}>
          Usuń boczek
        </button>

        <button className="duzy-przycisk" onClick={aktywujskrzynie}>
          Kup skrzynię (30000)
        </button>
      </div>
    </>
  );
};

export default Sklep;
