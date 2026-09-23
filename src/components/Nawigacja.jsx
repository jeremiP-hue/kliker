import { Link } from "react-router";

const Nawigacja = () => {
  return (
    <header className="pasek-nawigacji">
      <nav className="linki-nawigacji">
        <Link to="/" className="link-nawigacji">
          Gra
        </Link>
        <Link to="/tablica-wynikow" className="link-nawigacji">
          Tablica wynikow
        </Link>
      </nav>
    </header>
  );
};

export default Nawigacja;
