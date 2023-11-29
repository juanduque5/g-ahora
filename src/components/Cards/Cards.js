import React from "react";
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

const Cards = ({ title, infoH, fill, vacation }) => {
  const navigate = useNavigate();
  const redirect = (info) => {
    // console.log("cards", info);
    fill(info);
    navigate("/Info");
  };
  return (
    <div className="ajusta">
      <div className="m-auto mb-20 flex h-auto w-full flex-col md:w-full">
        {title && (
          <div className="mb-16 flex h-10 justify-center ">
            {vacation ? (
              <p className="font-open-sans m-auto  text-center text-3xl font-semibold">
                Destinos populares
              </p>
            ) : (
              <p className="font-open-sans m-auto  text-center text-3xl font-semibold">
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

        <div className="try mb-16 flex h-auto w-full flex-col justify-between gap-10 sm:flex-row sm:flex-wrap  md:flex-row md:gap-7 lg:gap-10">
          {infoH.map((info, index) => (
            <div
              onClick={() => redirect(info)}
              className=" h-500 lg:w-30 xl:w-30 sm:w-76 flex w-auto cursor-pointer flex-col   flex-wrap rounded-lg shadow-md   md:w-full "
              key={index}
            >
              <div className="h-3/5  ">
                <img
                  className="m-auto h-full w-full rounded-t-lg"
                  src={info.url}
                  alt="Hi"
                ></img>
              </div>
              <div className="flex h-2/5 justify-center ">
                <div className="m-auto flex h-44  w-11/12 flex-col ">
                  <div className=" flex h-full ">
                    <p className="font-open-sans m-auto ml-0 text-lg font-bold md:text-lg lg:text-xl xl:text-xl">
                      {info.tipo}
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="font-open-sans  lg:text-22 xl:text-22 m-auto ml-0 text-lg font-bold md:text-lg">
                      $ {info.precio}
                    </p>
                  </div>
                  <div className=" flex h-full ">
                    <p className="font-open-sans text-gray-new m-auto ml-0 text-base font-normal md:text-lg lg:text-xl xl:text-xl">
                      {info.lugar}
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
                        {info.cuartos}
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
                        {info.parqueo}
                      </p>
                    </div>
                    <div className="flex w-2/5 ">
                      <img
                        className="m-auto ml-0 mr-2 h-5 w-5 "
                        src={house}
                        alt="Hi"
                      ></img>
                      <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                        {info.metros}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-new m-auto flex h-11 w-24 cursor-pointer rounded-lg">
          <p className="font-open-sans m-auto flex text-base text-white">
            Ver mas
          </p>
        </div>
      </div>
    </div>
  );
};
export default Cards;
