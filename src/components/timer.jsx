import { useEffect, useState } from "react";

const Timer = ({ bonusKlik, setBonusKlik }) => {
  const [uplynieteSekundy, setUplynieteSekundy] = useState(0);
  const [wylosowanaMinuta] = useState(() => Math.floor(Math.random() * 4));
  const [komunikat, setKomunikat] = useState("");

  const [pokazanoInfo, setPokazanoInfo] = useState(false);
  const [bonusAktywny, setBonusAktywny] = useState(false);
  const [bonusZakonczony, setBonusZakonczony] = useState(false);
  const [dodanyBonus, setDodanyBonus] = useState(0);

  const minuty = Math.floor(uplynieteSekundy / 60);
  const sekundy = uplynieteSekundy % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUplynieteSekundy((s) => s + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
    wylosowanaMinuta,
  ]);

  return (
    <div>
      minuty {minuty}, sekundy {sekundy} {komunikat}
    </div>
  );
};

export default Timer;
