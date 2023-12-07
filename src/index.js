import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client"
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";

const root = createRoot(document.getElementById("root")); // Create a root instance

// Configurar el elemento de la aplicación
Modal.setAppElement("#root"); // Asegúrate de ajustar el selector según el ID de tu elemento raíz

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
