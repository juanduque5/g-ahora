import React from "react";
import appleStore from "../../images/appStore.png";
import googlePlay from "../../images/googlePlay.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footie0 md:h-450 absolute left-0 flex h-auto w-full ">
      <div className="footie md:h-350 m-auto flex h-auto flex-col    ">
        <div className="-gray-700 flex h-1/2 w-full flex-col  gap-3 md:flex-row md:gap-8">
          <div className="w-full ">
            <div className="flex w-full flex-col  md:w-1/2  md:justify-start">
              <p className="h-15 font-open-sans m-auto   flex   text-lg font-bold  md:m-0 md:justify-center">
                Venta inmuebles
              </p>
              <p className="h-15 font-open-sans m-auto flex  text-lg  font-normal md:m-0 md:justify-center">
                Casa venta
              </p>
              <p className="h-15 font-open-sans m-auto flex items-center text-lg  font-normal md:m-0 md:justify-center">
                Apartamento venta
              </p>
              <p className="h-15 font-open-sans m-auto flex items-center text-lg  font-normal md:m-0 md:justify-center">
                Locales
              </p>
            </div>
          </div>
          <div className="w-full  ">
            <div className="flex w-full flex-col justify-center   md:m-auto md:w-3/4">
              <p className="h-15 font-open-sans m-auto flex    text-lg font-bold">
                Agentes inmobiliarios
              </p>
              <p className="h-15 font-open-sans m-auto flex  text-lg font-normal">
                Publicar
              </p>
              <p className="h-15 font-open-sans m-auto flex   text-lg font-normal">
                herramientas
              </p>
              <p className="h-15 font-open-sans m-auto flex   text-lg font-normal">
                Precio
              </p>
            </div>
          </div>
          <div className=" mb-4 flex w-full justify-end ">
            <div className="flex w-full flex-col    md:w-1/2">
              <p className="h-15 font-open-sans m-auto flex  justify-center  text-lg font-bold md:m-0">
                Conocenos un poco mas
              </p>
              <p className="h-15 font-open-sans m-auto flex justify-center text-lg  font-normal md:m-0">
                Quienes somos ?
              </p>
              <p className="h-15 font-open-sans m-auto flex justify-center  text-lg font-normal md:m-0">
                Contacto
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-1/2 w-full md:items-center md:justify-center">
          <div className="flex h-5/6 w-full flex-col  md:w-56">
            <div className="m-auto mb-2 flex h-full w-auto cursor-pointer justify-center">
              <img src={appleStore} alt="Applestore"></img>
            </div>
            <div className="m-auto mb-2 flex h-full cursor-pointer">
              <img src={googlePlay} alt="Applestore"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
