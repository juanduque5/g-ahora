import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
import down from "../../images/chevron-down.png";
import "./PropiedadesYa.css";
import SelectCheckBox from "./SelectCheckBox";
import SearchBox from "./SearchBox";

const PropiedadesYa = () => {
  // const opciones = ["Opción 1", "Opción 2", "Opción 3"];
  // const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  // const handleSeleccionarOpcion = (e) => {
  //   setOpcionSeleccionada(e.target.value);
  // };
  const [isVentaOption, setIsVentaOption] = useState(false);
  const [isTypeOption, setTypeOption] = useState(false);
  const ventaoRenta = ["Venta", "Renta", "Venta y alquiler"];
  const type = ["Casa", "Apartamento", "Lote", "Local"];
  const [filteredWords, setFilteredInformation] = useState([]);
  const ciudades = [
    "Cartago",
    "Cartaguena",
    "Cartago",
    "Cartaguena",
    "Cartago",

    "Cartaguena",
    "Cartago",

    "Cartaguena",
    "Cartago",

    "Cartaguena",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
    "Bogota",
  ];
  const [Selected, setSelected] = useState([]);

  const openVentaOption = () => {
    setIsVentaOption(!isVentaOption);
  };

  const openTypeOption = () => {
    setTypeOption(!isTypeOption);
  };

  const locationInfo = (e) => {
    console.log(e.target.value);
    const search = e.target.value.toLocaleLowerCase();
    const result = ciudades.filter(
      (info) => info.toLocaleLowerCase().includes(search) && search.length >= 3,
    );
    setFilteredInformation(result);
  };

  console.log("filterwords", filteredWords);

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

  return (
    <div className="ajusta">
      <div
        className="m-auto mb-16 mt-8 flex  h-530 w-full rounded-3xl md:w-full  lg:h-786  xl:h-786"
        id="imageFilter"
      >
        <div className="m-auto flex h-5/6 w-11/12 flex-col ">
          <div className="flex h-2/5 w-full flex-col ">
            <div className="my-auto flex w-full  select-none">
              <p className="m-auto select-none font-fira-sans text-2xl font-extrabold not-italic text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl">
                <span className="select-none text-yellow-new">Encuentra</span> o{" "}
                <span className="select-none text-yellow-new">
                  {" "}
                  promociona{" "}
                </span>
                tu propiedad en PropiedadesAhora ✌️
              </p>
            </div>
          </div>
          <div className="h-1/5 ">
            <p className="mb-3 font-open-sans  text-sm font-semibold not-italic text-white md:hidden">
              Tu elección segura para el éxito en bienes raíces en Guatemala.
            </p>
            <p className="hidden font-open-sans text-sm font-semibold not-italic  text-white sm:text-base md:block md:text-base lg:text-3xl xl:text-3xl 2xl:text-3xl">
              Tu elección segura para el éxito en bienes raíces en Guatemala.
              Únete a nosotros y toma el control de tu futuro inmobiliario.
            </p>
          </div>
          <div className="aqui  flex h-auto w-full   sm:w-full md:h-1/6 lg:h-1/4 xl:h-1/4">
            <div className="m-auto hidden h-20  border md:block md:w-full lg:block lg:w-11/12 xl:block xl:w-11/12">
              <div className="m-auto flex  h-20 w-full rounded-lg bg-white ">
                <div className="flex w-1/2 cursor-pointer  border-r">
                  <div className="w-2/5">
                    <div
                      onClick={openVentaOption}
                      className=" flex h-full cursor-pointer border-r "
                    >
                      <p className="m-auto text-center font-open-sans text-sm font-bold md:text-sm lg:text-base xl:text-base">
                        venta y alquiler
                      </p>
                      <img
                        className={`m-auto ${
                          isVentaOption ? "rotate-180" : "rotate-0"
                        }`}
                        src={down}
                        alt="Hi"
                      ></img>
                    </div>
                    <div
                      className={`relative z-10 mt-1 w-full cursor-pointer border bg-white ${
                        isVentaOption ? "block" : "hidden"
                      }`}
                    >
                      <SelectCheckBox
                        opciones={ventaoRenta}
                        opcionesSeleccionadas={Selected}
                        handleSelectedChange={handleSelectedChange}
                      />
                    </div>
                  </div>
                  <div onClick={openTypeOption} className="  w-3/5 border">
                    <div className="flex h-full cursor-pointer ">
                      <p className="m-auto font-open-sans text-sm font-bold md:text-sm lg:text-base xl:text-base">
                        tipo de inmueble
                      </p>
                      <img
                        className={`m-auto ${
                          isTypeOption ? "rotate-180" : "rotate-0"
                        }`}
                        src={down}
                        alt="Hi"
                      ></img>
                    </div>
                    <div
                      className={`relative z-10 mt-1 w-full cursor-pointer border bg-white shadow-lg  ${
                        isTypeOption ? "block" : "hidden"
                      }`}
                    >
                      <SelectCheckBox
                        opciones={type}
                        opcionesSeleccionadas={Selected}
                        handleSelectedChange={handleSelectedChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-1/2 cursor-pointer flex-row  border ">
                  <div className=" h-full w-2/3 ">
                    <div className="flex h-full items-center ">
                      {/* <p className="m-auto font-open-sans text-sm font-bold md:text-sm lg:text-base xl:text-base">
                      Cualquier propiedad{" "}
                    </p>
                    <img className="m-auto" src={down} alt="Hi"></img> */}
                      <input
                        onChange={locationInfo}
                        className="h-9 w-full rounded-sm border "
                        type="text"
                        placeholder="Ciudad o Areas"
                      ></input>
                    </div>
                    <div
                      className={`relative z-10 mt-1 max-h-48 w-full cursor-pointer overflow-y-auto border bg-white shadow-lg ${
                        filteredWords.length ? "block" : "hidden"
                      }`}
                    >
                      <SearchBox filteredWords={filteredWords} />
                    </div>
                  </div>
                  <div className="m-auto mr-2 flex h-16 w-30 cursor-pointer rounded-xl bg-blue-new ">
                    <p className="m-auto text-center font-fira-sans text-sm font-bold text-white md:text-sm lg:text-base xl:text-base">
                      BUSCAR
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex h-56 w-full flex-col  md:hidden">
              <div className="flex h-full justify-center  ">
                <div className="m-auto flex h-5/6 w-full cursor-pointer border-2 bg-white hover:border-blue-new">
                  <p className="m-auto text-center font-open-sans text-base font-bold">
                    Venta o Alquiler
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center  ">
                <div className="m-auto flex h-5/6 w-full cursor-pointer border-2 bg-white hover:border-blue-new">
                  <p className="m-auto text-center font-open-sans text-base font-bold">
                    Tipo de inmueble
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center  ">
                <div className=" m-auto flex h-5/6 w-full cursor-pointer border-2  bg-white hover:border-blue-new">
                  <p className="m-auto text-center font-open-sans text-base font-bold">
                    Lugar
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center ">
                <div className="m-auto flex h-5/6 w-full cursor-pointer rounded-xl bg-blue-new">
                  <p className="m-auto text-center font-fira-sans text-base font-bold text-white ">
                    Buscar Propiedad
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-15 w-full justify-center">
            <p className="m-auto font-open-sans text-xl font-semibold text-white">
              Encuentra lo que buscas
            </p>
          </div>
        </div>
      </div>
      {/* <div>
        <label>Selecciona una opción:</label>
        <select value={opcionSeleccionada} onChange={handleSeleccionarOpcion}>
          <option value="">Selecciona una opción</option>
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
        {opcionSeleccionada && <p>Opción seleccionada: {opcionSeleccionada}</p>}
      </div> */}
    </div>
  );
};
export default PropiedadesYa;
