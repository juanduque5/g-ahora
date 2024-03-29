import React, { useState } from "react";
// import Modal from "react-modal";

// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
// import search from "../../images/search.png";
import filter from "../../images/filter.png";
import down from "../../images/chevron-down.png";
import SelectCheckBox from "./SelectCheckBox";
import SelectBathroom from "./selectBathroom";
import Cards from "./cards";
import times from "../../images/times.png";
// import { Select } from "@mui/material";

import Modal from "./modal";

const ListaPropiedades = ({ isAuth, userId }) => {
  //Setting Modal functionality
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const [Selected, setSelected] = useState([]);
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
  const condition = ["usado", "nuevo"];
  const ventaoRenta = ["Venta", "Renta"];
  const location = useLocation();

  const data = location.state && location.state.filterOption;
  const [searchData, setSearchData] = useState(data);
  console.log("data location", searchData);

  const handleSelectedFilter = (key) => {
    const option = key;
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
    }

    //  } else if (option === "Venta y renta") {
    //    setFilterOption({
    //      ...filterOption,
    //      uso: {
    //        ...filterOption.uso,
    //        Venta: true,
    //        Renta: true,
    //        "Venta y renta": true,
    //      },
    //    });
    //    setSelectedUso(option);
    //  } else {
    //    setFilterOption({
    //      ...filterOption,
    //      tipo: {
    //        ...filterOption.tipo,
    //        [option]: !filterOption.tipo[option],
    //      },
    //    });
    //  }
  };

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

    // console.log("option", option);
  };

  console.log("selected", Selected);

  const openModal = () => {
    setIsModalOPen(true);
  };

  const openOption = () => {
    setIsOptionOPen(!isOptionOpen);
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

  // console.log("obj", filterOption);

  return (
    <div className="ajusta">
      <div className="mb-8 mt-8 hidden h-auto  lg:block ">
        <div className=" flex h-14   flex-row gap-11 md:flex  md:gap-3">
          <div className="relative inline-block  w-1/6 cursor-pointer flex-col rounded-md border">
            <div onClick={openOption} className="flex h-full ">
              <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
                Sell or Rent
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
                handleSelectedChange={handleSelectedChange}
                handleSelectedFilter={handleSelectedFilter}
              />
            </div>
          </div>
          {/* {isOptionOpen && <SelectCheckBox opciones={ventaoRenta} />} */}

          <div className="flex  w-32.5 rounded-md border border-blue-400">
            <input className="w-11/12" type="text" id="texto" />
            <img className="m-auto cursor-pointer" src={times} alt="Hi"></img>
          </div>
          <div className=" relative inline-block cursor-pointer rounded-md border md:w-10">
            <div className="flex h-full">
              <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
                Bathrooms
              </p>
              <div className="m-auto">
                <img className="m-auto" src={down} alt="Hi"></img>
              </div>
            </div>
            <div
              className={`relative top-1 z-10 h-auto bg-white ${
                isOptionOpen ? "block" : "hidden"
              }`}
            >
              <SelectBathroom
                opciones={bathrooms}
                // handleSearchData={searchData}
                // opcionesSeleccionadas={Selected}
                // handleSelectedChange={handleSelectedChange}
                handleSelectedFilter={handleSelectedFilter}
              />
            </div>
          </div>
          <div className="flex w-10    cursor-pointer rounded-md border">
            <p className="md m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Bedrooms
            </p>
            <div className="m-auto">
              <img className="m-auto" src={down} alt="Hi"></img>
            </div>
          </div>
          <div className="flex w-cinco cursor-pointer rounded-md border">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Price
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
          </div>
          <div className=" flex w-10 cursor-pointer rounded-md border">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base ">
              Condition
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
          </div>
          <div className=" flex w-cinco cursor-pointer rounded-xl border">
            <button className="w-full rounded-xl bg-blue-new font-open-sans text-base font-bold text-white">
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
        <Cards data={data} isAuth={isAuth} userId={userId} />
      </div>
    </div>
  );
};
export default ListaPropiedades;
