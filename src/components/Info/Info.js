import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./thumb";
import { PrevButton, NextButton } from "./arrows";
import "./embla.css";
import like from "../../images/like.png";
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

const Info = ({ info, infoH, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

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

  return (
    <div className="ajusta h-auto">
      <div className="mb-8 mt-8  h-auto ">
        <div className="h-95  flex flex-row  gap-14  ">
          <div className="flex flex-col gap-2 lg:w-8/12">
            <div className="mb-3 h-auto w-full ">
              <p className="font-open-sans text-center text-3xl font-bold md:text-left">
                Casa en alquiler <br className="flex md:hidden"></br>(Cartago,
                Valle del cauca)
              </p>
            </div>
            <div className="embla h-450  relative flex w-full ">
              <div className="embla__viewport  " ref={emblaRef}>
                <div className="embla__container  h-full w-auto">
                  {infoH.map((info, index) => (
                    <div className="embla__slide" key={index}>
                      <div className="embla__slide__number ">
                        <span className=" border border-gray-100 bg-white  md:border md:bg-gray-100 ">
                          {index + 1}
                        </span>
                      </div>
                      <img
                        className=" m-auto h-full w-full md:w-full"
                        src={info.url}
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
                    {infoH.map((info, index) => (
                      <Thumb
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        index={index}
                        imgSrc={info.url}
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
                <p className="text-blue-new text-base font-bold">EN VENTA</p>
              </div>
              <div className="flex w-3/5 justify-end ">
                <p className="text-lg font-bold sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
                  Q 1,400,000
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
                <p className="font-fira-sans cursor-pointer text-sm font-bold ">
                  LINK
                </p>
              </div>
              <div className="flex w-1/2 items-center justify-center  gap-3 rounded-xl border">
                <img
                  className="cursor-pointer"
                  src={like}
                  alt="Your alt text"
                />
                <p className="font-fira-sans cursor-pointer text-sm font-bold">
                  ME GUSTA
                </p>
              </div>
            </div>
            <div className="flex h-full w-full flex-col rounded-xl border ">
              <div className="h-1/2 ">
                <div className="flex h-1/4 ">
                  <p className="font-open-sans m-auto text-center font-medium">
                    Habla con un <span className="text-blue-new">agente </span>{" "}
                    para conocer más de esta propiedad.
                  </p>
                </div>
                <div className="flex h-1/2 ">
                  <div className="w-30  m-auto h-5/6  rounded-full ">
                    <img
                      className="h-full w-full rounded-full object-cover"
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
                    <p className="text-blue-new font-open-sans text-xl font-bold">
                      Yessenia Méndez
                    </p>
                  </div>
                  <div className=" flex h-1/2">
                    <p className="font-open-sans text-new m-auto text-center text-sm font-normal">
                      Miembro desde 2022
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex h-1/2 flex-col items-center  gap-2 ">
                <div className="h-90 flex w-11/12 flex-col gap-3 ">
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
                  <div className=" bg-blue-new mb-1 flex h-full w-full cursor-pointer rounded-xl">
                    <p className="font-fira-sans m-auto text-white">
                      CONTACTAR AGENTE
                    </p>
                  </div>
                </div>
                <div className=" flex w-11/12 gap-2 ">
                  <div className=" flex w-11/12 cursor-pointer items-center gap-2 ">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={call}
                      alt=""
                    />
                    <p className="text-lg font-normal">+1 415-726-9876</p>
                  </div>
                  <div className=" flex w-16 cursor-pointer justify-center ">
                    <img
                      className="h-11 w-9 items-center rounded-full object-cover"
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

      <div className="mb-10 flex h-auto w-full gap-14">
        <div className="flex h-1/2   w-full flex-col  xl:w-8/12">
          <div className=" h-auto w-full">
            <div className="flex h-auto w-full ">
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
                    <p className="text-new text-base md:text-lg">Cuartos: 5</p>
                  </div>
                </div>
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9 ">
                    <img src={car} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full">
                    <p className="text-new text-base md:text-lg">
                      Estacionamientos: 5
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
                    <p className="text-new text-base md:text-lg">Banos: 5</p>
                  </div>
                </div>
                <div className=" flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9  ">
                    <img src={house} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-new text-base md:text-lg">
                      Estado: usado
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
                    <p className="text-new text-base md:text-lg">
                      Terreno: 8.5 x 20 mts
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9  ">
                    <img src={house} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-new text-base md:text-lg">
                      construcion: 245mts
                    </p>
                  </div>
                </div>
              </div>
              <div className="m-auto flex h-12 w-full flex-row justify-center">
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-8  ">
                    <img src={location} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-new text-base md:text-lg">
                      Barrio: Alamos
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-1/2 flex-row items-center justify-center">
                  <div className="flex w-9  ">
                    <img src={house} alt="" className=" h-6 w-6 md:h-7" />
                  </div>
                  <div className="w-full ">
                    <p className="text-new text-base md:text-lg">
                      construcion: 245mts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-30 hidden  lg:flex"></div>
      </div>

      <div className="  mb-6 flex h-auto w-full flex-col  xl:w-8/12">
        <div className="h-auto w-full ">
          <p className="font-open-sans text-2xl  font-bold md:text-4xl">
            Descripcion
          </p>
        </div>
        <div className="m-auto  flex h-full w-full  md:m-0 xl:w-full ">
          <p className="font-open-sans text-new2 mt-2 text-base md:text-xl">
            Two bedroom apartment in the Hotel Riviera Atitlan. Overlooks one of
            the most beautiful lakes in the world. restaurant, grounds and
            swimming pool , spectacular view, lovely balcony. Is av ery quiet
            and private place. Just outside the bustle of town. Including
            deliveries for breakfast. spectacular view, lovely balcony. Is av
            ery quiet and private place. Just outside the bustle of town.
            Including deliveries for breakfast.
          </p>
        </div>

        <div className="mt-5 w-full border xl:w-full">
          <div>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={10}
              style={{ width: "100%", height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
