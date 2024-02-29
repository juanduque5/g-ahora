import React, { useState } from "react";
// import Modal from "react-modal";
import Slider from "@mui/material/Slider";
// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

// import search from "../../images/search.png";
import filter from "../../images/filter.png";
import down from "../../images/chevron-down.png";
import SelectCheckBox from "./SelectCheckBox";
import times from "../../images/times.png";
// import { Select } from "@mui/material";
import "./ListaPropiedades.css";
import Modal from "./modal";

const ListaPropiedades = () => {
  //Setting Modal functionality
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const [Selected, setSelected] = useState([]);
  const [value, setValue] = useState([0, 10000]);
  const Numeros = [1, 2, 3, 4, 5, 6, "Cualquiera"];
  const ventaoRenta = ["Venta", "Renta", "alquiler", "cualquiera"];

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
      <div className="mb-8 mt-8 hidden h-auto border border-red-600 lg:block ">
        <div className=" flex h-14   flex-row gap-11 md:flex  lg:gap-6 xl:gap-6">
          <div className="relative inline-block  w-1/6 cursor-pointer flex-col rounded-md border">
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
              className={`relative z-10 h-auto border bg-white ${
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
          {/* {isOptionOpen && <SelectCheckBox opciones={ventaoRenta} />} */}

          <div className="flex  w-32.5 rounded-md border border-blue-400">
            <input className="w-11/12" type="text" id="texto" />
            <img className="m-auto cursor-pointer" src={times} alt="Hi"></img>
          </div>
          <div className="flex w-cinco cursor-pointer rounded-md border">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Banos
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
          </div>
          <div className="flex w-cinco cursor-pointer rounded-md border">
            <p className="md m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Cuartos
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
          </div>
          <div className="flex w-cinco cursor-pointer rounded-md border">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Precio
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
          </div>
          <div className=" flex w-10 cursor-pointer rounded-md border">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base ">
              Condicion
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
          </div>
          <div className=" flex w-cinco cursor-pointer rounded-md border">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base ">
              Ciudad
            </p>
            <img className="m-auto" src={down} alt="Hi"></img>
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
        <Modal open={isModalOpen} close={closeModal}>
          text
        </Modal>
        {/* <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Establece el color de fondo del overlay
            },
            content: {
              width: "auto", // Ancho por defecto
              height: "60%", // Altura por defecto
              margin: "auto", // Para centrar el modal horizontalmente
              overflowX: "scroll", // Agrega scroll horizontal si es necesario
              maxWidth: "40%",
            },
          }}
        > */}

        {/* <div className="m-auto flex  h-auto w-full flex-col border ">
              <div className="flex h-auto w-full flex-col">
                <div className="mb-5 flex justify-end ">
                  <img
                    onClick={closeModal}
                    className="h-auto w-3 cursor-pointer"
                    src={times}
                    alt="Hi"
                  ></img>
                </div>
                <div className=" flex h-full  ">
                  <p className=" font-fira-sans font-semibold">
                    Selecciona una opción o ambas:
                  </p>
                </div>
                <div className="mb-5 flex h-auto flex-row gap-5  ">
                  <div className="flex flex-row gap-5  ">
                    <input
                      id="1"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.venta}
                      onChange={() => filterSearch("venta")}
                    />
                    <p className="font-open-sans ">Venta</p>
                  </div>
                  <div className="flex flex-row gap-5 ">
                    <input
                      id="2"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.renta}
                      onChange={() => filterSearch("renta")}
                    />
                    <p className="font-open-sans">Renta</p>
                  </div>
                </div>
                <div className=" flex h-full  ">
                  <p className=" font-fira-sans font-semibold">Condicion:</p>
                </div>
                <div className="mb-5 flex h-full flex-row gap-5 ">
                  <div className="flex flex-row gap-5  ">
                    <input
                      id="1"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.nuevo}
                      onChange={() => filterSearch("nuevo")}
                    />
                    <p className="font-open-sans">Nuevo</p>
                  </div>
                  <div className="flex flex-row gap-5 ">
                    <input
                      id="2"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.usado}
                      onChange={() => filterSearch("usado")}
                    />
                    <p className="font-open-sans">Usado</p>
                  </div>
                </div>
                <div className=" h-full  ">
                  <p className="font-fira-sans font-semibold">Cuartos: </p>
                </div>
                <div className="mb-5 flex flex-row gap-3 ">
                  {Numeros.map((numeros) => (
                    <p
                      className={`flex w-8 cursor-pointer justify-center border hover:bg-blue-new hover:text-white ${
                        filterOption.cuartos === numeros
                          ? "bg-blue-new text-white"
                          : ""
                      }`}
                      key={numeros}
                      style={{
                        // backgroundColor:
                        //   filterOption.cuartos === numeros ? "#1D80F5" : "",
                        // color:
                        //   filterOption.cuartos === numeros ? "white" : "black",
                        // hover: "white",
                        width: colorMap[numeros]
                          ? "auto"
                          : "" || nums[numeros]
                            ? "100%"
                            : "",
                      }}
                      onClick={() => filterSearch(numeros, "cuartos")}
                    >
                      {numeros}
                    </p>
                  ))}
                </div>
                <div className=" h-full  ">
                  <p className="font-fira-sans font-semibold">Baños: </p>
                </div>
                <div className="mb-5 flex  flex-row gap-3 ">
                  {Numeros.map((numeros) => (
                    <p
                      className={`flex w-8 cursor-pointer justify-center border hover:bg-blue-new hover:text-white ${
                        filterOption.banos === numeros
                          ? "bg-blue-new text-white"
                          : ""
                      }`}
                      key={numeros}
                      style={{
                        // backgroundColor:
                        //   filterOption.banos === numeros ? "#1D80F5" : "",
                        // color: filterOption.banos === numeros ? "white" : "black",

                        width: colorMap[numeros]
                          ? "auto"
                          : "" || nums[numeros]
                            ? "100%"
                            : "",
                      }}
                      onClick={() => filterSearch(numeros, "banos")}
                    >
                      <span className="hover:text-white"> {numeros} </span>
                    </p>
                  ))}
                </div>
                <div className=" flex  h-full items-center">
                  <p className="font-fira-sans font-semibold">Precio: </p>
                </div>
                <div className="relative  flex w-full ">
                  <Slider
                    value={value}
                    onChange={rangeSelector}
                    className="ml-2"
                    valueLabelDisplay="auto"
                    min={0} // Establece el valor mínimo
                    max={10000} // Establece el valor máximo (10,000 en este caso)
                  />
                </div>
                <div className="flex h-full  flex-col  border md:h-auto ">
                  <div className="flex items-center justify-around ">
                    <p className="font-open-sans font-semibold">Min:</p>
                    <input
                      className="ml-1 h-11 rounded-md border md:h-11"
                      type="text"
                      id="price"
                      name="price"
                      value={value[0] ? value[0].toLocaleString() : ""}
                      onChange={handleInputMin}
                      placeholder="$ Precio minimo"
                    />
                  </div>
                  <div className="flex items-center justify-around ">
                    <p className="font-open-sans font-semibold">Max:</p>

                    <input
                      className=" ml-1 h-11 rounded-md border md:h-11"
                      type="text"
                      id="price"
                      name="price"
                      value={
                        value[1] > 10000
                          ? "10,000"
                          : "" || value[1]
                            ? value[1].toLocaleString()
                            : ""
                      }
                      onChange={handleInputMax}
                      placeholder="$ Precio maximo"
                    />
                  </div>
                </div>
                <div className="flex h-full items-center ">
                  <p className="font-fira-sans font-semibold">
                    Tipo de inmueble:{" "}
                  </p>
                </div>
                <div className="mb-3 flex  h-full flex-col gap-5 ">
                  <div className="flex flex-row gap-5  ">
                    <input
                      id="1"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.casa}
                      onChange={() => filterSearch("casa")}
                    />
                    <p className="font-open-sans ">Casa</p>
                  </div>
                  <div className="flex flex-row gap-5 ">
                    <input
                      id="2"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.apartamento}
                      onChange={() => filterSearch("apartamento")}
                    />
                    <p className="font-open-sans ">Apartamento</p>
                  </div>
                  <div className="flex flex-row gap-5 ">
                    <input
                      id="2"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.local}
                      onChange={() => filterSearch("local")}
                    />
                    <p className="font-open-sans ">Local</p>
                  </div>
                  <div className="flex flex-row gap-5 ">
                    <input
                      id="2"
                      className="w-4 cursor-pointer"
                      type="checkbox"
                      checked={filterOption.lote}
                      onChange={() => filterSearch("lote")}
                    />
                    <p className="font-open-sans ">Lote</p>
                  </div>
                </div>
              </div>
              <div className="flex h-14 w-full items-end justify-between border ">
                <p
                  onClick={closed}
                  className=" flex cursor-pointer justify-start font-open-sans underline"
                >
                  Limpiar busqueda
                </p>

                <div className="flex h-11 w-28 cursor-pointer rounded-lg border bg-blue-new">
                  <p className="m-auto text-white">Buscar</p>
                </div>
              </div>
            </div> */}
      </div>
    </div>
  );
};
export default ListaPropiedades;
