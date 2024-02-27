import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
// import image5 from "../../images/image5.png";
// import image6 from "../../images/image6.png";
// import image7 from "../../images/image7.png";
import car from "../../images/car.png";
import house from "../../images/house.png";
import bath from "../../images/bath.png";
import bed from "../../images/bed.png";

import "./Cards.css";

const Cards = ({ title, infoH, userId, isAuth, vacation }) => {
  console.log("userId", userId);
  const [heart, setHeart] = useState([]);
  const navigate = useNavigate();
  // console.log("infoH:", infoH[0].imageURL);
  const redirect = (info) => {
    console.log("id", info.id);
    // fill(info);
    navigate(`/PropertyInfo/${info.id}`);
  };
  const handleHeartClick = useCallback(
    (event, index, propertyId) => {
      if (isAuth && userId) {
        event.stopPropagation();
        const updateHeartColors = [...heart];
        updateHeartColors[index] = !updateHeartColors[index];
        setHeart(updateHeartColors);
        updateFavorites(propertyId, userId);
      } else {
        event.stopPropagation();
        navigate("/Login");
      }

      //(PENDING) crear if/else si esta autenticado y el userId no es null para poder activar el favorito
    },
    [heart, setHeart, navigate, isAuth, userId],
  );

  const updateFavorites = async (propertyId, userId) => {
    try {
      const response = await fetch(
        `http://localhost:2001/properties/favorites/${propertyId}/${userId}`, // Suponiendo que este sea el endpoint para marcar favorito
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Especificar el tipo de contenido si envías datos en formato JSON
          },
        },
      );
      if (!response.ok) {
        console.log(
          "NOT RESPONSE OK: Error al marcar la propiedad como favorita",
        );
      } else {
        console.log("Propiedad marcada como favorita con éxito");
      }
    } catch (error) {
      console.error(
        "CATCH ERROR: Error al marcar la propiedad como favorita",
        error,
      );
    }
  };

  console.log("hearts", heart);

  return (
    <div className="ajusta">
      <div className="m-auto mb-20 flex h-auto w-full flex-col md:w-full">
        {title && (
          <div className="mb-16 flex h-10 justify-center ">
            {vacation ? (
              <p className="m-auto text-center  font-open-sans text-3xl font-semibold">
                Destinos populares
              </p>
            ) : (
              <p className="m-auto text-center  font-open-sans text-3xl font-semibold">
                Explora propiedades cerca de ti
              </p>
            )}

            <p>
              {/* {infoH.map((si) => {
                return si;
              })} */}
            </p>
          </div>
        )}

        <div className="try grid h-auto grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {infoH.map((info, index) => (
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
                      heart[index] ? "fill-red-600" : "fill-black"
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
                      $ {info.precio}
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="m-auto ml-0 font-open-sans text-base font-normal text-gray-new md:text-lg lg:text-xl xl:text-xl">
                      {info.ciudad}
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
        <div className="m-auto flex h-11 w-24 cursor-pointer rounded-lg bg-blue-new">
          <p className="m-auto flex font-open-sans text-base text-white">
            Ver mas
          </p>
        </div>
      </div>
    </div>
  );
};
export default Cards;
