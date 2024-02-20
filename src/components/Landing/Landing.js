import { React, useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
import image5 from "../../images/image5.png";
import image6 from "../../images/image6.png";
import image7 from "../../images/image7.png";
// import car from "../../images/car.png";
// import house from "../../images/house.png";
// import bath from "../../images/bath.png";
import location2 from "../../images/location2.png";
import { Header } from "./header";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./thumb";
import { PrevButton, NextButton } from "./arrows";
import "./Landing.css";
import "./embla.css";

const Landing = ({ first, last, email, url, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [propertyData, setPropertyData] = useState([]);
  const [data, setData] = useState([
    image5,
    image6,
    image7,
    image5,
    image6,
    image7,
    image5,
    image6,
    image7,
    image5,
    image6,
    image7,
  ]);

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
    <div className="">
      <div className="mb-3">
        <Header />
      </div>

      <div className="ajusta ">
        <div
          className="flex h-96 flex-col  rounded-xl bg-slate-200"
          style={{
            backgroundImage: `url(${require("../../images/layer.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div className="relative inset-0 rounded-xl bg-black opacity-50"></div> */}
          <div className="m-auto flex h-auto w-3/5 flex-col border lg:h-70 ">
            <div className=" h-full w-full border">
              <p className="break-words text-center text-4xl font-bold text-white lg:text-5xl">
                Hermosa casa "Las palmeras"
              </p>
            </div>
            <div className="flex h-full  w-full items-center border">
              <p className="m-auto text-center text-2xl text-white lg:text-3xl">
                Ubicada en la zona mas exclusiva y con mayor cotizacion
              </p>
            </div>
            <div className="flex h-full w-full flex-row items-center justify-center border">
              <img className="  text-center" src={location2} alt=""></img>
              <p className="  text-lg font-semibold text-white lg:text-lg">
                Antigua guatemala
              </p>
            </div>
            <div className="flex h-full w-full border">
              <button className="rounde m-auto h-11 w-40 rounded-lg bg-orange-dark text-center md:h-12 md:w-44">
                <p className="text-white">Contactar agente</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="elbackg mt-10 flex h-60 w-full justify-center">
        <div className="ajusta m-auto flex h-77 flex-col border">
          <div className="flex h-14 items-center justify-center border">
            <p className="text-xl font-bold">Descripcion</p>
          </div>
          <div className="h-full w-full break-words border ">
            <p className="">
              hermosa cada al lado de un lugar maravilloso que es palmas del
              mar, tiene muchas cosas cercas alrededor de la cual podras
              disfrutar,
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-380 border">
        <div className="ajusta m-auto flex h-77  border">
          <div className="w-1/2 rounded-xl border">
            <img className="h-full w-full rounded-xl" src={image7} alt=""></img>
          </div>
          <div className="flex w-1/2 border">
            <div className="m-auto flex h-full w-90 flex-col border">
              <div className="h-full border">
                <p className="text-xl font-bold">Detalles de la propiedad</p>
              </div>
              <div className="flex h-full items-center border">
                <p>Detalles de la propiedad</p>
              </div>
              <div className="flex h-full items-center border">
                <p>Detalles de la propiedad</p>
              </div>
              <div className="flex h-full items-center border">
                <p>Detalles de la propiedad</p>
              </div>
              <div className="flex h-full items-center border">
                <p>Detalles de la propiedad</p>
              </div>
              <div className="flex h-full items-center border">
                <p>Detalles de la propiedad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="elbackg flex flex-col pb-7">
        <div className="ajusta flex h-16 items-center justify-center border">
          <p className="text-xl font-bold">Galeria de fotos</p>
        </div>
        <div className="embla ajusta relative  m-auto flex  h-450 w-full border ">
          <div className="embla__viewport w-full " ref={emblaRef}>
            <div className="embla__container  h-full w-auto">
              {data.map((info, index) => (
                <div className="embla__slide " key={index}>
                  <div className="embla__slide__number ">
                    <span className=" border border-gray-100 bg-white  md:border md:bg-gray-100 ">
                      {index + 1}
                    </span>
                  </div>
                  <img
                    className="m-auto h-full  w-full border "
                    src={info}
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
        <div className=" ajusta m-auto flex h-auto w-full  flex-row ">
          <div className="embla-thumbs w-full  border">
            <div className="embla-thumbs__viewport " ref={emblaThumbsRef}>
              <div className="embla-thumbs__container">
                {data.map((info, index) => (
                  <Thumb
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imgSrc={info}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 h-90 w-full  pb-5 xl:w-full">
        <div className="ajusta flex h-full w-full flex-row   ">
          <div className=" h-auto w-full ">
            <div className="flex h-11  w-full ">
              <p className="m-auto text-xl font-bold">Contact</p>
            </div>
            <div>
              <p className="font-semibold">Name:</p>
            </div>

            <div className="flex  w-full gap-2 ">
              <div className="h-9 w-full rounded-sm border">
                <input
                  className=" h-full w-full"
                  type="text"
                  placeholder="First name"
                ></input>
              </div>
              <div className="h-9 w-full rounded-sm border">
                <input
                  className=" h-full w-full"
                  type="text"
                  placeholder="Last name"
                ></input>
              </div>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
            </div>
            <div className="flex  w-full ">
              <div className="h-9 w-full border">
                <input className="h-full w-full" type="email"></input>
              </div>
            </div>
            <div>
              <p className="font-semibold">Message:</p>
            </div>
            <div className="mb-2 mt-1 h-2/5 w-full ">
              <textarea
                className="focus:shadow-outline h-full  w-full border"
                // class="focus:shadow-outline  h-full w-full rounded-md border  leading-tight text-gray-700 focus:outline-none"
                placeholder="Escribe aquí"
              ></textarea>
            </div>
            <div className="flex h-auto w-full items-center justify-center ">
              <button className="h-9 w-32 rounded-lg border bg-gray-300">
                Submit
              </button>
            </div>
          </div>
          <div className="flex w-full">
            <div className="ml-auto w-90">
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
    </div>
  );
};
export default Landing;
