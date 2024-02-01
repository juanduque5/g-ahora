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
import { Header } from "./header";
import SelectCheckBox from "./checkBox";
import { Cards } from "./cards";

import "./Catalogo.css";

const Catalogo = () => {
  const ventaoRenta = ["Venta", "Renta"];
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const [Selected, setSelected] = useState([]);
  const [lista, setLista] = useState([]);
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
              src=""
              alt=""
            />
            <button className="relative bottom-7 left-16 m-auto flex h-7 w-7 rounded-full border bg-gray-300 ring-2 dark:ring-white">
              <p className="m-auto text-center text-lg text-white">+</p>
            </button>
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
          <div className="flex h-1/5 w-full justify-center border border-black">
            <div className="mt-2 flex w-auto gap-2 border border-black">
              <div className="cursor-pointer">
                <img className="h-8 w-8" src={wpp} alt=""></img>
              </div>
              <div className="cursor-pointer">
                <img className="h-8 w-8" src={instagram2} alt=""></img>
              </div>
              <div className="cursor-pointer">
                <img className="h-8 w-8" src={facebook2} alt=""></img>
              </div>
              <div className="cursor-pointer">
                <img className="h-8 w-8" src={tiktok} alt=""></img>
              </div>
              <div className="cursor-pointer">
                <img className="h-8 w-8" src={linkedin} alt=""></img>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 flex h-12 w-full border">
          <p className="m-auto text-xl font-bold">Propiedades disponibles</p>
        </div>
        <div className="mt-5 h-12 w-44 cursor-pointer">
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
            className={` h-auto border bg-white ${
              isOptionOpen ? "relative" : "hidden"
            }`}
          >
            <SelectCheckBox
              opciones={ventaoRenta}
              opcionesSeleccionadas={Selected}
              handleSelectedChange={handleSelectedChange}
            />
          </div>
        </div>
        <div>
          <Cards lista={lista} />
        </div>
      </div>
    </div>
  );
};
export default Catalogo;
