export const pobierzLocalStorage = (nazwa, oczekiwanaWartosc) => {
  try {
    const zapisanaWartosc = localStorage.getItem(nazwa);

    if (zapisanaWartosc === null) {
      return typeof oczekiwanaWartosc === "function"
        ? oczekiwanaWartosc()
        : oczekiwanaWartosc;
    }

    return JSON.parse(zapisanaWartosc);
  } catch (error) {
    console.error(`Nie udalo sie odczytac ${nazwa} z localStorage.`, error);
    return typeof oczekiwanaWartosc === "function"
      ? oczekiwanaWartosc()
      : oczekiwanaWartosc;
  }
};

export const ustawLocalStorage = (nazwa, wartosc) => {
  try {
    localStorage.setItem(nazwa, JSON.stringify(wartosc));
  } catch (error) {
    console.error(`Nie udalo sie zapisac ${nazwa} w localStorage.`, error);
  }
};
export const usunlocalStorydge = () => {
  localStorage.clear()
}