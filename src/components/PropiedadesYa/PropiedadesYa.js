import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const Navigate = useNavigate();
  const [isVentaOption, setIsVentaOption] = useState(false);
  const [isTypeOption, setTypeOption] = useState(false);
  const ventaoRenta = ["Venta", "Renta", "Venta y renta"];
  const type = ["Casa", "Apartamento", "Lote", "Local"];
  const [filteredWords, setFilteredInformation] = useState([]);
  const [selectedUso, setSelectedUso] = useState(["Venta y renta"]);
  const [Selected, setSelected] = useState([]);
  const [Selected2, setSelected2] = useState(["Venta y renta"]);
  //if you use null, then you'll encounter an issue
  const [location, setLocation] = useState("");
  const [filterOption, setFilterOption] = useState({
    tipo: {
      Casa: false,
      Apartamento: false,
      Local: false,
      Lote: false,
    },
    uso: {
      Venta: false,
      Renta: false,
      "Venta y renta": true,
    },
    place: {
      location: "",
    },
  });
  const ciudades = [
    "Cartago",
    "Cartaguena",
    "Cartago",
    "Cartaguena",
    "Cartago",
    "medellin",
  ];

  //Update place.location using useffect
  useEffect(() => {
    setFilterOption((prevFilterOption) => ({
      ...prevFilterOption,
      place: {
        ...prevFilterOption.place,
        location: location.length > 3 ? location : "",
      },
    }));
  }, [location]);

  //set location equals to value selected
  const placeInformation = (place) => {
    setLocation(place);
    console.log(place);
  };

  // const [Selected, setSelected] = useState([]);

  //Filtering type / used property
  const handleSelectedChange = (key) => {
    const option = key;
    if (option === "Venta") {
      setFilterOption({
        ...filterOption,
        uso: {
          ...filterOption.uso,
          Renta: false,
          "Venta y renta": false,
          [option]: true,
        },
      });
      setSelectedUso(option);
    } else if (option === "Renta") {
      setFilterOption({
        ...filterOption,
        uso: {
          ...filterOption.uso,
          Venta: false,
          "Venta y renta": false,
          [option]: true,
        },
      });
      setSelectedUso(option);
    } else if (option === "Venta y renta") {
      setFilterOption({
        ...filterOption,
        uso: {
          ...filterOption.uso,
          Venta: true,
          Renta: true,
          "Venta y renta": true,
        },
      });
      setSelectedUso(option);
    } else {
      setFilterOption({
        ...filterOption,
        tipo: {
          ...filterOption.tipo,
          [option]: !filterOption.tipo[option],
        },
      });
    }
  };

  //Using this to display the options selected on type option
  const handleSelected = (option) => {
    if (Selected.includes(option)) {
      const newSelected = Selected.filter((items) => items !== option);

      if (!newSelected) {
        setSelected([]);
      } else {
        setSelected([...newSelected]);
      }
    } else {
      setSelected([...Selected, option]);
    }
  };

  //handle select options from used
  const handleSelected2 = (option) => {
    setSelected2([option]);
  };

  console.log("selected", Selected);
  console.log("selected2", Selected2);

  console.log("filtered Option", filterOption);
  console.log("location", location);

  const openVentaOption = () => {
    setIsVentaOption(!isVentaOption);
  };

  const openTypeOption = () => {
    setTypeOption(!isTypeOption);
  };

  //filter location option
  const locationInfo = (e) => {
    console.log(e.target.value);
    const search = e.target.value.toLocaleLowerCase();
    const result = ciudades.filter(
      (info) => info.toLocaleLowerCase().includes(search) && search.length >= 3,
    );
    setFilteredInformation(result);
    setLocation(e.target.value);
  };

  //handle search button
  const handleSearch = () => {
    Navigate("/Propiedades", { state: { filterOption } });
  };

  // console.log("filterwords", filteredWords);

  // console.log("opcion", ventaoRenta);
  console.log("selected", Selected2.length);

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
          <div className="aqui  flex  w-full   sm:w-full md:h-1/6 lg:h-1/4 xl:h-1/4">
            <div className="m-auto  w-full md:block md:h-20 md:w-full lg:block lg:w-11/12 xl:block xl:w-11/12">
              <div className="m-auto flex  h-95 w-full flex-col gap-3 rounded-lg border  border-green-700 md:h-20 md:flex-row md:gap-0 ">
                <div className="flex w-full cursor-pointer flex-col gap-3 border border-yellow-500 md:w-1/2  md:flex-row md:gap-0 md:border-r">
                  <div className="h-9 w-full border  bg-white md:h-auto md:w-2/5">
                    <div
                      onClick={openVentaOption}
                      className=" flex h-full cursor-pointer items-center border-r "
                    >
                      <p className="ml-5 font-open-sans text-sm font-bold md:m-auto md:text-center md:text-sm lg:text-base xl:text-base">
                        {selectedUso}
                      </p>
                      <img
                        className={`m-auto mr-5 ${
                          isVentaOption ? "rotate-180" : "rotate-0"
                        }`}
                        src={down}
                        alt="Hi"
                      ></img>
                    </div>
                    <div
                      className={`absolute  z-30 mt-1 w-82 cursor-pointer border bg-white md:relative md:w-full ${
                        isVentaOption ? "block" : "hidden"
                      }`}
                    >
                      <SelectCheckBox
                        type={false}
                        handleSelected2={handleSelected2}
                        opciones={ventaoRenta}
                        opcionesSeleccionadas={filterOption}
                        handleSelectedChange={handleSelectedChange}
                      />
                    </div>
                  </div>
                  <div
                    onClick={openTypeOption}
                    className="h-9  w-full border bg-white md:h-auto md:w-3/5"
                  >
                    <div className="flex h-full cursor-pointer items-center ">
                      {Selected.length > 0 ? (
                        <p className="ml-5 truncate font-open-sans text-sm font-bold md:m-auto md:text-sm lg:text-base xl:text-base">
                          {Selected.join(", ")}
                        </p>
                      ) : (
                        <p className="ml-5 font-open-sans text-sm font-bold md:m-auto md:text-sm lg:text-base xl:text-base">
                          Tipo de inmueble
                        </p>
                      )}

                      <img
                        className={`m-auto mr-5 ${
                          isTypeOption ? "rotate-180" : "rotate-0"
                        }`}
                        src={down}
                        alt="Hi"
                      ></img>
                    </div>
                    <div
                      className={`absolute z-20 mt-1 w-82 cursor-pointer border bg-white shadow-lg md:relative md:w-full  ${
                        isTypeOption ? "block" : "hidden"
                      }`}
                    >
                      <SelectCheckBox
                        type={true}
                        opciones={type}
                        opcionesSeleccionadas={filterOption}
                        handleSelectedChange={handleSelectedChange}
                        handleSelected={handleSelected}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full cursor-pointer flex-col gap-3  border md:w-1/2  md:flex-row  md:bg-white">
                  <div className=" h-full w-full ">
                    <div className="flex h-full w-full items-center md:m-auto ">
                      {/* <p className="m-auto font-open-sans text-sm font-bold md:text-sm lg:text-base xl:text-base">
                      Cualquier propiedad{" "}
                    </p>
                    <img className="m-auto" src={down} alt="Hi"></img> */}
                      <input
                        onChange={locationInfo}
                        className="m-auto h-9 w-full rounded-sm border md:w-95 "
                        type="text"
                        placeholder="Ciudad o Areas"
                        value={location}
                      ></input>
                    </div>
                    <div
                      className={`absolute z-10 m-auto mt-1 max-h-48 w-82 cursor-pointer overflow-y-auto bg-white shadow-xl  md:relative md:w-95 ${
                        filteredWords.length ? "block" : "hidden"
                      }`}
                    >
                      <SearchBox
                        placeInformation={placeInformation}
                        filteredWords={filteredWords}
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleSearch}
                    className="m-auto flex h-9 w-full cursor-pointer rounded-xl bg-blue-new md:mr-2 md:h-16 md:w-30 "
                  >
                    <p className="text-md m-auto text-center font-fira-sans font-bold text-white md:text-sm lg:text-base xl:text-base">
                      BUSCAR
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" flex h-56 w-full flex-col  md:hidden">
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
            </div> */}
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
