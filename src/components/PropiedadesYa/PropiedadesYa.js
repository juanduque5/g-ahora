import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
import down from "../../images/chevron-down.png";
import "./PropiedadesYa.css";
import SelectCheckBox from "./SelectCheckBox";
import SearchBox from "./SearchBox";
import language from "./language";
// import { useSelector } from "react-redux"; // Importa las funciones useSelector y useDispatch

const PropiedadesYa = ({ skeleton }) => {
  // const storedLanguage = useSelector((state) => state.language.language);
  const storedLanguage = localStorage.getItem("language");

  const { find, or, promote, rest, rest2, rest3, rest4, search } =
    language[storedLanguage];

  const Navigate = useNavigate();

  const [isVentaOption, setIsVentaOption] = useState(false);

  const [isTypeOption, setTypeOption] = useState(false);
  const ventaoRenta = ["Venta", "Renta", "Venta y renta"];
  const sellorRent = ["Sell", "Rent", "Sell and Rent"];
  const tipo = ["Casa", "Apartamento", "Lote", "Local"];
  const type = ["House", "Apartment", "Land lot", "Premises"];
  const [filteredWords, setFilteredInformation] = useState([]);
  const [selectedUso, setSelectedUso] = useState([
    storedLanguage === "ES" ? "Venta y renta" : "Sell and rent",
  ]);
  const [Selected, setSelected] = useState([]);
  const [Selected2, setSelected2] = useState(["Venta y renta"]);

  // useEffect(() => {
  //   const languageChanged = localStorage.getItem("languageChange") === "true";
  //   if (languageChanged) {
  //     // Hacer algo cuando haya un cambio en el idioma
  //     setSkeleton(true);
  //     setTimeout(() => {
  //       setSkeleton(false);
  //       console.log("hagl se ha vuelto false después de 2 segundos");
  //     }, 2000);

  //     // Limpiar el indicador de cambio de idioma en localStorage
  //     localStorage.removeItem("languageChange");
  //   }
  // }, []);

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

  const [filterOptionEn, setFilterOptionEn] = useState({
    tipo: {
      House: false,
      Apartment: false,
      "Land lot": false,
      Premises: false,
    },
    uso: {
      Sell: false,
      Rent: false,
      "Sell and Rent": true,
    },
  });

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
    setFilteredInformation([]);
  };

  // const [Selected, setSelected] = useState([]);

  //Filtering type / used property
  const handleSelectedChange = (key) => {
    const option = key;
    if (option === "Venta" || option === "Sell") {
      const venta = "Venta";
      setFilterOption({
        ...filterOption,
        uso: {
          ...filterOption.uso,
          Renta: false,
          "Venta y renta": false,
          [venta]: true,
        },
      });
      setFilterOptionEn({
        ...filterOptionEn,
        uso: {
          ...filterOptionEn.uso,
          Rent: false,
          "Sell and Rent": false,
          Sell: true,
        },
      });
      setSelectedUso(option);
    } else if (option === "Renta" || option === "Rent") {
      const renta = "Renta";
      setFilterOption({
        ...filterOption,
        uso: {
          ...filterOption.uso,
          Venta: false,
          "Venta y renta": false,
          [renta]: true,
        },
      });
      setFilterOptionEn({
        ...filterOptionEn,
        uso: {
          ...filterOptionEn.uso,
          Rent: true,
          "Sell and Rent": false,
          Sell: false,
        },
      });
      setSelectedUso(option);
    } else if (option === "Venta y renta" || option === "Sell and Rent") {
      setFilterOption({
        ...filterOption,
        uso: {
          ...filterOption.uso,
          Venta: true,
          Renta: true,
          "Venta y renta": true,
        },
      });
      setFilterOptionEn({
        ...filterOptionEn,
        uso: {
          ...filterOptionEn.uso,
          Rent: true,
          "Sell and Rent": true,
          Sell: true,
        },
      });
      setSelectedUso(option);
    } else {
      let mappedOption;
      let mappedOption2;
      switch (option) {
        case "Casa":
        case "House":
          mappedOption = "Casa";
          mappedOption2 = "House";
          break;
        case "Apartamento":
        case "Apartment":
          mappedOption = "Apartamento";
          mappedOption2 = "Apartment";
          break;
        case "Local":
        case "Premises":
          mappedOption = "Local";
          mappedOption2 = "Premises";
          break;
        case "Lote":
        case "Land lot":
          mappedOption = "Lote";
          mappedOption2 = "Land lot";
          break;
        default:
          mappedOption = "";
      }

      setFilterOption({
        ...filterOption,
        tipo: {
          ...filterOption.tipo,
          [mappedOption]: !filterOption.tipo[mappedOption],
        },
      });
      setFilterOptionEn({
        ...filterOptionEn,
        tipo: {
          ...filterOptionEn.tipo,
          [mappedOption2]: !filterOptionEn.tipo[mappedOption2],
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

    const textValue = e.target.value;
    setLocation(textValue);
  };

  //Handle autoComplete cities
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          "http://localhost:2001/properties/autocomplete/guatemala/?searchTerm=" +
            location,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFilteredInformation(data.places);
        console.log("cities and all", data.places);
      } catch (error) {
        console.log("ERROR: autocomplete cities ", error);
      }
    };
    dataFetch();
  }, [location]);

  console.log("location", location);

  //handle search button
  const handleSearch = () => {
    Navigate("/Propiedades", { state: { filterOption } });
  };

  // console.log("filterwords", filteredWords);

  // console.log("opcion", ventaoRenta);
  console.log("selected", Selected2.length);

  //sets scroll to top
  useEffect(() => {
    const scrollToTop = () => {
      const container = document.querySelector(".overflow-y-auto");
      if (container) {
        container.scrollTop = 0;
      }
    };

    //Once we have some filtered words it should be apply to it.
    scrollToTop();
  }, [filteredWords]);

  //Skeleton when language is change

  return (
    <div>
      {skeleton ? (
        <div className="ajusta">
          <div className="m-auto mb-16 mt-8 flex h-530 w-full animate-pulse rounded-3xl bg-gray-300 md:w-full lg:h-786 xl:h-786">
            <div className="m-auto flex h-5/6 w-11/12 flex-col bg-gray-300">
              <div className="flex h-2/5 w-full flex-col">
                <div className="my-auto flex w-full select-none">
                  <p className="m-auto select-none font-fira-sans text-2xl font-extrabold not-italic text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl"></p>
                </div>
              </div>
              <div className="h-1/5">
                <div className="mb-3 font-open-sans text-sm font-semibold not-italic text-white md:hidden"></div>
                <div className="hidden font-open-sans text-sm font-semibold not-italic text-white sm:text-base md:block md:text-base lg:text-3xl xl:text-3xl 2xl:text-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ajusta">
          <div
            className="m-auto mb-16 mt-8 flex  h-530 w-full rounded-3xl md:w-full  lg:h-786  xl:h-786"
            id="imageFilter"
          >
            <div className="m-auto flex h-5/6 w-11/12 flex-col ">
              <div className="flex h-2/5 w-full flex-col ">
                <div className="my-auto flex w-full  select-none">
                  <p className="m-auto select-none font-fira-sans text-2xl font-extrabold not-italic text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl">
                    <span className="select-none text-yellow-new">{find}</span>{" "}
                    {or}{" "}
                    <span className="select-none text-yellow-new">
                      {promote}
                    </span>{" "}
                    {rest} ✌️
                  </p>
                </div>
              </div>
              <div className="h-1/5 ">
                <p className="mb-3 font-open-sans  text-sm font-semibold not-italic text-white md:hidden">
                  {rest2}
                </p>
                <p className="hidden font-open-sans text-sm font-semibold not-italic  text-white sm:text-base md:block md:text-base lg:text-3xl xl:text-3xl 2xl:text-3xl">
                  {rest2}
                </p>
              </div>
              <div className="aqui  flex  w-full   sm:w-full md:h-1/6 lg:h-1/4 xl:h-1/4">
                <div className="m-auto  w-full md:block md:h-20 md:w-full lg:block lg:w-11/12 xl:block xl:w-11/12">
                  <div className="m-auto flex  h-95 w-full flex-col gap-3 rounded-lg  md:h-20 md:flex-row md:gap-0 ">
                    <div className="flex w-full cursor-pointer flex-col gap-3  md:w-1/2  md:flex-row md:gap-0 md:border-r">
                      <div className="h-9 w-full border  bg-white md:h-auto md:w-2/5">
                        <div
                          onClick={openVentaOption}
                          className=" flex h-full cursor-pointer items-center border-r "
                        >
                          <p className="text-md ml-5 font-open-sans font-bold md:m-auto md:text-center md:text-sm lg:text-base xl:text-base">
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
                            opciones={
                              storedLanguage === "ES" ? ventaoRenta : sellorRent
                            }
                            opcionesSeleccionadas={
                              storedLanguage === "ES"
                                ? filterOption
                                : filterOptionEn
                            }
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
                            <p className="text-md ml-5 truncate font-open-sans font-bold md:m-auto md:text-sm lg:text-base xl:text-base">
                              {Selected.join(", ")}
                            </p>
                          ) : (
                            <p className="text-md ml-5 font-open-sans font-bold md:m-auto md:text-sm lg:text-base xl:text-base">
                              {storedLanguage === "ES"
                                ? "Tipo de propiedad"
                                : "Type of property"}
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
                            opciones={storedLanguage === "ES" ? tipo : type}
                            opcionesSeleccionadas={
                              storedLanguage === "ES"
                                ? filterOption
                                : filterOptionEn
                            }
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
                            className="text-md m-auto h-9 w-full truncate rounded-sm border border-blue-300 pl-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 md:w-95 md:p-0"
                            type="text"
                            placeholder={rest4}
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
                          {search}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-15 w-full justify-center">
                <p className="m-auto font-open-sans text-xl font-semibold text-white">
                  {rest3}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
};
export default PropiedadesYa;
