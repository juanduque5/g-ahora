import React from "react";
import ReactDOM from "react-dom";

import "./modal.css"; // Importa tus estilos CSS

export default function Modal({ open, close, error }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay-modal" onClick={close}></div>
      <div className="modal-content h-auto w-90">
        <button className="mb-2 ml-auto flex w-7 border" onClick={close}>
          <p className="m-auto"> X</p>
        </button>

        <div className="flex h-2/3 justify-center border">
          <div className="m-auto">
            <p className="text-lg font-medium text-blue-new">{error}</p>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}

//     overflow-y: hidden;
// }

//   if (modal) {
//     document.body.classList.add("active-modal");
//   } else {
//     document.body.classList.remove("active-modal");
