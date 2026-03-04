import { useState,useEffect } from "react";
const Gielda = ({klikniecia , setKlikniecia}) => {


    // =========================================================
    // 5) GIEĹDA â€“ kupno/sprzedaĹĽ ĹĽubrĂłw po zmiennej cenie
    // =========================================================
    const [cena, setCena] = useState(10);                // cena ĹĽubra na gieĹ‚dzie (zmienia siÄ™ co 200ms)
    const [zuberki, setZuberki] = useState(0);
    // ---------- COIN ----------
    const [cena_coina, setCena_coina] = useState(10000); // cena coina (zmienia siÄ™ co 300ms)
    const [iloscCoinow, setIloscCoinow] = useState(0);

    const kupZubraGielda = () => {
        if (klikniecia >= cena) {
            setKlikniecia(k => k - cena);
            setZuberki(z => z + 1);
        } else {
            alert("jesteś bidy nie masz hajsu");
        }
    };

    const sprzedajZubraGielda = () => {
        if (zuberki > 0) {
            setZuberki(z => z - 1);
            setKlikniecia(k => k + cena);
        } else {
            alert("jesteś bidy nie masz hajsu");
        }
    };

    // cena ĹĽubra zmienia siÄ™ co 200ms o Â±1, min 1
    useEffect(() => {
        const timer = setInterval(() => {
            setCena(c => Math.max(1, c + (Math.random() < 0.5 ? -1 : 1)));
        }, 200);

        return () => clearInterval(timer);
    }, []);

    // =========================================================
    // 6) COINY â€“ kupno/sprzedaĹĽ (tu masz bĹ‚Ä…d w kupowaniu)
    // =========================================================

    // UWAGA: tu masz literĂłwkÄ™-logiczny bĹ‚Ä…d:
    // robisz setKlikniecia(k => k + cena_coina) â€“ czyli DODAJESZ zamiast ODJÄ„Ä† przy zakupie.
    const kupCoina = () => {
        if (klikniecia >= cena_coina) {
            setKlikniecia(k => k - cena_coina); 
            setIloscCoinow(z => z + 1);
        } else {
            alert("lie masz mamonyđźŞ™đźŞ™đźŞ™đź¦¬đź¦¬đź¦¬");
        }
    };

    const sprzedajCoina = () => {
        if (iloscCoinow > 0) {
            setIloscCoinow(c => c - 1);
            setKlikniecia(k => k + cena_coina);
        } else {
            alert("nie masz coinĂłwđźŞ™đźŞ™đźŞ™đźŞ™đźŞ™đźŞ™đźŞ™");
        }
    };

    // cena coina zmienia siÄ™ co 300ms o mieszankÄ™ Â±400 Â±40 Â±4
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


    return (
        <div className="panel" >
            <h2>Giełda żuberkowa</h2>
            <p>Cena żubra: <b>{cena}</b></p>
            <p>Iilość  żubró: <b>{zuberki}</b></p>

            <button className="big-btn" onClick={kupZubraGielda}>
                Kup żubra
            </button>

            <button className="big-btn" onClick={sprzedajZubraGielda}>
                Sprzedaj żubra
            </button>

            <h2>Żuber Cooiny</h2>
            <p>cena coina: {cena_coina}</p>
            <p>ilosc coinów: {iloscCoinow}</p>

            <button className="big-btn" onClick={kupCoina}>kup coina</button>
            <button className="big-btn" onClick={sprzedajCoina}>sprzedaj coina</button>
        </div >
    )
}
export default Gielda

