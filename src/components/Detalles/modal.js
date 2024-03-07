import React from "react";
import ReactDOM from "react-dom";

import "./modal.css"; // Importa tus estilos CSS

export default function Modal({ open, close, error, error2 }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay-modal" onClick={close}></div>
      <div className="modal-content h-auto w-90">
        <button className="mb-2 ml-auto flex w-7 border" onClick={close}>
          <p className="m-auto"> X</p>
        </button>

        <div className="flex h-2/3 flex-col justify-center border">
          {error.length > 0 && (
            <div>
              <div className="">
                <p className="text-lg font-semibold text-blue-new">
                  Completa la siguiente informacion:
                </p>
              </div>
              <div className="text-wrap  h-auto w-auto">
                <p className="text-md  ">{error.join(", ")}</p>
              </div>
            </div>
          )}

          {error2 && (
            <div>
              <div>
                <p className="text-lg font-semibold text-blue-new">Imagenes:</p>
              </div>
              <div className="text-wrap">
                <p className="text-md">{error2}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}
