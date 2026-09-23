import { Outlet } from "react-router";
import Nawigacja from "./Nawigacja";

const UkladStrony = () => {
  return (
    <>
      <Nawigacja />
      <main className="zawartosc-strony">
        <Outlet />
      </main>
    </>
  );
};

export default UkladStrony;
