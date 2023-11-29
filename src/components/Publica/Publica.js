import React from "react";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
// import image5 from "../../images/image5.png";
// import image6 from "../../images/image6.png";
// import image7 from "../../images/image7.png";
// import car from "../../images/car.png";
// import house from "../../images/house.png";
// import bath from "../../images/bath.png";
import newwt from "../../images/firstt.png";
import orange from "../../images/orange.png";
import third from "../../images/thirdd.png";
import check from "../../images/check.png";
import "./Publica.css";

const Publica = () => {
  return (
    <div className=" ">
      <div className="publica">
        <div className="m-auto mb-12 mt-8 flex h-786 w-full flex-col justify-center border md:h-560 md:flex-row lg:h-786 xl:h-786 ">
          <div className="order-2 h-full w-full border  border-red-400 md:order-1 md:w-10/12">
            <p>jaja</p>
          </div>
          <div className="order-1 m-auto flex h-30 w-full flex-col border border-purple-400 sm:text-lg md:order-2 md:h-3/4 md:text-xl lg:text-3xl xl:text-3xl">
            <div className="  flex h-full w-full border border-green-500">
              <p className="m-auto border text-center font-fira-sans text-2xl font-extrabold sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl ">
                Lleva la promoción de tus{" "}
                <span className="text-yellow-new">propiedades</span> al{" "}
                <span className="text-yellow-new">siguiente nivel</span>
              </p>
            </div>
            <div className="hidden  h-full w-full border border-blue-600  md:flex">
              <p className="m-auto w-10/12 border text-center font-open-sans sm:text-lg md:text-xl lg:text-3xl xl:text-3xl">
                <span className="font-semibold"> Incrementa tus ventas </span>{" "}
                con las mejores y más modernas herramientas para inmobiliarios.
              </p>
            </div>

            <div className="hidden h-full  w-full  border md:flex lg:flex ">
              <button
                className="h-12 w-1/2  rounded-lg
               border bg-blue-new font-fira-sans text-sm text-white sm:w-2/5 sm:text-sm md:m-auto  md:w-2/5 lg:w-30 xl:text-lg"
              >
                COMIENZA GRATIS
              </button>
            </div>
          </div>
          <div className="order-3 flex h-15 border md:hidden">
            <p className="m-auto w-10/12 border text-center font-open-sans sm:text-lg md:text-xl lg:text-3xl xl:text-3xl">
              <span className="font-semibold"> Incrementa tus ventas </span> con
              las mejores y más modernas herramientas para inmobiliarios.
            </p>
          </div>
          <div className="order-4 flex h-15 border md:hidden">
            <button
              className="m-auto h-12 w-2/5 rounded-lg border
               bg-blue-new font-fira-sans text-sm text-white sm:w-2/5 sm:text-sm md:w-2/5  lg:w-2/5 xl:text-lg"
            >
              COMIENZA GRATIS
            </button>
          </div>
        </div>
      </div>

      <div className="elback  w-full border border-blue-600">
        <div className="ajusta">
          <div className="m-auto mb-8 h-auto w-full border border-red-500 md:h-530 lg:h-786 xl:h-786">
            <div className="h-full border ">
              <div className="flex h-1/6 w-full border font-semibold  md:mb-11">
                <p className="m-auto text-center font-fira-sans text-2xl md:text-xl lg:text-2xl xl:text-2xl">
                  <span className="text-yellow-new ">PropiedadesYa </span>es tu
                  mejor aliado como asesor inmobiliario
                </p>
              </div>
              <div className="flex h-77 w-full flex-col border md:flex-row">
                <div className=" flex w-full flex-col border md:w-1/2">
                  <div className="m-auto mb-5 mt-5 flex w-11/12 border border-red-400  md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                    <p className="w-full text-center font-fira-sans text-xl font-semibold md:text-left md:text-2xl lg:text-3xl xl:text-4xl ">
                      Cuenta con tu propio{" "}
                      <span className="text-blue-new">
                        {" "}
                        catalogo digital de tus propiedades{" "}
                      </span>{" "}
                      y compártelo fácilmente por cualquier red social
                    </p>
                  </div>
                  <div className="hidden h-1/2 w-11/12  border md:flex">
                    <p className="text-md sm:text-md   mt-10 w-9/12 border font-open-sans font-medium sm:w-11/12 md:w-10/12 md:text-lg lg:text-2xl xl:text-3xl">
                      Lleva tu marca profesional al siguiente nivel con{" "}
                      <span className="font-semibold">
                        tu propio sitio web profesional{" "}
                      </span>{" "}
                      y promociona tus propiedades desde él.
                    </p>
                  </div>
                </div>
                <div className=" flex w-full rounded-xl border border-red-400 shadow-lg md:w-3/5">
                  <img
                    className="h-full w-full  rounded-t-lg  shadow-xl"
                    src={newwt}
                    alt="Hi"
                  ></img>
                </div>
              </div>
            </div>
            <div className="mt-5 border border-green-400 md:hidden">
              <div className="m-auto mb-5 mt-5 flex w-11/12 border border-red-400  md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                <p className="w-full text-center font-fira-sans text-lg font-medium md:text-left md:text-2xl lg:text-3xl xl:text-4xl ">
                  Lleva tu marca profesional al siguiente nivel con{" "}
                  <span className="font-semibold">
                    tu propio sitio web profesional{" "}
                  </span>{" "}
                  y promociona tus propiedades desde él.
                </p>
              </div>
            </div>
            <hr className="horizontal absolute left-0 w-full "></hr>
          </div>

          <div className="m-auto mb-8 h-auto w-full md:h-530 lg:h-786 xl:h-786 ">
            <div className="flex h-full items-center  border border-blue-800">
              <div className="flex h-77 w-full flex-col gap-6 border border-green-400  md:flex-row md:gap-12">
                <div className="order-2 h-full w-full rounded-xl border shadow-lg md:order-1 md:w-3/5">
                  <img
                    className="m-auto h-full w-full rounded-t-lg shadow-xl"
                    src={orange}
                    alt="Hi"
                  ></img>
                </div>

                <div className="order-1 flex w-full flex-col border md:order-2 md:w-1/2">
                  <div className="m-auto flex h-1/2 w-95 items-center border md:w-11/12 ">
                    <p className="border text-center font-fira-sans text-xl font-semibold md:text-left  md:text-2xl lg:text-3xl xl:text-4xl">
                      Genera{" "}
                      <span className="text-yellow-new">
                        sitios web profesionales{" "}
                      </span>{" "}
                      automáticamente para cada una de tus{" "}
                      <span className="text-yellow-new"> propiedades</span>
                    </p>
                  </div>
                  <div className="m-auto hidden h-1/2 w-11/12 border md:flex">
                    <p className=" text-md  sm:text-md mt-2 w-10/12 border font-open-sans font-medium sm:w-full md:w-full md:text-lg lg:text-2xl xl:text-3xl">
                      Genera automáticamente y{" "}
                      <span className="font-semibold">
                        {" "}
                        personaliza sitios web para cada una de tus propiedades{" "}
                      </span>{" "}
                      y eleva tus ventas al siguiente nivel. No necesitas saber
                      de diseño web.
                    </p>
                  </div>
                </div>
                <div className="order-3  border border-green-400 md:hidden">
                  <div className="m-auto mb-5 mt-5 flex w-11/12 border border-red-400  md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                    <p className="w-full text-center font-fira-sans text-lg font-medium md:text-left md:text-2xl lg:text-3xl xl:text-4xl ">
                      Genera automáticamente y{" "}
                      <span className="font-semibold">
                        {" "}
                        personaliza sitios web para cada una de tus propiedades.{" "}
                      </span>{" "}
                      No necesitas saber de diseño web.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto mb-12 h-auto w-full border border-red-500   md:h-530 lg:h-786 xl:h-786">
            <div className="flex h-full items-center border border-green-300">
              <div className="flex h-77 w-full flex-col gap-6 border md:flex-row">
                <div className="flex w-full flex-col border border-red-300 md:w-1/2">
                  <div className="m-auto flex h-1/2 w-10/12 border md:m-0 md:mt-5 md:items-center">
                    <p className="w-full text-center font-fira-sans text-xl font-semibold md:mt-3 md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
                      <span className="text-blue-new">
                        {" "}
                        Renta tus propiedades{" "}
                      </span>{" "}
                      por dias, y podras{" "}
                      <span className="text-blue-new"> generar </span> ingresos
                      con facilidad
                    </p>
                  </div>
                  <div className=" hidden h-10 w-3/4  justify-center border border-red-500 md:flex">
                    <button className="m-auto h-full  w-8/12 rounded-lg border bg-orange-new text-white md:w-1/2 lg:w-2/5 xl:w-2/5">
                      PROXIMAMENTE{" "}
                    </button>
                  </div>
                </div>
                <div className="w-full rounded-t-xl border  shadow-lg md:w-3/5 ">
                  <img
                    className="m-auto h-full w-full rounded-t-xl shadow-xl blur-sm "
                    src={third}
                    alt="Hi"
                  ></img>
                </div>
                <div className="order-3  border border-green-400 md:hidden">
                  <div className="m-auto mb-5 mt-5 flex h-9 w-11/12 border  border-red-400 md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                    <button className="m-auto   h-full  w-1/2 rounded-lg border bg-orange-new text-white md:w-1/2 lg:w-2/5 xl:w-2/5">
                      PROXIMAMENTE{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="publica flex h-auto w-full   flex-col border border-green-400 md:h-618 lg:h-786 xl:h-850">
        <div className="flex h-10 w-full border ">
          <p className="m-auto border  font-open-sans font-semibold sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
            Comienza <span className="text-blue-new">impulsar tus ventas</span>{" "}
            hoy mismo
          </p>
        </div>
        <div className="mt-10 flex h-10 w-full border border-black">
          <p className="m-auto font-fira-sans text-2xl font-medium">Planes</p>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 border  border-orange-500 md:flex-row ">
          <div className="mt-5 flex h-auto flex-col rounded-2xl border border-green-400 md:mt-0 md:h-95 md:w-1/2  lg:w-2/4 xl:w-30">
            <div className="flex h-11 rounded-t-3xl border bg-gray-k">
              <p className="m-auto text-2xl font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ">
                GRATUITO{" "}
              </p>
            </div>
            <div className=" m-auto flex h-full w-11/12 flex-col  border">
              <div className="flex h-16 w-full border md:h-15">
                <p className="sm:text-md m-auto text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl">
                  Ideal para independientes o particulares
                </p>
              </div>
              <div className="flex h-12 w-full border md:h-15">
                <p className="m-auto font-open-sans text-3xl font-semibold text-blue-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                  Gratis
                </p>
              </div>
              <div className="flex h-20 w-full border md:h-15">
                <button className="m-auto h-11 w-36 rounded-lg bg-blue-new font-fira-sans text-sm font-medium text-white">
                  AGENDAR CITA
                </button>
              </div>
              <div className="flex h-3/5 w-full flex-col gap-3 border border-red-500 md:gap-0  lg:gap-2 xl:gap-6">
                <div className="  flex h-auto border   md:h-16  ">
                  <div className=" border">
                    <img className="" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full w-full border">
                    <p className="md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
                <div className=" flex h-auto border md:h-16 ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full  w-full border">
                    <p className="md:text-md text-lg sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
                <div className=" flex h-auto border md:h-16 ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full  w-full border">
                    <p className="md:text-md text-lg sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
                <div className=" flex h-auto border md:h-16 ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex w-full border">
                    <p className="md:text-md h-full  text-lg sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 flex h-auto flex-col rounded-2xl border md:mb-0 md:h-95 md:w-1/2 lg:w-2/4  xl:w-30">
            <div className="flex h-11 rounded-t-2xl border bg-orange-new">
              <p className="m-auto text-2xl font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                PRO
              </p>
            </div>
            <div className=" m-auto flex h-full w-11/12 flex-col  border">
              <div className="flex h-16 w-full border md:h-15">
                <p className="sm:text-md m-auto  text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl">
                  Ideal para independientes o particulares
                </p>
              </div>
              <div className="flex h-12 w-full border md:h-15">
                <p className="m-auto font-open-sans text-3xl font-semibold text-orange-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                  $20/mes
                </p>
              </div>
              <div className="flex h-20 w-full border md:h-15">
                <button className="m-auto h-11 w-36 rounded-lg bg-blue-new font-fira-sans text-sm font-medium text-white">
                  AGENDAR CITA
                </button>
              </div>
              <div className="flex h-3/5 w-full flex-col  border border-red-500 md:gap-0 lg:gap-2 xl:gap-6">
                <div className="  flex h-auto border md:h-16 ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full w-full border">
                    <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
                <div className=" flex h-auto border md:h-16 ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full w-full border">
                    <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
                <div className=" flex h-auto border md:h-16 ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full w-full border">
                    <p className="md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
                    </p>
                  </div>
                </div>
                <div className=" flex h-auto border md:h-16  ">
                  <div className="border">
                    <img className="mt-1" src={check} alt="Hi"></img>
                  </div>
                  <div className="flex h-full w-full border">
                    <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                      Promociona hasta 20 propiedades en la red de bienes raíces
                      más poderosa en Guatemala
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
export default Publica;
