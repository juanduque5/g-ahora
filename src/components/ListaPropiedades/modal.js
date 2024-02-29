import React from "react";
import ReactDOM from "react-dom";
import "./modal.css"; // Importa tus estilos CSS

export default function modal({ children, open, close }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="overlay-modal" onClick={close}></div>
      <div className="modal-content w-90">
        <button className="border bg-slate-500" onClick={close}>
          close modal
        </button>
        <div className="m-auto flex h-auto w-full flex-col border">
          <div className="flex h-auto w-full flex-col">
            <div className="mb-5 flex justify-end">
              <img
                // onClick={closeModal}
                className="h-auto w-3 cursor-pointer"
                // src={times}
                alt="Hi"
              ></img>
            </div>
            <div className="flex h-full">
              <p className="font-fira-sans font-semibold">
                Selecciona una opción o ambas:
              </p>
            </div>
            <div className="mb-5 flex h-auto flex-row gap-5">
              <div className="flex flex-row gap-5">
                <input
                  id="1"
                  className="w-4 cursor-pointer"
                  type="checkbox"
                  //   checked={filterOption.venta}
                  //   onChange={() => filterSearch("venta")}
                />
                <p className="font-open-sans">Venta</p>
              </div>
              <div className="flex flex-row gap-5">
                <input
                  id="2"
                  className="w-4 cursor-pointer"
                  type="checkbox"
                  //   checked={filterOption.renta}
                  //   onChange={() => filterSearch("renta")}
                />
                <p className="font-open-sans">Renta</p>
              </div>
            </div>
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
