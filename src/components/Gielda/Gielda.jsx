import { useState,useEffect } from "react";
const Gielda = ({klikniecia , setKlikniecia}) => {


    // =========================================================
    // 5) GIEŁDA – kupno/sprzedaż żubrów po zmiennej cenie
    // =========================================================
    const [cena, setCena] = useState(10);                // cena żubra na giełdzie (zmienia się co 200ms)
    const [zuberki, setZuberki] = useState(0);
    // ---------- COIN ----------
    const [cena_coina, setCena_coina] = useState(10000); // cena coina (zmienia się co 300ms)
    const [iloscCinuw, setiloscCinuw] = useState(0);

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
            setKlikniecia(k => k - cena_coina); 
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


    return (
        <div className="panel" >
            <h2>Giełda żubrów</h2>
            <p>Cena żubra: <b>{cena}</b></p>
            <p>Ilość żubrów: <b>{zuberki}</b></p>

            <button className="big-btn" onClick={kupZubraGielda}>
                Kup żubra
            </button>

            <button className="big-btn" onClick={sprzedajZubraGielda}>
                Sprzedaj żubra
            </button>

            <h2>Zuber Cooiny</h2>
            <p>cena coina: {cena_coina}</p>
            <p>ilosc coinów: {iloscCinuw}</p>

            <button className="big-btn" onClick={kupcoina}>kup coina</button>
            <button className="big-btn" onClick={sprzedajCoina}>sprzedaj coina</button>
        </div >
    )
}
export default Gielda