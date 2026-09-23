import { useEffect, useState } from "react";
import { Link } from "react-router";
import { pobierzLocalStorage, ustawLocalStorage } from "../useLocalStorageState";

/* eslint-disable react-hooks/set-state-in-effect */

const Timer = ({
  wygrana,
  bonusKlik,
  setBonusKlik,
  uplynieteSekundy,
  setUplynieteSekundy,
}) => {


  const [wylosowanaMinuta] = useState(() =>
    pobierzLocalStorage("wylosowanaMinuta", () => Math.floor(Math.random() * 4))
  );
  const [komunikat, setKomunikat] = useState(() =>
    pobierzLocalStorage("komunikat", "")
  );

  const [pokazanoInfo, setPokazanoInfo] = useState(() =>
    pobierzLocalStorage("pokazanoInfo", false)
  );
  const [bonusAktywny, setBonusAktywny] = useState(() =>
    pobierzLocalStorage("bonusAktywny", false)
  );
  const [bonusZakonczony, setBonusZakonczony] = useState(() =>
    pobierzLocalStorage("bonusZakonczony", false)
  );
  const [dodanyBonus, setDodanyBonus] = useState(() =>
    pobierzLocalStorage("dodanyBonus", 0)
  );
  const [najlepszy] = useState(() =>
    pobierzLocalStorage("Najleprzy", null)
  );

  const minuty = Math.floor(uplynieteSekundy / 60);
  const sekundy = uplynieteSekundy % 60;
  const najlepszyTekst =
    najlepszy && typeof najlepszy === "object"
      ? `Najlepszy wynik: ${najlepszy.name} - ${najlepszy.czas_wygranej} s`
      : "Brak wynikow";

  useEffect(() => {
    ustawLocalStorage("wylosowanaMinuta", wylosowanaMinuta);
  }, [wylosowanaMinuta]);

  useEffect(() => {
    ustawLocalStorage("komunikat", komunikat);
  }, [komunikat]);

  useEffect(() => {
    ustawLocalStorage("pokazanoInfo", pokazanoInfo);
  }, [pokazanoInfo]);

  useEffect(() => {
    ustawLocalStorage("bonusAktywny", bonusAktywny);
  }, [bonusAktywny]);

  useEffect(() => {
    ustawLocalStorage("bonusZakonczony", bonusZakonczony);
  }, [bonusZakonczony]);

  useEffect(() => {
    ustawLocalStorage("dodanyBonus", dodanyBonus);
  }, [dodanyBonus]);

  useEffect(() => {
    if (wygrana) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setUplynieteSekundy((s) => s + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setUplynieteSekundy, wygrana]);

  useEffect(() => {
    if (!pokazanoInfo && minuty === wylosowanaMinuta && sekundy === 0) {
      setKomunikat(
        `grasz juz ${wylosowanaMinuta} minut, nie przestawaj. Jesli zagrasz jeszcze 3 minuty to klikniecia beda razy 4`
      );
      setPokazanoInfo(true);
    }

    if (pokazanoInfo && minuty === wylosowanaMinuta + 1 && sekundy === 30) {
      setKomunikat("");
    }

    if (!bonusZakonczony && !bonusAktywny && minuty === wylosowanaMinuta + 3 && sekundy === 0) {
      setKomunikat("brawo, klikniecia licza sie razy 4");
      const nowyBonus = bonusKlik * 4;
      setDodanyBonus(nowyBonus - bonusKlik);
      setBonusKlik(nowyBonus);
      setBonusAktywny(true);
    }

    if (bonusAktywny && minuty === wylosowanaMinuta + 3 && sekundy === 30) {
      setBonusKlik(Math.max(0, bonusKlik - dodanyBonus));   
      setBonusAktywny(false);
      setBonusZakonczony(true);
      setKomunikat("");
    }
  }, [
    bonusKlik,
    bonusAktywny,
    bonusZakonczony,
    dodanyBonus,
    minuty,
    pokazanoInfo,
    sekundy,
    setBonusKlik,
    setBonusAktywny,
    setBonusZakonczony,
    setDodanyBonus,
    setKomunikat,
    setPokazanoInfo,
    wylosowanaMinuta,
  ]);

  return (
    <div className="zawartosc-timera">
      <span>
        minuty {minuty}, sekundy {sekundy} {komunikat}
      </span>
      <Link to="/tablica-wynikow" className="link-tablicy-wynikow">
        Tablica wynikow
      </Link>
      <p>{najlepszyTekst}</p>
    </div>
  );
};

export default Timer;
