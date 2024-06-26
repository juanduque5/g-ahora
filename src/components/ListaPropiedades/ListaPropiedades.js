import React, { useState, useEffect } from "react";
// import Modal from "react-modal";

// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
// import search from "../../images/search.png";
// import filter from "../../images/filter.png";
import down from "../../images/chevron-down.png";
import SelectCheckBox from "./SelectCheckBox";
import SelectBathroom from "./selectBathroom";
import SelectBedroom from "./selectBedroom";
import SearchBox from "./searchBox";
import Type from "./type";
import Price from "./Price";
import Cards from "./cards";
// import times from "../../images/times.png";
// import { Select } from "@mui/material";
import { useSelector } from "react-redux"; // Importa las funciones useSelector y useDispatch

import language from "./language";
// import Modal from "./modal";

const ListaPropiedades = ({ isAuth, userId }) => {
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const { bathrooms0, bedrooms0, city } = language[storedLanguage];
  //Setting Modal functionality
  const Navigate = useNavigate();
  // const [searchDataButton, setSearchDataButton] = useState(false);
  // const [isModalOpen, setIsModalOPen] = useState(false);
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const [isOptionOpen2, setIsOptionOPen2] = useState(false);
  const [isOptionOpen3, setIsOptionOPen3] = useState(false);
  const [isOptionOpen4, setIsOptionOPen4] = useState(false);
  const [isOptionOpen5, setIsOptionOPen5] = useState(false);
  const [filteredWords, setFilteredInformation] = useState([]);
  const [place, setPlace] = useState("");
  const [Selected, setSelected] = useState(() => {
    const storedSelected = localStorage.getItem("Selected");
    return storedSelected ? JSON.parse(storedSelected) : [];
  });

  // Guardar el estado actual de Selected en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("Selected", JSON.stringify(Selected));
  }, [Selected]);

  // const [selected2, setSelected2] = useState([]);
  // const [value, setValue] = useState([0, 10000]);
  // const Numeros = [1, 2, 3, 4, 5, 6, "Cualquiera"];
  const bathrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bedrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedUso, setSelectedUso] = useState([]);

  useEffect(() => {
    setSelectedUso(
      storedLanguage === "ES" ? ["Venta o renta"] : ["Sell or rent"],
    );
  }, [storedLanguage]);

  const price = [
    "0 - 100,000",
    "100,000 - 200,000",
    "200,000 - 300,000",
    "300,000 - 400,000",
    "400,000 - 500,000",
    "500,000+",
  ];

  const tipo = ["Casa", "Apartamento", "Lote", "Local"];
  const type = ["House", "Apartment", "Land lot", "Premises"];
  const ventaoRenta = ["Venta", "Renta"];
  const sellorRent = ["Sell", "Rent"];
  const location = useLocation();

  const data = location.state && location.state.filterOption;
  const [searchData, setSearchData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("searchData"));
    return (
      storedData || {
        tipo: {
          Casa: false,
          Apartamento: false,
          Local: false,
          Lote: false,
        },
        uso: {
          Venta: false,
          Renta: false,
        },
        place: {
          location: "",
        },
        bathrooms: null,
        bedrooms: null,
        price: "",
        minPrice: "",
        maxPrice: "",
      }
    );
  });

  //obj for english language
  const [filterOptionEn, setFilterOptionEn] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("filterOptionEn"));
    return (
      storedData || {
        tipo: {
          House: false,
          Apartment: false,
          "Land lot": false,
          Premises: false,
        },
        uso: {
          Sell: false,
          Rent: false,
        },
      }
    );
  });
  //if storedlanguage change then
  useEffect(() => {
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      tipo: {
        Casa: false,
        Apartamento: false,
        Local: false,
        Lote: false,
      },
      uso: {
        Venta: false,
        Renta: false,
      },
      place: {
        location: "",
      },
      bathrooms: "",
      bedrooms: "",
      price: "",
      minPrice: "",
      maxPrice: "",
    }));
    setFilterOptionEn({
      tipo: {
        House: false,
        Apartment: false,
        "Land lot": false,
        Premises: false,
      },
      uso: {
        Sell: false,
        Rent: false,
      },
    });
    // Restablecer el estado de languageChange después de actualizar filterOptionEn
  }, [storedLanguage]);

  //
  useEffect(() => {
    localStorage.setItem("filterOptionEn", JSON.stringify(filterOptionEn));
  }, [filterOptionEn]);
  console.log("data location", searchData);

  // Guardar datos en localStorage cada vez que searchData cambie
  useEffect(() => {
    localStorage.setItem("searchData", JSON.stringify(searchData));
  }, [searchData]);
  console.log("data location", searchData);

  const handleSelectedFilter = (option, key) => {
    if (option === "Venta" || option === "Sell") {
      const venta = "Venta";
      setSearchData({
        ...searchData,
        uso: {
          ...searchData.uso,
          Renta: false,
          "Venta y renta": false,
          [venta]: true,
        },
        minPrice: "",
        maxPrice: "",
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
      localStorage.setItem("optionType", option);
      setSearchData({
        ...searchData,
        uso: {
          ...searchData.uso,
          Venta: false,
          "Venta y renta": false,
          [renta]: true,
        },
        price: "",
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
    } else if (option === "bathrooms") {
      setSearchData({
        ...searchData,
        [option]: key,
      });
    } else if (option === "bedrooms") {
      setSearchData({
        ...searchData,
        [option]: key,
      });
    } else if (option === "price") {
      setSearchData({
        ...searchData,
        [option]: key,
      });
    } else if (option === "min") {
      if (!isNaN(key)) {
        setSearchData({
          ...searchData,
          minPrice: key,
        });
      }
    } else if (option === "max") {
      if (!isNaN(key)) {
        setSearchData({
          ...searchData,
          maxPrice: key,
        });
      }
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

      setSearchData({
        ...searchData,
        tipo: {
          ...searchData.tipo,
          [mappedOption]: !searchData.tipo[mappedOption],
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

  //update place
  useEffect(() => {
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      place: {
        ...prevSearchData.place,
        location: place.length > 3 ? place : "",
      },
    }));
  }, [place]);

  //Search box
  const placeInformation = (place) => {
    setPlace(place);
    console.log(place);
    setFilteredInformation([]);
  };
  //setPlace
  const locationInfo = (e) => {
    console.log(e.target.value);

    const textValue = e.target.value;
    setPlace(textValue);
  };

  //search for cities and localities
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          "http://localhost:2001/properties/autocomplete/guatemala/?searchTerm=" +
            place,
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
  }, [place]);

  //for small devices filt
  // const [filterOption, setFilterOption] = useState({
  //   venta: false,
  //   renta: false,
  //   nuevo: false,
  //   usado: false,
  //   casa: false,
  //   apartamento: false,
  //   local: false,
  //   lote: false,
  //   cuartos: "Cualquiera",
  //   banos: "Cualquiera",
  //   precioMin: value[0],
  //   precioMax: value[1],
  // });

  // const rangeSelector = (event, newValue) => {
  //   const precioMin = "precioMin";
  //   const precioMax = "precioMax";
  //   setValue(newValue);
  //   console.log(newValue);
  //   setFilterOption({
  //     ...filterOption,

  //     [precioMin]: newValue[0],
  //     [precioMax]: newValue[1],
  //   });
  // };

  // const handleInputMin = (event) => {
  //   const precioMin = "precioMin";
  //   const newValue = parseFloat(event.target.value.replace(/,/g, ""));
  //   if (!isNaN(newValue)) {
  //     setValue([newValue, value[1]]); // Updates slider
  //   } else {
  //     setValue([null, value[1]]); // Use null
  //   }

  //   setFilterOption({
  //     ...filterOption,

  //     [precioMin]: newValue,
  //   });
  // };

  // const handleInputMax = (event) => {
  //   const precioMax = "precioMax";
  //   const newValue = parseFloat(event.target.value.replace(/,/g, ""));
  //   console.log("new", newValue);
  //   if (!isNaN(newValue)) {
  //     setValue([value[0], newValue]); // Updates slider
  //   } else {
  //     setValue([value[0], null]); // Use Null
  //   }

  //   setFilterOption({
  //     ...filterOption,

  //     [precioMax]: newValue,
  //   });
  // };

  // const filterSearch = (option, type) => {
  //   const values = Object.keys(filterOption);
  //   console.log(type);
  //   for (const value of values) {
  //     //if value equals type, then sets cuartos or banos to a new value
  //     if (value === type) {
  //       console.log("true");
  //       return setFilterOption({
  //         ...filterOption,

  //         [type]: option,
  //       });
  //       //Gets (check options) options such as venta, renta... and change is boolean
  //     } else {
  //       setFilterOption({
  //         ...filterOption,

  //         [option]: !filterOption[option],
  //       });
  //     }
  //   }
  // };

  //handle change
  const handleSelectedChange = (option) => {
    if (Selected.includes(option)) {
      setSelected(Selected.filter((item) => item !== option));
    } else {
      setSelected([...Selected, option]);
    }
  };

  // Recuperar el estado almacenado en localStorage al inicializar el componente
  // if (true) {
  //   console.log("searchData", searchData);
  //   console.log("searchData.tipo", searchData.tipo);
  //   const tipoKeys = Object.keys(searchData.tipo);
  //   console.log("tipoKeys", tipoKeys);
  //   const data = tipoKeys
  //     .filter(([key, value]) => value === true)
  //     .map(([key, value]) => key);

  //   console.log("aaadata", data);
  //   if (data.length > 0) {
  //     setSelected((prevState) => [...prevState, data]);
  //   }
  // }

  console.log("selected", Selected);

  //handle changed 2

  // const openModal = () => {
  //   setIsModalOPen(true);
  // };

  useEffect(() => {
    setSelected([]);
  }, [storedLanguage]);
  ///
  // const handleSelectedChange2 = (option) => {
  //   setSelected2([option]); // Actualiza el estado Selected2
  // };

  //Open venta or renta option
  const openOption = () => {
    setIsOptionOPen(!isOptionOpen);
    // console.log("adentro", isOptionOpen);
  };

  //Open venta or renta option
  const openOption2 = () => {
    setIsOptionOPen2(!isOptionOpen2);
    // console.log("adentro", isOptionOpen);
  };

  const openOption3 = () => {
    setIsOptionOPen3(!isOptionOpen3);
    // console.log("adentro", isOptionOpen);
  };

  const openOption4 = () => {
    setIsOptionOPen4(!isOptionOpen4);
    // console.log("adentro", isOptionOpen);
  };

  const openOption5 = () => {
    setIsOptionOPen5(!isOptionOpen5);
    // console.log("adentro", isOptionOpen);
  };

  //handle list of properties search
  const handleSearch = () => {
    Navigate("/Propiedades", { state: { searchData } });
  };

  return (
    <div className="ajusta">
      <div className="mb-2 mt-8 h-auto md:bg-white lg:block">
        {skeleton ? (
          <div className="h-14 w-full animate-pulse bg-gray-300"></div>
        ) : (
          <div className=" flex h-auto flex-col gap-3 md:flex md:h-14 md:flex-row  md:gap-3">
            <div className="relative order-1 inline-block w-full cursor-pointer flex-col rounded-md border md:order-1 md:w-1/6">
              <div
                onClick={openOption}
                className="m-auto flex h-9 w-90 md:h-full "
              >
                <div className="m-auto w-90">
                  <p className=" font-open-sans text-base font-bold lg:text-sm xl:text-base">
                    {selectedUso}
                  </p>
                </div>

                <div className="m-auto">
                  <img className="m-auto" src={down} alt="Hi"></img>
                </div>
              </div>
              <div
                className={`absolute z-50 mt-1 w-full bg-white md:relative ${
                  isOptionOpen ? "block" : "hidden"
                }`}
              >
                <SelectCheckBox
                  opciones={storedLanguage === "ES" ? ventaoRenta : sellorRent}
                  handleSearchData={
                    storedLanguage === "ES" ? searchData : filterOptionEn
                  }
                  handleSelectedFilter={handleSelectedFilter}
                />
              </div>
            </div>
            <div className=" relative order-6 inline-block  h-9 cursor-pointer rounded-md border  md:order-2 md:h-full md:w-32.5">
              <div className="flex h-full">
                <input
                  className="text-md w-full truncate"
                  type="text"
                  id="texto"
                  onChange={locationInfo}
                  value={place}
                  placeholder={city}
                />
              </div>
              <div
                className={`absolute z-10 m-auto mt-1 max-h-48   w-full cursor-pointer overflow-y-auto bg-white  shadow-xl  md:relative md:w-auto ${
                  filteredWords.length ? "block" : "hidden"
                }`}
              >
                <SearchBox
                  placeInformation={placeInformation}
                  filteredWords={filteredWords}
                />
              </div>
            </div>
            <div className="relative order-2 inline-block h-9 w-full cursor-pointer rounded-md border md:h-full md:w-10">
              <div onClick={openOption5} className=" m-auto flex h-full w-90 ">
                <div className="m-auto w-90">
                  {Selected.length > 0 ? (
                    <p className=" truncate  font-open-sans text-base font-bold lg:text-sm xl:text-base">
                      {Selected.join(", ")}
                    </p>
                  ) : (
                    <p className="m-auto  font-open-sans text-base font-bold md:m-auto lg:text-sm xl:text-base">
                      {storedLanguage === "ES" ? "Tipo" : "Type"}
                    </p>
                  )}
                </div>
                <div className="m-auto ">
                  <img className="m-auto" src={down} alt="Hi"></img>
                </div>
              </div>
              <div
                className={`absolute z-40 mt-1 h-auto w-full bg-white md:relative ${
                  isOptionOpen5 ? "block" : "hidden"
                }`}
              >
                <Type
                  opciones={storedLanguage === "ES" ? tipo : type}
                  handleSearchData={
                    storedLanguage === "ES" ? searchData : filterOptionEn
                  }
                  handleSelectedChange={handleSelectedChange}
                  handleSelectedFilter={handleSelectedFilter}
                />
              </div>
            </div>
            <div className="relative order-3 inline-block h-9 cursor-pointer rounded-md border  md:h-full md:w-10">
              <div onClick={openOption2} className="m-auto flex h-full w-90">
                <div className="m-auto w-90">
                  <p className="m-auto truncate font-open-sans text-base font-bold lg:text-sm xl:text-base">
                    {bathrooms0 + ":  " + searchData.bathrooms}
                  </p>
                </div>

                <div className="m-auto">
                  <img className="m-auto" src={down} alt="Hi"></img>
                </div>
              </div>
              <div
                className={`absolute z-30 mt-1 h-auto w-full bg-white md:relative ${
                  isOptionOpen2 ? "block" : "hidden"
                }`}
              >
                <SelectBathroom
                  opciones={bathrooms}
                  handleSelectedFilter={handleSelectedFilter}
                />
              </div>
            </div>

            <div className="relative order-4 inline-block h-9 cursor-pointer rounded-md border  md:h-full md:w-once">
              <div onClick={openOption3} className="m-auto flex h-full w-90">
                <div className="m-auto w-90">
                  <p className="m-auto truncate font-open-sans  text-base font-bold lg:text-sm xl:text-base">
                    {bedrooms0 + ":  " + searchData.bedrooms}
                  </p>
                </div>

                <div className="m-auto">
                  <img className="m-auto" src={down} alt="Hi"></img>
                </div>
              </div>
              <div
                className={`absolute z-20 mt-1 h-auto w-full bg-white md:relative ${
                  isOptionOpen3 ? "block" : "hidden"
                }`}
              >
                <SelectBedroom
                  opciones={bedrooms}
                  handleSelectedFilter={handleSelectedFilter}
                />
              </div>
            </div>
            <div className=" relative order-5  inline-block h-9 cursor-pointer rounded-md border md:h-full md:w-10">
              <div onClick={openOption4} className="m-auto flex h-full w-90">
                <div className="m-auto w-90">
                  <p className="m-auto truncate font-open-sans text-base font-bold lg:text-sm xl:text-base">
                    {searchData.price
                      ? "$ " + searchData.price
                      : searchData.minPrice || searchData.maxPrice
                        ? "$ " +
                          Number(searchData.minPrice).toLocaleString() +
                          " - " +
                          Number(searchData.maxPrice).toLocaleString()
                        : storedLanguage === "ES"
                          ? "Precio"
                          : "Price"}
                  </p>
                </div>

                <div className="m-auto">
                  <img className="m-auto" src={down} alt="Hi"></img>
                </div>
              </div>
              <div
                className={`absolute z-10 mt-1 h-auto w-full bg-white md:relative ${
                  isOptionOpen4 ? "block" : "hidden"
                }`}
              >
                <Price
                  opciones={price}
                  handleSearchData={searchData}
                  handleSelectedFilter={handleSelectedFilter}
                />
              </div>
            </div>
            <div className=" order-6 flex h-9 w-full cursor-pointer rounded-xl border md:h-full md:w-cinco ">
              <button
                onClick={handleSearch}
                className="w-full rounded-xl bg-blue-new font-open-sans text-base font-bold text-white"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Cards
          data={data}
          searchData={searchData}
          isAuth={isAuth}
          userId={userId}
        />
      </div>
    </div>
  );
};
export default ListaPropiedades;
