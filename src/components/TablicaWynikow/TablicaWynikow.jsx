import axios from "axios";
import { useEffect, useState } from "react";
import { ustawLocalStorage } from "../../useLocalStorageState";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const TablicaWynikow = () => {
  const [tablica, setTablica] = useState([]);
  const [status, setStatus] = useState("Ladowanie wynikow...");

  const ustawWyniki = (wyniki) => {
    const poprawioneWyniki = Array.isArray(wyniki)
      ? wyniki.map((wynik) => ({
          name: String(wynik.name || ""),
          czas_wygranej: Number(wynik.czas_wygranej),
        }))
      : [];


    poprawioneWyniki.sort((a, b) => a.czas_wygranej - b.czas_wygranej);

    setTablica(poprawioneWyniki);
    ustawLocalStorage("Najleprzy", poprawioneWyniki[0] || null);
  };

  useEffect(() => {
    const pobierzWyniki = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/wyniki`);
        ustawWyniki(response.data);
        setStatus("");
      } catch (error) {
        console.error(error);
        setStatus("Nie udalo sie pobrac wynikow.");
      }
    };

    pobierzWyniki();
  }, []);


  return (
    <main className="panel-gry panel-tablicy-wynikow">
      <h1>Tablica wynikow</h1>

      {status && <p>{status}</p>}

      <table className="tabela-wynikow">
        <thead>
          <tr>
            <th>Miejsce</th>
            <th>Gracz</th>
            <th>Czas</th>
          </tr>
        </thead>
        <tbody>
          {tablica.map((wynik, index) => (
            <tr key={`${wynik.name}-${wynik.czas_wygranej}-${index}`}>
              <td>{index + 1}</td>
              <td>{wynik.name}</td>
              <td>{wynik.czas_wygranej} s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default TablicaWynikow;
