import React from "react";
import logo from "../../images/PROPIEADES_AHORAWEB-02.png";
import { Link } from "react-router-dom";
import instagram from "../../images/instagramColor.png";
import facebook from "../../images/facebookColor.png";
import x from "../../images/twitterColor.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footie0 flex h-auto w-full md:h-450 ">
      <div className=" ajusta m-auto flex h-auto flex-row  md:h-350 md:flex-col  ">
        <div className=" flex h-full w-full flex-col gap-3   md:h-1/2 md:flex-row md:gap-8">
          <div className="order-1  w-full  md:order-1">
            <div className="flex w-full flex-col  md:w-1/2  md:justify-start">
              <p className="m-auto flex h-15   font-open-sans   text-lg font-bold  md:m-0 md:justify-center">
                Herramientas:
              </p>
              <p className="m-auto flex h-15 font-open-sans text-lg  font-normal  hover:text-blue-new md:m-0 md:justify-center">
                <Link to="/">Propiedades</Link>
              </p>
              <p className="m-auto flex h-15 items-center font-open-sans text-lg font-normal hover:text-blue-new md:m-0 md:justify-center">
                <Link to="/">Precio</Link>
              </p>

              <p className="m-auto flex h-15 items-center font-open-sans text-lg font-normal  hover:text-blue-new md:m-0 md:justify-center">
                <Link to="/">Vacaciones</Link>
              </p>
            </div>
          </div>
          <div className="order-3 w-full md:order-2 ">
            <div className="flex w-full flex-col justify-center   md:m-auto md:w-3/4">
              <p className="m-auto flex h-15 font-open-sans    text-lg font-bold">
                Siguenos en:
              </p>
              <div className="m-auto flex h-auto md:w-1/2  ">
                <div className=" w-full">
                  <img
                    className="m-auto cursor-pointer"
                    src={instagram}
                    alt=""
                  ></img>
                </div>
                <div className="w-full   ">
                  <img
                    className="m-auto  cursor-pointer"
                    src={facebook}
                    alt=""
                  ></img>
                </div>
                <div className="w-full  ">
                  <img className="m-auto  cursor-pointer" src={x} alt=""></img>
                </div>
              </div>
              <div className=" flex flex-col text-lg font-bold">
                <p className="m-auto">Contactanos:</p>
                <div className="flex w-full text-gray-500 underline">
                  <a
                    className="m-auto w-auto"
                    href="mailto:juanduque525@gmail.com"
                  >
                    juanduque525@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="order-2 mb-4 flex w-full justify-center md:order-3 md:justify-end  ">
            <div className="flex w-auto flex-col gap-1   md:w-2/5">
              <p className="m-auto flex h-15 justify-center  font-open-sans text-lg  font-bold  md:m-0">
                Empieza:
              </p>
              <p className="m-auto flex h-15 cursor-pointer justify-center font-open-sans  text-lg font-normal hover:text-blue-new md:m-0">
                Login
              </p>
              <p className="m-auto flex h-15 cursor-pointer justify-center  font-open-sans text-lg font-normal hover:text-blue-new md:m-0">
                Register
              </p>
              <p className="m-auto flex h-15 cursor-pointer justify-center  font-open-sans  text-lg font-normal hover:text-blue-new md:m-0">
                Publicar
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full  md:flex md:h-1/2 md:items-center md:justify-center ">
          <div className="m-auto flex h-auto w-full ">
            <div className="m-auto h-full cursor-pointer ">
              <img className="h-24" src={logo} alt="Applestore"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
