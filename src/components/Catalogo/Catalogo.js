import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
// import image5 from "../../images/image5.png";
// import image6 from "../../images/image6.png";
// import image7 from "../../images/image7.png";
// import car from "../../images/car.png";
// import house from "../../images/house.png";
// import bath from "../../images/bath.png";
// import layer2 from "../../images/ima.png";
import down from "../../images/chevron-down.png";
import wpp from "../../images/wpp.png";
import instagram2 from "../../images/instagram2.png";
import facebook2 from "../../images/facebook2.png";
import linkedin from "../../images/linkedin.png";
import tiktok from "../../images/tiktok.png";
import Header from "./header";
import SelectCheckBox from "./checkBox";
import Cards from "./cards";
import SocialMedia from "./socialMedia";
import account from "../../images/account.png";

import "./Catalogo.css";

const Catalogo = ({ url }) => {
  const ventaoRenta = ["Venta", "Renta"];
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const [Selected, setSelected] = useState([]);
  const [lista, setLista] = useState([]);
  // const [image, setImageLink] = useState(url.length > 50 ? url : null);
  const { id } = useParams();

  const handleSelectedChange = (option) => {
    if (Selected.includes(option)) {
      const newSelected = Selected.filter((items) => items !== option);
      console.log("newSelected", newSelected);
      if (newSelected[0] === undefined) {
        setSelected([]);
      } else {
        setSelected([...newSelected]);
      }
    } else {
      setSelected([...Selected, option]);
    }

    // console.log("option", option);
  };

  const openOption = () => {
    setIsOptionOPen(!isOptionOpen);
    // console.log("adentro", isOptionOpen);
  };

  useEffect(() => {
    // Lógica para llamar al backend y obtener la información basada en el ID
    // Puedes utilizar una función asíncrona y gestionar el estado local para la información
    // Ejemplo:
    const fetchLista = async () => {
      try {
        const response = await fetch(
          `http://localhost:2001/properties/allPropertiesByUser/${id}`,
        );
        if (!response.ok) {
          console.log(
            "NOT RESPONSE OK: Error al obtener datos de las propiedades",
          );
        }
        const data = await response.json();
        console.log("data", data.propertiesById);
        setLista(data.propertiesById);

        // Guardar la información en el estado local o hacer lo que sea necesario
      } catch (error) {
        console.error(
          "CATCH ERROR: Error al obtener datos de las propiedades",
          error,
        );
      }
    };

    fetchLista();
  }, [id]);

  return (
    <div className="">
      <div className="mb-3 ">
        <Header />
      </div>

      <div className="ajusta">
        <div
          className="flex h-96 flex-col rounded-xl bg-slate-200"
          style={{
            backgroundImage: `url(${require("../../images/layer.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div className="relative inset-0 rounded-xl bg-black opacity-50"></div> */}
          <div className="flex h-2/4 w-full flex-col">
            <img
              className="m-auto mt-4 h-40 w-40 rounded-full bg-gray-300 object-cover ring-2 dark:ring-white"
              src={url.length > 50 ? url : account}
              alt=""
            />
            {/* <button className="relative bottom-7 left-16 m-auto flex h-7 w-7 rounded-full border bg-gray-300 ring-2 dark:ring-white">
              <img className="m-auto  " src={add} alt=""></img>
            </button> */}
          </div>
          <div className="flex h-30 w-full flex-col border border-black">
            <div className="flex h-full border border-red-500">
              <p className="m-auto text-4xl font-semibold text-white">
                Yesenia Gomez
              </p>
            </div>
            <div className="flex h-full justify-center border border-red-500">
              <p className=" text-xl font-medium text-white">
                Asesora inmobilaria
              </p>
            </div>
          </div>
          <SocialMedia
            wpp={wpp}
            instagram={instagram2}
            facebook={facebook2}
            linkedin={linkedin}
            tiktok={tiktok}
          />
        </div>
        <div className="mt-9 flex h-12 w-full border">
          <p className="m-auto text-xl font-bold">Propiedades disponibles</p>
        </div>
        <div className="mb-6 mt-5 h-12 w-44 cursor-pointer">
          <div
            onClick={openOption}
            className="flex h-full border border-red-500"
          >
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Venta o alquiler
            </p>
            <div className="m-auto">
              <img className="m-auto" src={down} alt="Hi"></img>
            </div>
          </div>
          <div
            className={`relative z-10 w-full border bg-white ${
              isOptionOpen ? "block" : "hidden"
            }`}
          >
            <SelectCheckBox
              opciones={ventaoRenta}
              opcionesSeleccionadas={Selected}
              handleSelectedChange={handleSelectedChange}
            />
          </div>
        </div>
        <div className="">
          <Cards lista={lista} />
        </div>
      </div>
    </div>
  );
};
export default Catalogo;

// const IconoRedSocial = ({ imagen, link }) => {
//   return (
//     <a
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="cursor-pointer"
//     >
//       <img className="h-8 w-8" src={imagen} alt=""></img>
//     </a>
//   );
// };

// <RedesSociales
//   wpp={wpp}
//   wppLink="https://wa.me/xxxxxxxxxx" // Reemplaza 'https://wa.me/xxxxxxxxxx' con tu enlace de WhatsApp
//   instagram={instagram2}
//   instagramLink="https://www.instagram.com/tu_usuario/" // Reemplaza 'https://www.instagram.com/tu_usuario/' con tu enlace de Instagram
//   facebook={facebook2}
//   facebookLink="https://www.facebook.com/tu_pagina/" // Reemplaza 'https://www.facebook.com/tu_pagina/' con tu enlace de Facebook
//   linkedin={linkedin}
//   linkedinLink="https://www.linkedin.com/in/tu_perfil/" // Reemplaza 'https://www.linkedin.com/in/tu_perfil/' con tu enlace de LinkedIn
//   tiktok={tiktok}
//   tiktokLink="https://www.tiktok.com/@tu_usuario/" // Reemplaza 'https://www.tiktok.com/@tu_usuario/' con tu enlace de TikTok
// />;
