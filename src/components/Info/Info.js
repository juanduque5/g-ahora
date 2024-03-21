import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./thumb";
import { PrevButton, NextButton } from "./arrows";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import "./embla.css";

import share from "../../images/share.png";
import mujer from "../../images/mujer.jpg";
import green from "../../images/green.png";
import whatsapp from "../../images/whatsapp.png";
import call from "../../images/call.png";
import car from "../../images/car.png";
import house from "../../images/house.png";
import bath from "../../images/bath.png";
import bed from "../../images/bed.png";
import location from "../../images/location.png";

const Info = ({ options, userId, isAuth }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;
  const mapId = process.env.REACT_APP_MAP_ID;
  const [open, setIsOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [heartClick, setHeartClick] = useState(false);
  // const [properties, setProperties] = useState([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [propertyData, setPropertyData] = useState([]);
  const [data, setData] = useState([]);
  const [coordinates, setCoordinates] = useState({
    coordinates: { lat: 14.6349, lng: -90.5069 },
  });
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi],
  );

  const onResize = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedIndex(0);
    emblaApi.scrollTo(0);
    emblaThumbsApi.scrollTo(0);
  }, [emblaApi, emblaThumbsApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("resize", onResize);
  }, [emblaApi, onSelect, onResize]);

  useEffect(() => {
    // Lógica para llamar al backend y obtener la información basada en el ID
    // Puedes utilizar una función asíncrona y gestionar el estado local para la información
    // Ejemplo:
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:2001/properties/infoById/${id}`,
        );
        if (!response.ok) {
          console.log(
            "NOT RESPONSE OK: Error al obtener datos de la propiedad",
          );
        }
        const data = await response.json();
        // console.log("data", data.data);
        const prevHeartClick = data.data[0][0].Favorite_id ? true : false;

        // Actualiza el estado del corazón con el nuevo valor
        setHeartClick(prevHeartClick);
        setPropertyData(data.data[0][0]);
        setData(data.data);
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          coordinates: {
            lat: parseFloat(data.data[0][0].latitud),
            lng: parseFloat(data.data[0][0].longitud),
          },
        }));
        // Guardar la información en el estado local o hacer lo que sea necesario
      } catch (error) {
        console.error(
          "CATCH ERROR: Error al obtener datos de la propiedad",
          error,
        );
      }
    };

    fetchData();
  }, [id]);

  const handleHeartClick = () => {
    if (isAuth && userId) {
      setHeartClick(!heartClick);
      updateFavorites(heartClick, userId, id);
    } else {
      navigate("/Login");
    }
  };

  const updateFavorites = async (isLiked, userId, propertyId) => {
    console.log("isLiked", isLiked);
    try {
      const response = await fetch(
        `http://localhost:2001/properties/favorites/${propertyId}/${userId}`, // Suponiendo que este sea el endpoint para marcar favorito
        {
          method: isLiked ? "DELETE" : "POST",
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

  console.log(data);
  console.log("PropertyData", propertyData.area);
  console.log("heart", heartClick);
  // console.log(coordinates.coordinates);
  return (
    <div className="ajusta h-auto">
      <div className="mb-8 mt-8  h-auto ">
        <div className="flex  h-95 flex-row  gap-14  ">
          <div className="flex flex-col gap-2 lg:w-8/12">
            <div className="mb-3 h-auto w-full ">
              <p className="text-center font-open-sans text-3xl font-bold md:text-left">
                Casa en {propertyData.uso} <br className="flex md:hidden"></br>(
                {propertyData.barrio})
              </p>
            </div>
            <div className="embla relative  flex h-450 w-full ">
              <div className="embla__viewport  " ref={emblaRef}>
                <div className="embla__container  h-full w-auto">
                  {data.map((info, index) => (
                    <div className="embla__slide" key={index}>
                      <div className="embla__slide__number ">
                        <span className=" border border-gray-100 bg-white  md:border md:bg-gray-100 ">
                          {index + 1}
                        </span>
                      </div>
                      <img
                        className=" m-auto h-full w-full md:w-full"
                        src={info.imageUrl}
                        alt="Your alt text"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="embla__buttons ">
                <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
              </div>
            </div>

            <div className=" m-auto flex h-auto w-full  flex-row ">
              <div className="embla-thumbs  ">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                  <div className="embla-thumbs__container">
                    {data.map((info, index) => (
                      <Thumb
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        index={index}
                        imgSrc={info.imageUrl}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden w-1/4 gap-4   lg:flex lg:flex-col">
            <div className=" flex h-auto w-full flex-row">
              <div className="flex w-2/5 items-center ">
                <p className="f text-2xl font-bold text-blue-new">
                  {propertyData.currency}
                </p>
              </div>
              <div className="flex w-3/5 justify-end ">
                <p className="text-lg font-bold sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                  $
                  {propertyData.precio !== undefined
                    ? propertyData.precio.toLocaleString() + " "
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex h-14 w-full flex-row gap-5 ">
              <div className="flex w-1/2 items-center justify-center gap-3 rounded-xl border">
                <img
                  className="cursor-pointer"
                  src={share}
                  alt="Your alt text"
                />
                <p className="cursor-pointer font-fira-sans text-sm font-bold ">
                  LINK
                </p>
              </div>
              <div className="flex w-1/2 items-center justify-center  gap-3 rounded-xl border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-6 w-6 cursor-pointer ${heartClick && isAuth ? "fill-red-600 text-gray-100" : ""}`}
                  onClick={handleHeartClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>

                <p className="cursor-pointer font-fira-sans text-sm font-bold">
                  ME GUSTA
                </p>
              </div>
            </div>
            <div className="flex h-full w-full flex-col rounded-xl border ">
              <div className="h-1/2 ">
                <div className="flex h-1/4 ">
                  <p className="m-auto text-center font-open-sans font-medium">
                    Habla con un <span className="text-blue-new">agente </span>{" "}
                    para conocer más de esta propiedad.
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
                      className="h-full w-full rounded-xl"
                      type="text"
                      placeholder="Nombre completo"
                    ></input>
                  </div>
                  <div className=" h-full w-full rounded-xl border">
                    <input
                      className="h-full w-full rounded-xl"
                      type="text"
                      placeholder="Correo electronico"
                    ></input>
                  </div>
                  <div className="h-full w-full rounded-xl border">
                    <input
                      className="h-full w-full rounded-xl"
                      type="text"
                      placeholder="Numero telefonico"
                    ></input>
                  </div>
                  <div className=" mb-1 flex h-full w-full cursor-pointer rounded-xl bg-blue-new">
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
                          <p className="text-center text-lg text-black">
                            415-712-8195
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex w-1/2 cursor-pointer  ">
                    <div className="flex w-full ">
                      <img
                        className="m-auto h-11 w-9 rounded-full object-cover"
                        src={whatsapp}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 flex h-auto w-full gap-14">
        <div className="flex h-1/2   w-full flex-col  xl:w-8/12">
          <div className=" h-auto w-full">
            <div className="mb-6 flex h-auto w-full">
              <p className="font-open-sans  text-2xl font-bold  md:text-4xl">
                Especificaciones
              </p>
            </div>
            <div className="m-auto  flex h-auto w-full flex-col">
              <div className="m-auto flex h-12 w-full flex-row ">
                <div className="flex h-12 w-1/2 flex-row items-center  justify-center ">
                  <div className="flex w-9  ">
                    <img src={bed} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-base text-new md:text-lg">
                      Habitaciones:{" "}
                      <span className="text-black">
                        {propertyData.habitaciones}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9 ">
                    <img src={car} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full">
                    <p className="text-base text-new md:text-lg">
                      Estacionamientos:{" "}
                      <span className="text-black">
                        {propertyData.estacionamientos}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="m-auto flex h-12 w-full flex-row justify-center">
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9 ">
                    <img src={bath} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full">
                    <p className="text-base text-new md:text-lg">
                      Banos:{" "}
                      <span className="text-black">{propertyData.banos}</span>
                    </p>
                  </div>
                </div>
                <div className=" flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9  ">
                    <img src={house} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-base text-new md:text-lg">
                      Condicion:{" "}
                      <span className="text-black">{propertyData.estado}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="m-auto flex h-12 w-full flex-row justify-center">
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-8  ">
                    <img src={house} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-base text-new md:text-lg">
                      Area de construccion:{" "}
                      <span className="text-black">{propertyData.area}m²</span>
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9  ">
                    <img src={location} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-base text-new md:text-lg">
                      Ubicación:{" "}
                      <span className="text-black">{propertyData.barrio}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-30  lg:flex"></div>
      </div>

      <div className="  flex h-auto w-full flex-col  xl:w-8/12">
        <div className="mb-6 h-auto w-full">
          <p className="font-open-sans text-2xl  font-bold md:text-4xl">
            Descripcion
          </p>
        </div>
        <div className="m-auto   flex h-full w-full md:m-0 xl:w-full ">
          <p className="mt-2 font-open-sans text-base text-new2 md:text-xl">
            {propertyData.description}
          </p>
        </div>

        <div className="mt-12 w-full border xl:w-full">
          <div>
            <APIProvider apiKey={apiKey}>
              <div style={{ height: "400px", width: "100%", margin: "auto" }}>
                <Map
                  defaultZoom={13} // Aquí cambiamos zoom a defaultZoom
                  center={coordinates.coordinates}
                  mapId={mapId}
                  de
                >
                  <AdvancedMarker
                    onClick={() => setIsOpen(true)}
                    position={coordinates.coordinates}
                    defalt
                  ></AdvancedMarker>
                  {open && (
                    <InfoWindow
                      position={coordinates}
                      onCloseClick={() => setIsOpen(false)}
                    >
                      {propertyData.direccion}
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
