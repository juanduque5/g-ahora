// // index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux"; // Importa Provider de react-redux
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import store from "./store"; // Importa tu tienda Redux

// import "./index.css";

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root"),
// );



import React from "react";
import { createRoot } from "react-dom/client"; // Importa createRoot  react-dom/client
import { Provider } from "react-redux"; // Importa Provider de react-redux
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store"; // Importa tu tienda Redux

import "./index.css";

// Accede al elemento del DOM donde montarás tu aplicación React
const container = document.getElementById("root");

// Crea una raíz y usa el método render de esta
const root = createRoot(container); // Asegúrate de que tu ID coincida con el del contenedor
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);

reportWebVitals();
