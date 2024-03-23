import React, { useState, useCallback, useEffect } from "react";
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

const Cards = React.memo(({ data }) => {
  console.log("data", data);
  const token = localStorage.getItem("token") ? true : false;
  const userId = localStorage.getItem("userId");
  console.log("token&userId", token, userId);
  const [properties, setProperties] = useState([]);
  // const [searchData, setSearchData] = useState(data);

  const navigate = useNavigate();

  // console.log("infoH:", infoH[0].imageURL);
  const redirect = (info) => {
    console.log("id", info.id);
    // fill(info);
    navigate(`/PropertyInfo/${info.id}`);
  };

  //Get properties, check if it's on home or properties
  const fetchData = useCallback(async () => {
    console.log("fetchio");
    try {
      if (data) {
        if (!token & !userId) {
          // Recreating obj with search data to be sent to the backend
          const search = {
            casa: data.tipo.Casa,
            apartamento: data.tipo.Apartamento,
            local: data.tipo.Local,
            lote: data.tipo.Lote,
            venta: data.uso.Venta,
            renta: data.uso.Renta,
            both: data.uso["Venta y renta"],
            location: data.place.location,
          };

          const queryParams = new URLSearchParams(search).toString();
          const response = await fetch(
            `http://localhost:2001/properties/homeSearch?${queryParams}&token=${token}`,
          );

          if (!response.ok) {
            console.log("Error al obtener datos iniciales");
          }

          const searchInfo = await response.json();
          console.log("homeSearch info", searchInfo.data);
        } else {
          console.log("jaja");
        }
      } else if (token && userId) {
        const response = await fetch(
          `http://localhost:2001/properties/info/${token}/${userId}`,
        );
        if (!response.ok) {
          console.log("Error al obtener datos iniciales");
        }

        const data = await response.json();
        setProperties(data.data);
        // setSearchData(null);
      }
    } catch (error) {
      console.error("Error al obtener datos iniciales:", error);
    }
  }, [data, token, userId]);

  // Utilizar useEffect y pasar fetchData como su función y las dependencias
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //handle heart favorite clicks
  //chnage isAuth for tokens
  const handleHeartClick = useCallback(
    (event, index, propertyId) => {
      if (token && userId) {
        event.stopPropagation();
        const updateHeartColors = [...properties];
        console.log(updateHeartColors);
        updateHeartColors[index].favorito_id =
          !updateHeartColors[index].favorito_id;
        setProperties(updateHeartColors);
        updateFavorites(
          propertyId,
          userId,
          updateHeartColors[index].favorito_id,
        );
      } else {
        event.stopPropagation();
        navigate("/Login");
      }

      //(PENDING) crear if/else si esta autenticado y el userId no es null para poder activar el favorito
    },
    [navigate, token, userId, properties],
  );

  console.log("Properties", properties);

  //update favorites on the backend and database
  const updateFavorites = async (propertyId, userId, isLiked) => {
    console.log("isLiked", isLiked);
    try {
      const response = await fetch(
        `http://localhost:2001/properties/favorites/${propertyId}/${userId}`, // Suponiendo que este sea el endpoint para marcar favorito
        {
          method: isLiked ? "POST" : "DELETE",
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
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(
        "CATCH ERROR: Error al marcar la propiedad como favorita",
        error,
      );
    }
  };

  // console.log("hearts", heart);

  return (
    <div className="">
      <div className="m-auto mb-20 flex h-auto w-full flex-col md:w-full">
        <div className="try grid h-auto grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {properties.map((info, index) => (
            <div
              onClick={() => redirect(info)}
              className="h-500  w-full   cursor-pointer flex-col    rounded-lg    shadow-md md:w-full  "
              key={index}
            >
              <div className="relative h-3/5 ">
                <div className="absolute left-0 top-0 bg-black p-2 text-white opacity-60">
                  {info.uso}
                </div>
                <div className="absolute right-0 top-0   text-white opacity-60">
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
                      {info.tipo.charAt(0).toUpperCase() + info.tipo.slice(1)}
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="m-auto ml-0 font-open-sans text-lg font-bold  md:text-lg lg:text-22 xl:text-22">
                      $ {info.precio.toLocaleString() + " "}{" "}
                      <span className="font-semibold text-gray-new">
                        {" "}
                        {info.currency}
                      </span>
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="m-auto ml-0 font-open-sans text-base font-normal text-gray-new md:text-lg lg:text-xl xl:text-xl">
                      {info.barrio}
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
                        className="m-auto ml-0 mr-1 h-5 w-5 "
                        src={house}
                        alt="Hi"
                      ></img>
                      <p className="m-auto ml-0 text-base md:text-sm lg:text-lg xl:text-xl">
                        {info.area.toLocaleString()}m²
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
});
export default Cards;
