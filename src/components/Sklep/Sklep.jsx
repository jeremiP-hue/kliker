import { useState } from "react";

const Sklep = ({
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
  const [koszta, setKoszta] = useState({
    koszt1bonuskilk: 100,
    koszt300klik: 500,
    kosztautokliker: 10000,
    kosztu100zubruwcomin: 50000,
    kosztuleprzkliker: 1000,
    kosztBoczek: 300,
  });

  const [poziomKlikera, setPoziomKlikera] = useState(1000);

  const addWithRandomPoz = (lista) => [
    ...lista,
    {
      id: Math.random(),
      x: Math.random() * 80,
      y: Math.random() * 80,
      krok_lewo: Math.random() * 2,
      krok_prawo: Math.random() * 2,
    },
  ];

  const dodajZubra = () => {
    setZubry((z) => addWithRandomPoz(z));
  };

  const dodajBoczek = () => {
    setBoczek((b) => addWithRandomPoz(b));
  };

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
    if (klikniecia >= 150) {
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

      setInterval(() => {
        setKlikniecia((k) => k + 300);
      }, 5000);
    }
  };

  const doajKliker = () => {
    setInterval(() => {
      setKlikniecia((k) => k + 1 + bonusKlik);
    }, poziomKlikera);
  };

  const autoKliker = () => {
    if (klikniecia >= koszta.kosztautokliker) {
      setKlikniecia((k) => k - koszta.kosztautokliker);
      setKoszta((k) => ({
        ...k,
        kosztautokliker: k.kosztautokliker + 300,
      }));
      doajKliker();
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
    if (klikniecia >= koszta.kosztu100zubruwcomin) {
      setKlikniecia((k) => k - koszta.kosztu100zubruwcomin);
      setKoszta((k) => ({
        ...k,
        kosztu100zubruwcomin: k.kosztu100zubruwcomin + 10000,
      }));

      setInterval(() => {
        for (let i = 0; i < 100; i++) {
          dodajZubra();
        }
      }, 60000);
    }
  };

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

        <button className="duzy-przycisk" onClick={kupZubraKlik}>
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

        <button className="duzy-przycisk" onClick={stoZubrow}>
          +100 żubrów / min
          <br />({koszta.kosztu100zubruwcomin})
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
