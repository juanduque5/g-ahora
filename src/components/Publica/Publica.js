import React from "react";
import newwt from "../../images/firstt.png";
import orange from "../../images/orange.png";
import third from "../../images/thirdd.png";
import check from "../../images/check.png";
import "./Publica.css";
import { useSelector } from "react-redux";
import language from "./language";

const Publica = () => {
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);

  const {
    propiedades,
    message0,
    message1,
    message2,
    message3,
    message4,
    message5,
    message6,
    message7,
    message8,
    message9,
    message10,
    message11,
    message12,
    message13,
    message14,
    message15,
    message16,
    message17,
    message18,
    message19,
    message20,
    message21,
    message22,
    message23,
  } = language[storedLanguage];
  return (
    <div className=" ">
      {skeleton ? (
        <div className="publica flex h-auto w-full flex-col  md:h-618 lg:h-786 xl:h-850">
          <div className="flex h-10 w-full ">
            <p className="m-auto font-fira-sans text-2xl font-medium"></p>
          </div>
          <div className="flex h-full w-full  flex-col items-center justify-center  gap-6   md:flex-row">
            <div className="mt-5 flex h-auto animate-pulse flex-col rounded-2xl  bg-gray-300 md:mt-0 md:h-95 md:w-1/2  lg:w-2/4 xl:w-30">
              <div className="flex h-11  rounded-t-3xl">
                <p className="m-auto text-2xl font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl "></p>
              </div>
              <div className=" m-auto flex h-full w-11/12 flex-col  ">
                <div className="flex h-16 w-full  md:h-15">
                  <p className="sm:text-md m-auto text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl"></p>
                </div>
                <div className="flex h-12 w-full md:h-15">
                  <p className="m-auto font-open-sans text-3xl font-semibold text-blue-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl"></p>
                </div>
                <div className="flex h-20 w-full md:h-15">
                  <button className="m-auto h-11 w-36 rounded-lg font-fira-sans text-sm font-medium text-white"></button>
                </div>
                <div className="flex h-3/5 w-full flex-col gap-3  md:gap-0  lg:gap-2 xl:gap-6">
                  <div className="  flex h-auto  md:h-16  ">
                    <div className=" "></div>
                    <div className="flex h-full w-full "></div>
                  </div>
                  <div className=" flex h-auto  md:h-16 ">
                    <div className=""></div>
                    <div className="flex h-full  w-full "></div>
                  </div>
                  <div className=" flex h-auto md:h-16 ">
                    <div className=""></div>
                    <div className="flex h-full w-full "></div>
                  </div>
                  <div className=" flex h-auto  md:h-16 ">
                    <div className=""></div>
                    <div className="flex w-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16 flex h-auto animate-pulse flex-col rounded-2xl  bg-gray-300 md:mb-0 md:h-95 md:w-1/2  lg:w-2/4 xl:w-30">
              <div className="flex h-11 animate-pulse rounded-t-2xl ">
                <p className="m-auto text-2xl font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"></p>
              </div>
              <div className=" m-auto flex h-full w-11/12 flex-col  ">
                <div className="flex h-16 w-full  md:h-15">
                  <p className="sm:text-md m-auto  text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl"></p>
                </div>
                <div className="flex h-12 w-full  md:h-15">
                  <p className="m-auto font-open-sans text-3xl font-semibold text-orange-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl"></p>
                </div>
                <div className="flex h-20 w-full  md:h-15">
                  <button className="m-auto h-11 w-36 rounded-lg  font-fira-sans text-sm font-medium text-white"></button>
                </div>
                <div className="flex h-3/5 w-full flex-col   md:gap-0 lg:gap-2 xl:gap-6">
                  <div className="  flex h-auto  md:h-16 ">
                    <div className=""></div>
                    <div className="flex h-full w-full "></div>
                  </div>
                  <div className=" flex h-auto  md:h-16 ">
                    <div className=""></div>
                    <div className="flex h-full w-full "></div>
                  </div>
                  <div className=" flex h-auto  md:h-16 ">
                    <div className=""></div>
                    <div className="flex h-full w-full "></div>
                  </div>
                  <div className=" flex h-auto  md:h-16  ">
                    <div className=""></div>
                    <div className="flex h-full w-full "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="publica flex h-auto w-full flex-col md:h-618 lg:h-786 xl:h-850">
          <div className="flex h-10 w-full ">
            <p className="m-auto font-fira-sans text-2xl font-medium">Planes</p>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center gap-6  md:flex-row ">
            <div className="mt-5 flex h-auto flex-col rounded-2xl border  md:mt-0 md:h-95 md:w-1/2  lg:w-2/4 xl:w-30">
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
                <div className="flex h-3/5 w-full flex-col gap-3  md:gap-0  lg:gap-2 xl:gap-6">
                  <div className="  flex h-auto border   md:h-16  ">
                    <div className=" border">
                      <img className="" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full w-full border">
                      <p className="md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                  <div className=" flex h-auto border md:h-16 ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full  w-full border">
                      <p className="md:text-md text-lg sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                  <div className=" flex h-auto border md:h-16 ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full  w-full border">
                      <p className="md:text-md text-lg sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                  <div className=" flex h-auto border md:h-16 ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex w-full border">
                      <p className="md:text-md h-full  text-lg sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
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
                <div className="flex h-3/5 w-full flex-col   md:gap-0 lg:gap-2 xl:gap-6">
                  <div className="  flex h-auto border md:h-16 ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full w-full border">
                      <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                  <div className=" flex h-auto border md:h-16 ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full w-full border">
                      <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                  <div className=" flex h-auto border md:h-16 ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full w-full border">
                      <p className="md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                  <div className=" flex h-auto border md:h-16  ">
                    <div className="border">
                      <img className="mt-1" src={check} alt="Hi"></img>
                    </div>
                    <div className="flex h-full w-full border">
                      <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                        Promociona hasta 20 propiedades en la red de bienes
                        raíces más poderosa en Guatemala
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="elback  w-full ">
        <div className="ajusta">
          {skeleton ? (
            <div className="m-auto mb-8 h-auto w-full  md:h-530 lg:h-786 xl:h-786">
              <div className="h-full  ">
                <div className="m-auto mt-7 flex h-16 w-1/2 animate-pulse bg-gray-300 font-semibold  md:mb-11">
                  <p className="m-auto text-center font-fira-sans text-2xl md:text-xl lg:text-2xl xl:text-2xl"></p>
                </div>
                <div className="flex h-77 w-full flex-col  md:flex-row">
                  <div className=" flex w-full animate-pulse  flex-col bg-gray-300 md:w-1/2">
                    <div className="m-auto mb-5 mt-5 flex w-11/12   md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                      <p className="w-full text-center font-fira-sans text-xl font-semibold md:text-left md:text-2xl lg:text-3xl xl:text-4xl"></p>
                    </div>
                    <div className="hidden h-1/2 w-11/12  md:flex">
                      <p className="text-md sm:text-md   mt-10 w-9/12  font-open-sans font-medium sm:w-11/12 md:w-10/12 md:text-lg lg:text-2xl xl:text-3xl"></p>
                    </div>
                  </div>
                  <div className=" flex w-full animate-pulse rounded-xl  shadow-lg md:w-3/5">
                    <img
                      className="h-full w-full  rounded-t-lg  shadow-xl"
                      src={newwt}
                      alt="Hi"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="mt-5  md:hidden">
                <div className="m-auto mb-5 mt-5 flex w-11/12   md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                  <p className="w-full text-center font-fira-sans text-lg font-medium md:text-left md:text-2xl lg:text-3xl xl:text-4xl"></p>
                </div>
              </div>
              <hr className="horizontal absolute left-0 w-full "></hr>
            </div>
          ) : (
            <div className="m-auto mb-8 h-auto w-full  md:h-530 lg:h-786 xl:h-786">
              <div className="h-full  ">
                <div className="flex h-1/6 w-full font-semibold  md:mb-11">
                  <p className="m-auto text-center font-fira-sans text-2xl md:text-xl lg:text-2xl xl:text-2xl">
                    <span className="text-yellow-new ">{propiedades} </span>
                    {message0}
                  </p>
                </div>
                <div className="flex h-77 w-full flex-col  md:flex-row">
                  <div className=" flex w-full flex-col  md:w-1/2">
                    <div className="m-auto mb-5 mt-5 flex w-11/12   md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                      <p className="w-full text-center font-fira-sans text-xl font-semibold md:text-left md:text-2xl lg:text-3xl xl:text-4xl ">
                        {message1}{" "}
                        <span className="text-blue-new"> {message2} </span>{" "}
                        {message3}
                      </p>
                    </div>
                    <div className="hidden h-1/2 w-11/12  md:flex">
                      <p className="text-md sm:text-md   mt-10 w-9/12  font-open-sans font-medium sm:w-11/12 md:w-10/12 md:text-lg lg:text-2xl xl:text-3xl">
                        {message4}{" "}
                        <span className="font-semibold">{message5} </span>{" "}
                        {message6}
                      </p>
                    </div>
                  </div>
                  <div className=" flex w-full  rounded-xl  shadow-lg md:w-3/5">
                    <img
                      className="h-full w-full  rounded-t-lg  shadow-xl"
                      src={newwt}
                      alt="Hi"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="mt-5  md:hidden">
                <div className="m-auto mb-5 mt-5 flex w-11/12   md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                  <p className="w-full text-center font-fira-sans text-lg font-medium md:text-left md:text-2xl lg:text-3xl xl:text-4xl ">
                    {message4}{" "}
                    <span className="font-semibold">{message5} </span>{" "}
                    {message6}
                  </p>
                </div>
              </div>
              <hr className="horizontal absolute left-0 w-full "></hr>
            </div>
          )}

          {skeleton ? (
            <div className="m-auto mb-8 h-auto w-full  md:h-530 lg:h-786 xl:h-786">
              <div className="flex h-full items-center">
                <div className="flex h-77 w-full flex-col md:flex-row ">
                  <div className="order-2 h-full w-full animate-pulse rounded-xl  shadow-lg md:order-1 md:w-3/5">
                    <div className="m-auto h-full w-full rounded-t-lg shadow-xl">
                      <img
                        className="m-auto h-full w-full rounded-t-lg shadow-xl"
                        src={orange}
                        alt="Hi"
                      ></img>
                    </div>
                  </div>

                  <div className="order-1 flex w-full animate-pulse flex-col bg-gray-300 md:order-2 md:w-1/2">
                    <div className="m-auto flex h-1/2 w-95 items-center md:w-11/12">
                      <p className="text-center font-fira-sans text-xl font-semibold md:text-left md:text-2xl lg:text-3xl xl:text-4xl"></p>
                    </div>
                    <div className="m-auto hidden h-1/2 w-11/12 md:flex">
                      <p className="text-md sm:text-md mt-2 w-10/12 font-open-sans font-medium sm:w-full md:w-full md:text-lg lg:text-2xl xl:text-3xl"></p>
                    </div>
                  </div>
                  <div className="order-3 animate-pulse bg-gray-300 md:hidden">
                    <div className="m-auto mb-5 mt-5 flex w-11/12 md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                      <p className="w-full text-center font-fira-sans text-lg font-medium md:text-left md:text-2xl lg:text-3xl xl:text-4xl"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-auto mb-8 h-auto w-full md:h-530 lg:h-786 xl:h-786 ">
              <div className="flex h-full items-center  ">
                <div className="flex h-77 w-full flex-col gap-6  md:flex-row md:gap-12">
                  <div className="order-2 h-full w-full rounded-xl  shadow-lg md:order-1 md:w-3/5">
                    <img
                      className="m-auto h-full w-full rounded-t-lg shadow-xl"
                      src={orange}
                      alt="Hi"
                    ></img>
                  </div>

                  <div className="order-1 flex w-full flex-col  md:order-2 md:w-1/2">
                    <div className="m-auto flex h-1/2 w-95 items-center  md:w-11/12 ">
                      <p className=" text-center font-fira-sans text-xl font-semibold md:text-left  md:text-2xl lg:text-3xl xl:text-4xl">
                        {message7}{" "}
                        <span className="text-yellow-new">{message8} </span>{" "}
                        {message9}{" "}
                        <span className="text-yellow-new"> {message10}</span>
                      </p>
                    </div>
                    <div className="m-auto hidden h-1/2 w-11/12  md:flex">
                      <p className=" text-md  sm:text-md mt-2 w-10/12  font-open-sans font-medium sm:w-full md:w-full md:text-lg lg:text-2xl xl:text-3xl">
                        {message11}{" "}
                        <span className="font-semibold"> {message12}</span>
                      </p>
                    </div>
                  </div>
                  <div className="order-3   md:hidden">
                    <div className="m-auto mb-5 mt-5 flex w-11/12  md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                      <p className="w-full text-center font-fira-sans text-lg font-medium md:text-left md:text-2xl lg:text-3xl xl:text-4xl ">
                        {message11}{" "}
                        <span className="font-semibold">{message12}</span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {skeleton ? (
            <div className="m-auto mb-12 h-auto w-full  md:h-530 lg:h-786 xl:h-786">
              <div className="flex h-full items-center ">
                <div className="flex h-77 w-full flex-col md:flex-row">
                  <div className="flex w-full animate-pulse flex-col bg-gray-300 md:w-1/2">
                    <div className="m-auto flex h-1/2 w-10/12  md:m-0 md:mt-5 md:items-center">
                      <div className="w-full text-center font-fira-sans text-xl font-semibold md:mt-3 md:text-left md:text-2xl lg:text-3xl xl:text-4xl"></div>
                    </div>
                    <div className="hidden h-10 w-3/4 animate-pulse justify-center md:flex">
                      <button className="m-auto h-full w-8/12 rounded-lg  md:w-1/2 lg:w-2/5 xl:w-2/5"></button>
                    </div>
                  </div>
                  <div className="w-full animate-pulse rounded-t-xl bg-gray-300 shadow-lg md:w-3/5">
                    <div className="m-auto h-full w-full rounded-t-xl shadow-xl blur-sm">
                      <img
                        className="m-auto h-full w-full rounded-t-xl shadow-xl blur-sm "
                        src={third}
                        alt="Hi"
                      ></img>
                    </div>
                  </div>
                  <div className="order-3  md:hidden">
                    <div className="m-auto mb-5 mt-5 flex h-9 w-11/12 md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                      <button className="m-auto h-full w-1/2 rounded-lg  md:w-1/2 lg:w-2/5 xl:w-2/5"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-auto mb-12 h-auto w-full    md:h-530 lg:h-786 xl:h-786">
              <div className="flex h-full items-center ">
                <div className="flex h-77 w-full flex-col gap-6 md:flex-row">
                  <div className="flex w-full flex-col  md:w-1/2">
                    <div className="m-auto flex h-1/2 w-10/12 md:m-0 md:mt-5 md:items-center">
                      <p className="w-full text-center font-fira-sans text-xl font-semibold md:mt-3 md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
                        <span className="text-blue-new"> {message13} </span>{" "}
                        {message14}{" "}
                        <span className="text-blue-new"> {message15}</span>{" "}
                        {message16}
                      </p>
                    </div>
                    <div className=" hidden h-10 w-3/4  justify-center  md:flex">
                      <button className="m-auto h-full  w-8/12 rounded-lg border bg-orange-new text-white md:w-1/2 lg:w-2/5 xl:w-2/5">
                        {message23}
                      </button>
                    </div>
                  </div>
                  <div className="w-full rounded-t-xl   shadow-lg md:w-3/5 ">
                    <img
                      className="m-auto h-full w-full rounded-t-xl shadow-xl blur-sm "
                      src={third}
                      alt="Hi"
                    ></img>
                  </div>
                  <div className="order-3   md:hidden">
                    <div className="m-auto mb-5 mt-5 flex h-9 w-11/12  md:m-0 md:h-1/2 md:w-10/12 md:items-center">
                      <button className="m-auto   h-full  w-1/2 rounded-lg  text-white md:w-1/2 lg:w-2/5 xl:w-2/5">
                        {message23}{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="publica">
        {skeleton ? (
          <div className="m-auto mb-12 mt-8 flex h-786 w-full  flex-col justify-center md:h-560 md:flex-row lg:h-786 xl:h-786">
            <div className="order-1 m-auto flex h-30 w-70 flex-col gap-4  sm:text-lg md:order-2 md:h-3/4 md:text-xl lg:text-3xl xl:text-3xl">
              <div className="flex h-24 w-full animate-pulse  bg-gray-300">
                <p className="m-auto text-center font-fira-sans text-2xl font-extrabold sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl"></p>
              </div>
              <div className="m-auto hidden h-16 w-1/2 animate-pulse bg-gray-300 md:flex">
                <p className="m-auto w-10/12 text-center font-open-sans sm:text-lg md:text-xl lg:text-3xl xl:text-3xl"></p>
              </div>
              <div className="m-auto hidden h-16 w-1/4 animate-pulse bg-gray-300 md:flex lg:flex">
                <button className="h-12 w-1/2 rounded-lg font-fira-sans text-sm text-white sm:w-2/5 sm:text-sm md:m-auto md:w-2/5 lg:w-30 xl:text-lg"></button>
              </div>
            </div>
            <div className="order-3 flex h-15 animate-pulse border bg-gray-300 md:hidden">
              <p className="m-auto w-10/12 text-center font-open-sans sm:text-lg md:text-xl lg:text-3xl xl:text-3xl"></p>
            </div>
            <div className="order-4 flex h-15 animate-pulse border bg-gray-300 md:hidden">
              <button className="m-auto h-12 w-2/5 rounded-lg border  font-fira-sans text-sm text-white sm:w-2/5 sm:text-sm md:w-2/5 lg:w-2/5 xl:text-lg"></button>
            </div>
          </div>
        ) : (
          <div className="m-auto mb-12 mt-8 flex h-786 w-full flex-col justify-center  md:h-560 md:flex-row lg:h-786 xl:h-786 ">
            <div className="order-1 m-auto flex h-30 w-70 flex-col  sm:text-lg md:order-2 md:h-3/4 md:text-xl lg:text-3xl xl:text-3xl">
              <div className="  flex h-full w-full">
                <p className="m-auto  text-center font-fira-sans text-2xl font-extrabold sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl ">
                  {message17}{" "}
                  <span className="text-yellow-new">{message18}</span>{" "}
                  <span className="text-yellow-new">{message19}</span>
                </p>
              </div>
              <div className="hidden  h-full w-full   md:flex">
                <p className="m-auto w-10/12  text-center font-open-sans sm:text-lg md:text-xl lg:text-3xl xl:text-3xl">
                  <span className="font-semibold"> {message20} </span>{" "}
                  {message21}
                </p>
              </div>

              <div className="hidden h-full  w-full  md:flex lg:flex ">
                <button
                  className="h-12 w-1/2  rounded-lg
               bg-blue-new font-fira-sans text-sm text-white sm:w-2/5 sm:text-sm md:m-auto  md:w-2/5 lg:w-30 xl:text-lg"
                >
                  {message22}
                </button>
              </div>
            </div>
            <div className="order-3 flex h-15 border md:hidden">
              <p className="m-auto w-10/12  text-center font-open-sans sm:text-lg md:text-xl lg:text-3xl xl:text-3xl">
                <span className="font-semibold"> {message20} </span>
                {message21}
              </p>
            </div>
            <div className="order-4 flex h-15 border md:hidden">
              <button
                className="m-auto h-12 w-2/5 rounded-lg border
               bg-blue-new font-fira-sans text-sm text-white sm:w-2/5 sm:text-sm md:w-2/5  lg:w-2/5 xl:text-lg"
              >
                {message22}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Publica;
