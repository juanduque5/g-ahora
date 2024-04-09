import React from "react";
import ReactDOM from "react-dom";

import mujer from "../../images/mujer.jpg";
import green from "../../images/green.png";
import whatsapp from "../../images/whatsapp.png";
import call from "../../images/call.png";

import "./modal.css"; // Importa tus estilos CSS
import { useState } from "react";

export default function Modal({ open, close, socialLinks }) {
  const social = socialLinks;
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  if (!open) return null;
  console.log(social.whatsapp);

  return ReactDOM.createPortal(
    <>
      <div className="overlay-modal" onClick={close}></div>
      <div className="modal-content h-auto w-90">
        <button className="mb-2 ml-auto flex w-7 border" onClick={close}>
          <p className="m-auto"> X</p>
        </button>

        <div className="flex h-full w-full flex-col rounded-xl border ">
          <div className="h-1/2 ">
            <div className="flex h-1/4 ">
              <p className="m-auto text-center font-open-sans font-medium">
                Habla con un <span className="text-blue-new">agente </span> para
                conocer más de esta propiedad.
              </p>
            </div>
            <div className="flex h-1/2 ">
              <div className="m-auto  h-auto w-auto rounded-full border ">
                <img
                  className="h-28 w-28 rounded-full object-cover"
                  src={mujer}
                  alt=""
                />
              </div>
            </div>
            <div className="h-1/4 ">
              <div className="flex h-1/2 items-center justify-center  ">
                <img
                  src={green}
                  alt=""
                  className="relative right-2 h-4 w-4 text-center"
                />
                <p className="font-open-sans text-xl font-bold text-blue-new">
                  Yessenia Méndez
                </p>
              </div>
              <div className=" flex h-1/2">
                <p className="m-auto text-center font-open-sans text-sm font-normal text-new">
                  Miembro desde 2022
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-1/2 flex-col items-center  gap-2 ">
            <div className="flex h-90 w-11/12 flex-col gap-3 ">
              <div className=" mt-2 h-full w-full rounded-xl border">
                <input
                  className="h-11 w-full rounded-xl"
                  type="text"
                  placeholder="Nombre completo"
                ></input>
              </div>
              <div className=" h-11 w-full rounded-xl border">
                <input
                  className="h-full w-full rounded-xl"
                  type="text"
                  placeholder="Correo electronico"
                ></input>
              </div>
              <div className="h-11 w-full rounded-xl border">
                <input
                  className="h-full w-full rounded-xl"
                  type="text"
                  placeholder="Numero telefonico"
                ></input>
              </div>
              <div className=" mb-1 flex h-11 w-full cursor-pointer rounded-xl bg-blue-new">
                <p className="m-auto font-fira-sans text-white">
                  CONTACTAR AGENTE
                </p>
              </div>
            </div>
            <div className="  flex w-full ">
              <div className="relative h-full w-1/2 ">
                <div className=" flex h-full w-full cursor-pointer gap-2 ">
                  <img
                    className="m-auto h-8 w-8 rounded-full object-cover"
                    src={call}
                    alt=""
                    onClick={togglePopup}
                  />
                  {showPopup && (
                    <div className="popup absolute top-full w-full   shadow-xl">
                      <p className="rounded-lg bg-slate-200 text-center text-lg text-black shadow-2xl">
                        415-9292-0213
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex w-1/2 cursor-pointer  ">
                <div className="flex w-full">
                  <a className="m-auto" href={social.whatsapp}>
                    <img
                      className="h-11 w-9 rounded-full object-cover"
                      src={whatsapp}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}
