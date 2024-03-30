import React, { useState, useEffect } from "react";
// import Modal from "react-modal";

// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
// import search from "../../images/search.png";
import filter from "../../images/filter.png";
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

import Modal from "./modal";

const ListaPropiedades = ({ isAuth, userId }) => {
  //Setting Modal functionality
  const Navigate = useNavigate();
  // const [searchDataButton, setSearchDataButton] = useState(false);
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const [isOptionOpen2, setIsOptionOPen2] = useState(false);
  const [isOptionOpen3, setIsOptionOPen3] = useState(false);
  const [isOptionOpen4, setIsOptionOPen4] = useState(false);
  const [isOptionOpen5, setIsOptionOPen5] = useState(false);
  const [filteredWords, setFilteredInformation] = useState([]);
  const [place, setPlace] = useState("");
  const [Selected, setSelected] = useState([]);
  const [Selected2, setSelected2] = useState([]);
  const [value, setValue] = useState([0, 10000]);
  const Numeros = [1, 2, 3, 4, 5, 6, "Cualquiera"];
  const bathrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bedrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const price = [
    "0 - 50,000",
    "50,000 - 100,000",
    "100,000 - 150,000",
    "200,000 - 250,000",
    "300,000 - 350,000",
    "400,000 - 450,000",
    "500,000+",
  ];
  const type = ["Casa", "Apartamento", "Lote", "Local"];
  const ventaoRenta = ["Venta", "Renta"];
  const location = useLocation();

  const data = location.state && location.state.filterOption;
  const [searchData, setSearchData] = useState({
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
    bathrooms: null,
    bedrooms: null,
    price: "",
  });
  console.log("data location", searchData);

  const handleSelectedFilter = (option, key) => {
    if (option === "Venta") {
      setSearchData({
        ...searchData,
        uso: {
          ...searchData.uso,
          Renta: false,
          "Venta y renta": false,
          [option]: true,
        },
      });
    } else if (option === "Renta") {
      setSearchData({
        ...searchData,
        uso: {
          ...searchData.uso,
          Venta: false,
          "Venta y renta": false,
          [option]: true,
        },
      });
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
    } else {
      setSearchData({
        ...searchData,
        tipo: {
          ...searchData.tipo,
          [option]: !searchData.tipo[option],
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
  const [filterOption, setFilterOption] = useState({
    venta: false,
    renta: false,
    nuevo: false,
    usado: false,
    casa: false,
    apartamento: false,
    local: false,
    lote: false,
    cuartos: "Cualquiera",
    banos: "Cualquiera",
    precioMin: value[0],
    precioMax: value[1],
  });

  const rangeSelector = (event, newValue) => {
    const precioMin = "precioMin";
    const precioMax = "precioMax";
    setValue(newValue);
    console.log(newValue);
    setFilterOption({
      ...filterOption,

      [precioMin]: newValue[0],
      [precioMax]: newValue[1],
    });
  };

  const handleInputMin = (event) => {
    const precioMin = "precioMin";
    const newValue = parseFloat(event.target.value.replace(/,/g, ""));
    if (!isNaN(newValue)) {
      setValue([newValue, value[1]]); // Updates slider
    } else {
      setValue([null, value[1]]); // Use null
    }

    setFilterOption({
      ...filterOption,

      [precioMin]: newValue,
    });
  };

  const handleInputMax = (event) => {
    const precioMax = "precioMax";
    const newValue = parseFloat(event.target.value.replace(/,/g, ""));
    console.log("new", newValue);
    if (!isNaN(newValue)) {
      setValue([value[0], newValue]); // Updates slider
    } else {
      setValue([value[0], null]); // Use Null
    }

    setFilterOption({
      ...filterOption,

      [precioMax]: newValue,
    });
  };

  const filterSearch = (option, type) => {
    const values = Object.keys(filterOption);
    console.log(type);
    for (const value of values) {
      //if value equals type, then sets cuartos or banos to a new value
      if (value === type) {
        console.log("true");
        return setFilterOption({
          ...filterOption,

          [type]: option,
        });
        //Gets (check options) options such as venta, renta... and change is boolean
      } else {
        setFilterOption({
          ...filterOption,

          [option]: !filterOption[option],
        });
      }
    }
  };

  //handle change
  const handleSelectedChange = (option) => {
    if (Selected.includes(option)) {
      const newSelected = Selected.filter((items) => items !== option);
      console.log("newSelected", newSelected);
      if (!newSelected) {
        setSelected([]);
      } else {
        setSelected([...newSelected]);
      }
    } else {
      setSelected([...Selected, option]);
    }
  };

  //handle changed 2
  const handleSelectedChange2 = (option) => {
    setSelected2([option]);
  };

  console.log("selected", Selected);

  const openModal = () => {
    setIsModalOPen(true);
  };

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

  // console.log("afuera", isOptionOpen);

  const closeModal = () => {
    setIsModalOPen(false);
    //Resets filter object if modals closed
    setFilterOption({
      venta: false,
      renta: false,
      nuevo: false,
      usado: false,
      casa: false,
      apartamento: false,
      local: false,
      lote: false,
      cuartos: "Cualquiera",
      banos: "Cualquiera",
      precioMin: 0,
      precioMax: 10000,
    });
    setValue([0, 10000]);
  };

  const closed = () => {
    setFilterOption({
      venta: false,
      renta: false,
      nuevo: false,
      usado: false,
      casa: false,
      apartamento: false,
      local: false,
      lote: false,
      cuartos: "Cualquiera",
      banos: "Cualquiera",
      precioMin: 0,
      precioMax: 10000,
    });
    setValue([0, 10000]);
  };

  const colorMap = {
    Cualquiera: true,
  };

  const nums = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  };

  //handle list of properties search
  const handleSearch = () => {
    Navigate("/Propiedades", { state: { searchData } });
  };

  return (
    <div className="ajusta">
      <div className="mb-8 mt-8 hidden h-auto  lg:block ">
        <div className=" flex h-14   flex-row gap-11 md:flex  md:gap-3">
          <div className="relative inline-block  w-1/6 cursor-pointer flex-col rounded-md border">
            <div onClick={openOption} className="flex h-full ">
              <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
                {Selected2.length > 0 ? Selected2 : "Rent or Sell"}
              </p>
              <div className="m-auto">
                <img className="m-auto" src={down} alt="Hi"></img>
              </div>
            </div>
            <div
              className={`relative z-10 h-auto border bg-white ${
                isOptionOpen ? "block" : "hidden"
              }`}
            >
              <SelectCheckBox
                opciones={ventaoRenta}
                handleSearchData={searchData}
                opcionesSeleccionadas={Selected}
                handleSelectedChange2={handleSelectedChange2}
                handleSelectedFilter={handleSelectedFilter}
              />
            </div>
          </div>
          <div className=" relative inline-block cursor-pointer rounded-md border md:w-32.5">
            <div className="flex h-full">
              <input
                className="text-md w-full truncate"
                type="text"
                id="texto"
                onChange={locationInfo}
                value={place}
              />
            </div>
            <div
              className={`absolute z-10 m-auto mt-1 max-h-48 w-82 cursor-pointer overflow-y-auto bg-white shadow-xl  md:relative md:w-auto ${
                filteredWords.length ? "block" : "hidden"
              }`}
            >
              <SearchBox
                placeInformation={placeInformation}
                filteredWords={filteredWords}
              />
            </div>
          </div>

          {/* <div className="flex  w-32.5 rounded-md border border-blue-400">
            <input className="w-11/12" type="text" id="texto" />
            <img className="m-auto cursor-pointer" src={times} alt="Hi"></img>
          </div> */}
          <div className=" relative inline-block cursor-pointer rounded-md border md:w-10">
            <div onClick={openOption5} className="flex h-full">
              {Selected.length > 0 ? (
                <p className="m-auto truncate  font-open-sans text-base font-bold lg:text-sm xl:text-base">
                  {Selected.join(", ")}
                </p>
              ) : (
                <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
                  Type
                </p>
              )}
              <div className="m-auto">
                <img className="m-auto" src={down} alt="Hi"></img>
              </div>
            </div>
            <div
              className={`relative top-1 z-10 h-auto bg-white ${
                isOptionOpen5 ? "block" : "hidden"
              }`}
            >
              <Type
                opciones={type}
                handleSelectedFilter={handleSelectedFilter}
                handleSearchData={searchData}
                handleSelectedChange={handleSelectedChange}
              />
            </div>
          </div>
          <div className=" relative inline-block cursor-pointer rounded-md border md:w-10">
            <div onClick={openOption2} className="flex h-full">
              <p className="m-auto truncate font-open-sans text-base font-bold lg:text-sm xl:text-base">
                {searchData.bathrooms
                  ? "Bathrooms: " + searchData.bathrooms
                  : "Bathrooms"}
              </p>
              <div className="m-auto">
                <img className="m-auto" src={down} alt="Hi"></img>
              </div>
            </div>
            <div
              className={`relative top-1 z-10 h-auto bg-white ${
                isOptionOpen2 ? "block" : "hidden"
              }`}
            >
              <SelectBathroom
                opciones={bathrooms}
                handleSelectedFilter={handleSelectedFilter}
              />
            </div>
          </div>

          <div className=" relative inline-block cursor-pointer rounded-md border md:w-10">
            <div onClick={openOption3} className="flex h-full">
              <p className="m-auto truncate font-open-sans text-base font-bold lg:text-sm xl:text-base">
                {searchData.bedrooms
                  ? "Bedrooms: " + searchData.bedrooms
                  : "Bedrooms"}
              </p>
              <div className="m-auto">
                <img className="m-auto" src={down} alt="Hi"></img>
              </div>
            </div>
            <div
              className={`relative top-1 z-10 h-auto bg-white ${
                isOptionOpen3 ? "block" : "hidden"
              }`}
            >
              <SelectBedroom
                opciones={bedrooms}
                handleSelectedFilter={handleSelectedFilter}
              />
            </div>
          </div>
          <div className=" relative inline-block cursor-pointer rounded-md border md:w-10">
            <div onClick={openOption4} className="flex h-full">
              <p className="m-auto truncate font-open-sans text-base font-bold lg:text-sm xl:text-base">
                {searchData.price ? "$ " + searchData.price : "Price"}
              </p>
              <div className="m-auto">
                <img className="m-auto" src={down} alt="Hi"></img>
              </div>
            </div>
            <div
              className={`relative top-1 z-10 h-auto bg-white ${
                isOptionOpen4 ? "block" : "hidden"
              }`}
            >
              <Price
                opciones={price}
                handleSelectedFilter={handleSelectedFilter}
              />
            </div>
          </div>
          <div className=" flex w-cinco cursor-pointer rounded-xl border ">
            <button
              onClick={handleSearch}
              className="w-full rounded-xl bg-blue-new font-open-sans text-base font-bold text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8 mt-6 flex h-auto  justify-end  lg:hidden">
        <div
          onClick={openModal}
          className="w- flex  h-10 cursor-pointer rounded-md border  shadow-sm hover:border-black md:h-14 md:w-28"
        >
          <img className="m-auto  h-auto w-8 " src={filter} alt="Hi"></img>
          <p className="m-auto font-open-sans text-sm font-medium md:text-base">
            Filtro
          </p>
        </div>
      </div>
      <div>
        <Modal
          open={isModalOpen}
          close={closeModal}
          filterOption={filterOption}
          filterSearch={filterSearch}
          Numeros={Numeros}
          nums={nums}
          colorMap={colorMap}
          rangeSelector={rangeSelector}
          handleInputMax={handleInputMax}
          handleInputMin={handleInputMin}
          closed={closed}
          value={value}
        >
          text
        </Modal>
      </div>
      <div>
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
