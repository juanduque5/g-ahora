import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Thumb } from "./thumb";
import { PrevButton, NextButton } from "./arrows";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import "./embla.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import share from "../../images/share.png";
import mujer from "../../images/mujer.jpg";
import green from "../../images/green.png";
import whatsapp from "../../images/whatsapp.png";
import call from "../../images/call.png";
import car from "../../images/car.png";
import house from "../../images/house.png";
import bath from "../../images/bath.png";
import bed from "../../images/bed.png";
import location2 from "../../images/location.png";
import language from "./language";
import { useSelector } from "react-redux"; //  las funciones useSelector y useDispatch

const Info = ({ options, isAuth }) => {
  const navigate = useNavigate();
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const location = useLocation();
  const date = location.state;
  const today = dayjs();
  const fechaInicio = dayjs(date.checkIn.$d);
  // const fechaInicio = new Date(date.checkInDate);
  const fechaFin = dayjs(date.checkOut.$d);
  const userId = localStorage.getItem("userId");

  const [checkInDate, setCheckInDate] = useState(fechaInicio);
  const [checkOutDate, setCheckOutDate] = useState(fechaFin);
  const [diferenciaDias, setDiferenciaDias] = useState(0);

  // Convierte la diferencia de milisegundos a días

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  useEffect(() => {
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // 1 día en milisegundos
    const nuevaDiferenciaMilisegundos = checkOutDate - checkInDate;
    const nuevaDiferenciaDias = Math.floor(
      nuevaDiferenciaMilisegundos / milisegundosPorDia,
    );
    setDiferenciaDias(nuevaDiferenciaDias);
  }, [checkInDate, checkOutDate]);

  console.log("fechas", fechaInicio, fechaFin, diferenciaDias);

  const {
    connect,
    Habitaciones,
    Estacionamientos,
    Banos,
    Condicion,
    Area,
    Ubicacion,
    Details,
    Description,
    Enlace,

    copy,
  } = language[storedLanguage];

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState(null);
  const [pay, setPay] = useState(false);
  const [buttonText, setButtonText] = useState("Empezar");

  const apiKey = process.env.REACT_APP_API_KEY;
  const mapId = process.env.REACT_APP_MAP_ID;
  const [open, setIsOpen] = useState(false);
  const [number, setNumber] = useState(false);
  const [wpp, setWpp] = useState(false);
  const [copied, setCopied] = useState(false); // Estado para indicar si se ha copiado
  const linkRef = useRef(null); // Referencia al elemento de texto
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

  const total = propertyData.precio * diferenciaDias;
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
          `http://localhost:2001/properties/vacationsInfoById/${id}`,
        );
        if (!response.ok) {
          console.log(
            "NOT RESPONSE OK: Error al obtener datos de la propiedad",
          );
        }
        const data = await response.json();
        console.log("data", data.data);
        console.log("social", data.social[0].whatsapp);

        const prevHeartClick = data.data[0][0].Favorite_id ? true : false;

        // Actualiza el estado del corazón con el nuevo valor
        setHeartClick(prevHeartClick);
        setWpp(data.social[0].whatsapp);
        setNumber(data.social[0].phone);
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

  // const handleHeartClick = () => {
  //   if (isAuth && userId) {
  //     setHeartClick(!heartClick);
  //     updateFavorites(heartClick, userId, id);
  //   } else {
  //     navigate("/Login");
  //   }
  // };

  // const updateFavorites = async (isLiked, userId, propertyId) => {
  //   console.log("isLiked", isLiked);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:2001/properties/favorites/${propertyId}/${userId}`, // Suponiendo que este sea el endpoint para marcar favorito
  //       {
  //         method: isLiked ? "DELETE" : "POST",
  //         headers: {
  //           "Content-Type": "application/json", // Especificar el tipo de contenido si envías datos en formato JSON
  //         },
  //       },
  //     );
  //     if (!response.ok) {
  //       console.log(
  //         "NOT RESPONSE OK: Error al marcar la propiedad como favorita",
  //       );
  //     } else {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "CATCH ERROR: Error al marcar la propiedad como favorita",
  //       error,
  //     );
  //   }
  // };

  const copyToClipboard = () => {
    const url = window.location.href;

    // Intenta copiar al portapapeles usando la API moderna
    navigator.clipboard
      .writeText(url)
      .then(() => {
        // Si la copia es exitosa, actualiza el estado para indicar que se ha copiado
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 800);
      })
      .catch((error) => {
        // Si hay un error al copiar, manejarlo aquí
        console.error("Error al copiar al portapapeles:", error);
      });
  };
  ///

  console.log(data);
  console.log("PropertyData", propertyData.area);
  console.log("heart", heartClick);
  // console.log(coordinates.coordinates);
  // console.log("dates", fecha);

  //
  const payment = () => {
    setIsLoading(true);
    setButtonText("Cargando..");

    if (!userId) {
      // Si userId no está presente, navegar al componente /Login
      navigate("/Login");
      return; // Salir de la función para evitar que continúe ejecutando el código
    }

    fetch(`http://localhost:2001/payments/ordervacation/${id}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total: total }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al procesar el pago");
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then((data) => {
        console.log("Pago procesado exitosamente:", data);
        //  setPaymentResult(data); // Guardar los datos de la respuesta en el estado
        setLink(data.checkoutUrl);
        setButtonText("Pagar");
        console.log(data.checkoutUrl);
        setPay(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="ajusta flex h-auto  ">
      {skeleton ? (
        <>
          <div className="mb-8 mt-8 flex h-auto  flex-col  lg:w-8/12">
            <div className="flex  h-95  flex-row  gap-14 ">
              <div className="flex flex-col gap-2 lg:w-full">
                <div className="mb-3 h-9  w-full animate-pulse bg-gray-300 ">
                  <p className="text-center font-open-sans text-3xl font-bold md:text-left"></p>
                </div>
                <div className="embla relative flex h-450  w-full animate-pulse bg-gray-300 "></div>

                <div className=" m-auto flex h-auto w-full  flex-row">
                  <div className="embla-thumbs  w-full">
                    <div
                      className="embla-thumbs__viewport"
                      ref={emblaThumbsRef}
                    >
                      <div className="embla-thumbs__container h-32 animate-pulse bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10 mt-5 h-auto w-full ">
              <div className=" h-auto w-full animate-pulse bg-gray-300 ">
                <div className="flex h-full w-full items-center ">
                  <div className=" mb-5 flex h-full w-full ">
                    <p className="font-open-sans  text-2xl font-bold  md:text-4xl"></p>
                  </div>
                </div>
                <div className="  flex h-auto w-full flex-col ">
                  <div className=" flex h-12 w-full flex-row ">
                    <div className="flex h-12 w-1/2 flex-row items-center  justify-center ">
                      <div className="flex w-9  "></div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg"></p>
                      </div>
                    </div>
                    <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-9 "></div>
                      <div className="w-full">
                        <p className="text-base text-new md:text-lg"></p>
                      </div>
                    </div>
                  </div>
                  <div className="m-auto flex h-12 w-full flex-row justify-center">
                    <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-9 "></div>
                      <div className="w-full">
                        <p className="text-base text-new md:text-lg"></p>
                      </div>
                    </div>
                    <div className=" flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-9  "></div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg"></p>
                      </div>
                    </div>
                  </div>
                  <div className="m-auto flex h-12 w-full flex-row justify-center">
                    <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-8  "></div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg"></p>
                      </div>
                    </div>
                    <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-9  "></div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden w-30  lg:flex"></div>
            </div>

            <div className="  flex h-auto w-full animate-pulse  flex-col bg-gray-300 xl:w-full">
              <div className="mb-6 h-auto w-full">
                <p className="font-open-sans text-2xl  font-bold md:text-4xl"></p>
              </div>
              <div className="m-auto   flex h-full w-full md:m-0 xl:w-full ">
                <p className="mt-2 font-open-sans text-base text-new2 md:text-xl"></p>
              </div>

              <div className="mb-8 mt-12 h-380 w-full  xl:w-full">
                <div></div>
              </div>
            </div>
          </div>
          <div className="mt-8 h-auto w-1/3 ">
            <aside className="sticky top-0 m-auto hidden h-auto w-90 gap-4 lg:flex lg:flex-col">
              <div className="flex h-auto w-full animate-pulse flex-row bg-gray-300">
                <div className="flex h-9 w-2/5 items-center "></div>
                <div className="flex h-9 w-3/5 animate-pulse justify-end bg-gray-300"></div>
              </div>
              <div className="flex h-14 w-full animate-pulse flex-row gap-5 bg-gray-300 ">
                <div className="flex  w-1/2 items-center justify-center gap-3 rounded-xl  "></div>
                <div className="flex w-1/2 items-center justify-center  gap-3 rounded-xl "></div>
              </div>

              <div className="h-550 w-full flex-col items-start rounded-xl  ">
                <div className=" h-full w-full animate-pulse flex-col rounded-xl bg-gray-300  ">
                  <div className="flex h-1/2 flex-col ">
                    <div className="flex h-full "></div>
                    <div className="flex h-full ">
                      <div className="m-auto  h-28 w-auto rounded-full"></div>
                    </div>
                    <div className="h-full">
                      <div className="flex h-1/2 items-center justify-center  "></div>
                      <div className=" flex h-1/2"></div>
                    </div>
                  </div>
                  <div className="flex h-1/2 flex-col items-center  gap-2 ">
                    <div className="flex h-90 w-11/12 flex-col gap-3 ">
                      <div className=" mt-2 h-full w-full rounded-xl "></div>
                      <div className=" h-full w-full rounded-xl "></div>
                      <div className="h-full w-full rounded-xl "></div>
                      <div className=" mb-1 flex h-full w-full cursor-pointer rounded-xl "></div>
                    </div>
                    <div className="  flex w-full ">
                      <div className="relative h-full w-1/2 ">
                        <div className=" flex h-full w-full cursor-pointer gap-2 "></div>
                      </div>
                      <div className=" flex w-1/2 cursor-pointer  ">
                        <div className="flex h-9 w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </>
      ) : (
        <>
          <div className="mb-8 mt-8 flex h-auto  flex-col  lg:w-8/12">
            <div className="flex  h-95 flex-row  gap-14  ">
              <div className="flex flex-col gap-2 lg:w-full">
                <div className="mb-3 h-auto w-full ">
                  <p className="text-center font-open-sans text-3xl font-bold md:text-left">
                    {propertyData.tipo === "Casa" && storedLanguage === "ES"
                      ? "Casa"
                      : propertyData.tipo === "Apartamento" &&
                          storedLanguage === "ES"
                        ? "Apartamento"
                        : propertyData.tipo === "Lote" &&
                            storedLanguage === "ES"
                          ? "Lote"
                          : propertyData.tipo === "Local" &&
                              storedLanguage === "ES"
                            ? "Local"
                            : propertyData.tipo === "Casa" &&
                                storedLanguage === "EN"
                              ? "House"
                              : propertyData.tipo === "Apartamento" &&
                                  storedLanguage === "EN"
                                ? "Apartment"
                                : propertyData.tipo === "Lote" &&
                                    storedLanguage === "EN"
                                  ? "Land lot"
                                  : propertyData.tipo === "Local" &&
                                      storedLanguage === "EN"
                                    ? "Premises"
                                    : ""}{" "}
                    {connect + " "}{" "}
                    {propertyData.uso === "Venta" && storedLanguage === "ES"
                      ? "Venta"
                      : propertyData.uso === "Renta" && storedLanguage === "ES"
                        ? "Renta"
                        : propertyData.uso === "Venta" &&
                            storedLanguage === "EN"
                          ? "Sell"
                          : propertyData.uso === "Renta" &&
                              storedLanguage === "EN"
                            ? "Rent"
                            : ""}{" "}
                    <br className="flex md:hidden"></br>(
                    {propertyData.municipio})
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
                    <PrevButton
                      onClick={scrollPrev}
                      disabled={prevBtnDisabled}
                    />
                    <NextButton
                      onClick={scrollNext}
                      disabled={nextBtnDisabled}
                    />
                  </div>
                </div>

                <div className=" m-auto flex h-auto w-full  flex-row">
                  <div className="embla-thumbs  w-full">
                    <div
                      className="embla-thumbs__viewport"
                      ref={emblaThumbsRef}
                    >
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
            </div>

            <div className="mb-10 mt-5 h-auto w-full ">
              <div className="h-auto w-full">
                <div className="flex h-full w-full items-center ">
                  <div className=" mb-5 flex h-full w-full ">
                    <p className="font-open-sans  text-2xl font-bold  md:text-4xl">
                      {Details}
                    </p>
                  </div>
                </div>
                <div className="  flex h-auto w-full flex-col ">
                  <div className=" flex h-12 w-full flex-row ">
                    <div className="flex h-12 w-1/2 flex-row items-center  justify-center ">
                      <div className="flex w-9  ">
                        <img src={bed} alt="" className=" h-6 w-6 md:h-7" />
                      </div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg">
                          {Habitaciones}:{" "}
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
                          {Estacionamientos}:{" "}
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
                          {Banos}:{" "}
                          <span className="text-black">
                            {propertyData.banos}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-9  ">
                        <img src={house} alt="" className=" h-6 w-6 md:h-7" />
                      </div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg">
                          {Condicion}:{" "}
                          <span className="text-black">
                            {propertyData.estado}
                          </span>
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
                          {Area}:{" "}
                          <span className="text-black">
                            {propertyData.area}m²
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                      <div className="flex w-9  ">
                        <img
                          src={location2}
                          alt=""
                          className=" h-6 w-6 md:h-7"
                        />
                      </div>
                      <div className="w-full ">
                        <p className="text-base text-new md:text-lg">
                          {Ubicacion}:{" "}
                          <span className="text-black">
                            {propertyData.direccion}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden w-30  lg:flex"></div>
            </div>

            <div className="  flex h-auto w-full flex-col  xl:w-full">
              <div className="mb-6 h-auto w-full">
                <p className="font-open-sans text-2xl  font-bold md:text-4xl">
                  {Description}
                </p>
              </div>
              <div className="m-auto   flex h-full w-full md:m-0 xl:w-full ">
                <p className="mt-2 font-open-sans text-base text-new2 md:text-xl">
                  {propertyData.description}
                </p>
              </div>

              <div className="mb-8 mt-12 w-full border xl:w-full">
                <div>
                  <APIProvider apiKey={apiKey}>
                    <div
                      style={{ height: "400px", width: "100%", margin: "auto" }}
                    >
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
          <div className="mt-8 h-auto w-1/3 ">
            <aside className=" sticky top-0 m-auto hidden h-auto w-90 gap-4  lg:flex lg:flex-col">
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
                <div className="flex  w-full items-center justify-center gap-3 rounded-xl border shadow-md">
                  <img
                    className="cursor-pointer"
                    src={share}
                    alt="Your alt text"
                    onClick={copyToClipboard}
                  />
                  <p
                    ref={linkRef}
                    className="cursor-pointer font-fira-sans text-sm font-bold "
                  >
                    {Enlace}
                  </p>
                  <div className={`${copied ? "block" : "hidden"}`}>
                    <p className="text-md font-semibold text-slate-400">
                      {copy}
                    </p>
                  </div>
                </div>
                {/* <div className="flex w-1/2 items-center justify-center  gap-3 rounded-xl border shadow-md">
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
                    {mark}
                  </p>
                </div> */}
              </div>

              <div className="h-550 w-full flex-col items-start rounded-xl  shadow-md">
                <div className=" h-full w-full flex-col rounded-xl  shadow-md">
                  <div className="flex h-1/2 flex-col gap-2">
                    <div className="flex h-1/2 gap-2 ">
                      <div className="h-1/2 w-full  ">
                        <div className=" m-auto flex h-full w-full  cursor-pointer truncate  bg-white ">
                          <DatePicker
                            label="Check-in"
                            value={
                              checkInDate < checkOutDate
                                ? checkInDate
                                : checkInDate
                            }
                            onChange={handleCheckInDateChange}
                            minDate={today}
                            sx={{
                              "& .MuiInputLabel-root": { color: "gray" },
                              margin: "auto",
                              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid black",
                                },
                              background: "white", // Setting background color to white
                            }}
                          />
                        </div>
                      </div>
                      <div className="h-1/2 w-full ">
                        <div className=" flex h-full w-full cursor-pointer truncate border-r bg-white">
                          <DatePicker
                            label="Check-out"
                            disabled={checkInDate ? false : true}
                            value={
                              checkOutDate > checkInDate ? checkOutDate : null
                            }
                            onChange={handleCheckOutDateChange}
                            minDate={checkInDate ? checkInDate : today}
                            sx={{
                              "& .MuiInputLabel-root": { color: "gray" },
                              margin: "auto",
                              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid black",
                                },
                              background: "white", // Setting background color to white
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex h-1/2 w-full flex-col">
                      <div className="flex w-full ">
                        <p className="m-auto text-lg font-semibold">Guests</p>
                      </div>
                      <div className="w-border flex h-full">
                        {/* <div className="flex w-1/4">
                          <p className="m-auto flex h-11 w-11 items-center justify-center rounded-3xl border text-3xl">
                            -
                          </p>
                        </div> */}
                        <div className="m-auto  w-1/4 ">
                          <p className="flex justify-center text-xl font-semibold">
                            {propertyData.habitaciones}
                          </p>
                        </div>
                        {/* <div className="flex w-1/4 ">
                          <p className="m-auto flex h-11 w-11 items-center justify-center rounded-3xl border text-3xl">
                            +
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex h-1/2 flex-col items-center  gap-2 ">
                    <div className="flex h-90 w-11/12 flex-col gap-5 ">
                      <div className=" mt-2 h-auto w-full rounded-xl border-b">
                        <p>
                          Price per night:{" "}
                          {propertyData.precio !== undefined
                            ? propertyData.precio.toLocaleString() + " "
                            : ""}
                        </p>
                      </div>
                      <div className=" h-auto w-full rounded-xl border-b">
                        <p>
                          {" "}
                          Stay nights: {diferenciaDias}
                          <span className="relative left-5 m-auto font-semibold">
                            {" "}
                            {/* {fechaInicio} - {fechaFin} */}
                          </span>
                        </p>
                      </div>
                      <div className="h-auto w-full rounded-xl border-b">
                        <p>Total: {total.toLocaleString()} </p>
                      </div>
                      <div className=" mb-1 flex h-1/4 w-full cursor-pointer rounded-xl bg-blue-new">
                        {pay ? (
                          <button className="m-auto h-11 w-36 rounded-lg bg-blue-new font-fira-sans text-lg font-medium text-white">
                            <a href={link}>{buttonText}</a>
                          </button>
                        ) : (
                          <button
                            onClick={payment}
                            type="button"
                            className="m-auto flex h-11 w-36 items-center rounded-lg bg-blue-new px-4 py-2 text-white"
                          >
                            <svg
                              className={
                                isLoading
                                  ? "mr-3 h-5 w-5 animate-spin text-white"
                                  : "hidden"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className={isLoading ? " opacity-25" : "hidden"}
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className={isLoading ? " opacity-75" : "hidden"}
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>

                            <p
                              className={`m-auto ${isLoading ? "w-16" : "w-auto"} font-medium`}
                            >
                              <a className="" href={link}>
                                {buttonText}
                              </a>
                            </p>
                          </button>
                        )}
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
                                {number}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className=" flex w-1/2 cursor-pointer  ">
                        <div className="flex w-full">
                          <a className="m-auto" href={true}>
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
            </aside>
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
