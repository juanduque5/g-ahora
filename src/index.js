// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Importa Provider de react-redux
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store"; // Importa tu tienda Redux

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals();
