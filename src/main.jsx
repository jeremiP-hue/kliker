import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import TablicaWynikow from "./components/TablicaWynikow/TablicaWynikow";
import UkladStrony from "./components/UkladStrony";

const routerAplikacji = createBrowserRouter([
  {
    path: "/",
    element: <UkladStrony />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "tablica-wynikow",
        element: <TablicaWynikow />,
      },
    ],
  },
]);

const korzenAplikacji = document.getElementById("root");

ReactDOM.createRoot(korzenAplikacji).render(
  <React.StrictMode>
    <RouterProvider router={routerAplikacji} />
  </React.StrictMode>,
);
