import axios from "axios";
import { useState } from "react";
import Popup from "./popup";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Wygana = ({ uplynieteSekundy }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const przeslij = async () => {
    setStatus("Wysylanie...");

    try {
      const dane = {
        name,
        czas_wygranej: uplynieteSekundy,
      };

      const response = await axios.post(`${API_BASE_URL}/wynik`, dane);
      console.log(response.data);
      setStatus("Wynik zapisany.");
    } catch (error) {
      console.error(error);
      setStatus("Nie udalo sie zapisac wyniku.");
    }
  };

  return (
    <Popup>
      <h1>Gratulacje, wygrales</h1>
      <p>Czas gry: {uplynieteSekundy} s</p>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Podaj imie"
      />
      <button onClick={przeslij}>Przeslij</button>
      {status && <p>{status}</p>}
    </Popup>
  );
};

export default Wygana;
