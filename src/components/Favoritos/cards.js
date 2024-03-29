import React from "react";
import car from "../../images/car.png";
import house from "../../images/house.png";
import bath from "../../images/bath.png";
import bed from "../../images/bed.png";

export const Cards = ({ properties, handleHeartClick, redirect }) => {
  //   const infoH = [{}];

  return (
    <div className="">
      {properties.length === 0 ? (
        <p className="text-center">0 resultados</p>
      ) : (
        <div className="grid h-auto grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {properties.map((info, index) => (
            <div
              onClick={() => redirect(info)}
              className="h-500  w-full   cursor-pointer flex-col    rounded-lg border border-gray-700   shadow-md md:w-full  "
              key={index}
            >
              <div className="relative h-3/5 ">
                <div className="absolute left-0 top-0 bg-black p-2 text-white opacity-60">
                  {info.uso}
                </div>
                <div className="absolute right-0 top-0 border  text-white opacity-60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-9 w-7 ${
                      info.favorito_id ? "fill-red-600" : "fill-black"
                    }`}
                    onClick={(event) => handleHeartClick(event, index, info.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>

                <img
                  className="m-auto h-full w-full rounded-t-lg"
                  src={info.imageURL}
                  alt="Hi"
                ></img>
              </div>
              <div className="flex h-2/5 justify-center ">
                <div className="m-auto flex h-44  w-11/12 flex-col ">
                  <div className=" flex h-full ">
                    <p className="m-auto ml-0 font-open-sans text-lg font-bold md:text-lg lg:text-xl xl:text-xl">
                      {info.tipo}
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="m-auto  ml-0 font-open-sans text-lg font-bold md:text-lg lg:text-22 xl:text-22">
                      $ {info.precio.toLocaleString() + " "}{" "}
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="m-auto ml-0 font-open-sans text-base font-normal text-gray-new md:text-lg lg:text-xl xl:text-xl">
                      {info.municipio}
                    </p>
                  </div>
                  <div className=" flex h-full flex-row ">
                    <div className="flex w-1/5  ">
                      <img
                        className="m-auto ml-0 mr-2 h-5 w-5"
                        src={bed}
                        alt="Hi"
                      ></img>
                      <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                        {info.habitaciones}
                      </p>
                    </div>
                    <div className="flex w-1/5 ">
                      <img
                        className="m-auto  ml-0 mr-2 h-5 w-5 "
                        src={bath}
                        alt="Hi"
                      ></img>
                      <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                        {info.banos}
                      </p>
                    </div>
                    <div className="flex w-1/5 ">
                      <img
                        className="m-auto ml-0 mr-2 h-5 w-5"
                        src={car}
                        alt="Hi"
                      ></img>
                      <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                        {info.estacionamientos}
                      </p>
                    </div>
                    <div className="flex w-2/5 ">
                      <img
                        className="m-auto ml-0 mr-2 h-5 w-5 "
                        src={house}
                        alt="Hi"
                      ></img>
                      <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                        {info.area}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={`m-auto flex h-11 ${
          properties.length === 0 ? "hidden" : "mt-8 block"
        } w-24 cursor-pointer rounded-lg bg-blue-new`}
      >
        <p className="m-auto flex font-open-sans text-base text-white">
          Ver mas
        </p>
      </div>
    </div>
  );
};

export default Cards;
