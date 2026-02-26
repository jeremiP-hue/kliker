import { useState } from "react";
const Sklep = ({klikniecia , setKlikniecia, setBonusKlik, setZubry, setBoczek}) => {
    // ---------- SKLEP: KOSZTY / ULEPSZENIA ----------
    const [koszt1, setKoszt1] = useState(100);           // koszt kupna bonusKlik +1
    const [koszt3, setKoszt3] = useState(500);           // koszt "300 co 5s"
    const [koszt4, setKoszt4] = useState(10000);         // koszt autoklikera
    const [koszt5, setKoszt5] = useState(50000);         // koszt "100 żubrów co minutę"
    const [koszt7, setKoszt7] = useState(1000);          // koszt ulepszenia szybkości autoklikera
    const [kosztBoczek, setKosztBoczek] = useState(300); // koszt boczku
    const [poziomKlikera, setPoziomKlikera] = useState(1000); // co ile ms 

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
            dojajkliker()
            setKlikery(k => k + 1)
        }
    };

    const dojajkliker = () => {
        const autoKiker = setInterval(() => setKlikniecia(k => k + 1 + bonusKlik), poziomKlikera);
    }

    // ulepszenie autoklikera: zmniejsza ms o 50 (czyli szybciej), do minimum 50
    const ulepszKliker = () => {
        if (klikniecia >= koszt7 && poziomKlikera > 50) {
            setKlikniecia(k => k - koszt7);
            setKoszt7(k => k + 1000);
            setPoziomKlikera(p => p - 50);
            for (let i = 0; i < klkery; i++) {
                clearInterval(autoKiker)
            }

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


    const addWithRandomPoz = z => [...z, { id: Math.random(), x: Math.random() * 80, y: Math.random() * 80 }]

    // dodaje żubra do listy z losową pozycją
    const dodajZubra = () => setZubry(addWithRandomPoz);

    // dodaje boczek do listy z losową pozycją
    const dodajBoczek = () => setBoczek(addWithRandomPoz);

    return (
        <>
            <h2>Sklep</h2>
            <div className="shop-grid">
                <button className="big-btn" onClick={kupBonusKlik}>
                    +1 do klikania<br />({koszt1})
                </button>

                <button className="big-btn" onClick={kupZubraKlik}>
                    Dodaj żubra<br />(150)
                </button>

                <button className="big-btn" onClick={klik300co5s}>
                    +300 / 5s<br />({koszt3})
                </button>

                <button className="big-btn" onClick={autoKliker}>
                    Auto-kliker<br />({koszt4})
                </button>

                <button className="big-btn" onClick={ulepszKliker}>
                    Ulepsz kliker<br />({koszt7})
                </button>

                <button className="big-btn" onClick={stoZubrow}>
                    +100 żubrów/min<br />({koszt5})
                </button>

                <button className="big-btn" onClick={usunZubry}>
                    Żubry → mięso
                </button>

                <button className="big-btn" onClick={zamienMieso}>
                    Mięso → kliknięcia
                </button>

                <button className="big-btn" onClick={kupBoczek}>
                    Kup boczek<br />({kosztBoczek})
                </button>

                <button className="big-btn" onClick={usunBoczek}>
                    Usuń boczek
                </button>
            </div>
        </>
    )
}
export default Sklep