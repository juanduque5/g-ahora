import React from "react";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
import agente from "../../images/agente.png";
import "./PropiedadesYaS.css";

const PropiedadesYaS = () => {
  return (
    <div className="ajusta">
      <div className="m-auto mb-16 mt-16 flex  h-auto w-full flex-col  md:w-full">
        <div className="m-auto mb-4 flex h-auto flex-col justify-center  md:mb-8 lg:mb-8 xl:mb-8">
          <div className="m-auto flex h-auto w-full flex-col justify-center ">
            <p className="text-center  font-fira-sans   text-2xl font-extrabold md:text-3xl lg:text-4xl xl:text-6xl">
              ¿ Eres un{" "}
              <span className="text-blue-new  ">
                agente inmobiliario o solo
              </span>{" "}
              quieres vender tu propiedad ?
            </p>
          </div>
          {/* <div className="m-auto flex  h-auto w-11/12 justify-center ">
            <p className="font-fira-sans m-auto hidden text-2xl font-extrabold md:block md:text-3xl lg:text-4xl xl:text-6xl">
              quieres vender tu propiedad ?
            </p>
          </div> */}
        </div>
        <div className="mb-14 flex flex-col justify-center  md:mb-16 lg:mb-16 xl:mb-16">
          <div className="m-auto flex w-full">
            <p className="w-full   text-center  font-open-sans text-xl font-semibold md:text-2xl lg:text-3xl xl:text-4xl">
              Descubre como <span className="text-blue-new">PropiedadesYa</span>{" "}
              puede impulsar tus ventas
              {/* <span className="md:hidden lg:hidden xl:hidden">tus ventas</span> */}
            </p>
          </div>
          {/* <div className="m-auto flex w-full ">
            <p className="font-open-sans m-auto hidden w-11/12  text-center  text-xl  font-semibold md:block md:text-2xl lg:block  lg:text-3xl xl:block xl:text-5xl">
              tus ventas
            </p>
          </div> */}
        </div>
        <div className="h-auto">
          <div className="flex h-auto flex-col gap-8 md:h-350 md:flex-row md:gap-10   lg:h-450 lg:flex-row xl:h-500 xl:flex-row">
            <div className="m-auto mb-4 flex h-380 w-full items-end justify-end  rounded-lg   md:h-full md:w-1/2 lg:w-1/2 xl:w-1/2">
              <div className="h-90 w-95 rounded-lg bg-blue-dark ">
                <div className="relative bottom-8 right-3 h-110 rounded-lg bg-blue-new ">
                  <div className="relative bottom-8 right-3 h-98 rounded-lg ">
                    <img
                      className="m-auto h-full w-full rounded-lg bg-cover bg-center"
                      src={agente}
                      alt="jaja"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex h-5/6 w-full flex-col  md:h-full md:w-full">
              <div className="mb-6 w-full  text-xl md:mb-0 md:text-xl lg:text-2xl xl:text-2xl">
                <p>
                  Las mejores y más modernas herramientas para promocionar tus
                  propiedades.
                </p>
              </div>
              <div className="m-auto flex h-96 w-11/12 flex-col  ">
                <div className="flex h-full w-full flex-row  ">
                  <div className="m-auto ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      className="w-11 md:w-14"
                    >
                      <circle cx="31.8" cy="31.8" r="31.8" fill="#F8B645" />
                      <path
                        d="M47.5285 20.8986C48.4897 21.7859 48.4897 23.3387 47.5285 24.2259L28.5999 43.1545C27.7126 44.1157 26.1599 44.1157 25.2726 43.1545L15.8083 33.6902C14.8471 32.8029 14.8471 31.2502 15.8083 30.3629C16.6956 29.4017 18.2483 29.4017 19.1356 30.3629L26.8993 38.1266L44.2012 20.8986C45.0884 19.9374 46.6412 19.9374 47.5285 20.8986Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center justify-start ">
                    <p className="ml-2 font-open-sans text-lg font-bold md:text-lg lg:text-xl">
                      Catálogo digital de tus propiedades
                    </p>
                  </div>
                </div>
                <div className="flex h-full w-full flex-row ">
                  <div className="m-auto  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      className="w-11 md:w-14"
                    >
                      <circle cx="31.8" cy="31.8" r="31.8" fill="#F8B645" />
                      <path
                        d="M47.5285 20.8986C48.4897 21.7859 48.4897 23.3387 47.5285 24.2259L28.5999 43.1545C27.7126 44.1157 26.1599 44.1157 25.2726 43.1545L15.8083 33.6902C14.8471 32.8029 14.8471 31.2502 15.8083 30.3629C16.6956 29.4017 18.2483 29.4017 19.1356 30.3629L26.8993 38.1266L44.2012 20.8986C45.0884 19.9374 46.6412 19.9374 47.5285 20.8986Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center justify-start ">
                    <p className="ml-2 font-open-sans text-lg font-bold md:text-lg lg:text-xl">
                      Generador de historias para Facebook, Instagram o Whatsapp
                    </p>
                  </div>
                </div>
                <div className="flex h-full w-full flex-row ">
                  <div className="m-auto ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      className="w-11 md:w-14"
                    >
                      <circle cx="31.8" cy="31.8" r="31.8" fill="#F8B645" />
                      <path
                        d="M47.5285 20.8986C48.4897 21.7859 48.4897 23.3387 47.5285 24.2259L28.5999 43.1545C27.7126 44.1157 26.1599 44.1157 25.2726 43.1545L15.8083 33.6902C14.8471 32.8029 14.8471 31.2502 15.8083 30.3629C16.6956 29.4017 18.2483 29.4017 19.1356 30.3629L26.8993 38.1266L44.2012 20.8986C45.0884 19.9374 46.6412 19.9374 47.5285 20.8986Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center justify-start ">
                    <p className="ml-2 font-open-sans text-lg font-bold md:text-lg lg:text-xl">
                      Generador de páginas web para tus propiedades
                    </p>
                  </div>
                </div>
                <div className="flex h-full w-full flex-row ">
                  <div className="m-auto ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      className="w-11 md:w-14"
                    >
                      <circle cx="31.8" cy="31.8" r="31.8" fill="#F8B645" />
                      <path
                        d="M47.5285 20.8986C48.4897 21.7859 48.4897 23.3387 47.5285 24.2259L28.5999 43.1545C27.7126 44.1157 26.1599 44.1157 25.2726 43.1545L15.8083 33.6902C14.8471 32.8029 14.8471 31.2502 15.8083 30.3629C16.6956 29.4017 18.2483 29.4017 19.1356 30.3629L26.8993 38.1266L44.2012 20.8986C45.0884 19.9374 46.6412 19.9374 47.5285 20.8986Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center justify-start ">
                    <p className="ml-2  font-open-sans text-lg font-bold md:text-lg lg:text-xl">
                      Paquetes especiales para agencias inmobiliarias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropiedadesYaS;
