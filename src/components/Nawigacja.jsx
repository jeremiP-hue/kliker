import { Link } from "react-router";
import { usunlocalStorydge } from "../useLocalStorageState";

const Nawigacja = () => {
  const resetujGre = () => {
    usunlocalStorydge();
    window.location.assign("/");
  };

  return (
    <header className="pasek-nawigacji">
      <nav className="linki-nawigacji">
        <Link to="/" className="link-nawigacji">
          Gra
        </Link>
        <Link to="/tablica-wynikow" className="link-nawigacji">
          Tablica wynikow
        </Link>
        <button type="button" onClick={resetujGre}>reset</button>
      </nav>
    </header>
  );
};

export default Nawigacja;
