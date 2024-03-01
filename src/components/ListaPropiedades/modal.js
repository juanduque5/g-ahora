import React from "react";
import ReactDOM from "react-dom";
import Slider from "@mui/material/Slider";
import "./modal.css"; // Importa tus estilos CSS

export default function Modal({
  filterOption,
  filterSearch,
  open,
  close,
  Numeros,
  nums,
  colorMap,
  rangeSelector,
  handleInputMax,
  handleInputMin,
  closed,
  value,
}) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay-modal" onClick={close}></div>
      <div className="modal-content h-auto w-90">
        <button className="mb-2 ml-auto flex w-7 border" onClick={close}>
          <p className="m-auto"> X</p>
        </button>
        <div className="m-auto flex h-auto w-full flex-col border">
          <div className="flex h-auto w-full flex-col">
            {/* <div className="mb-5 flex justify-end border">
              <img
                // onClick={closeModal}
                className="h-auto w-3 cursor-pointer"
                // src={times}
                alt="Hi"  
              ></img>
            </div> */}
            <div className="mb-1 flex h-full">
              <p className="font-fira-sans font-semibold">
                Selecciona una opción o ambas:
              </p>
            </div>
            <div className="mb-3 flex h-auto flex-row gap-5">
              <div className="flex flex-row gap-5">
                <input
                  id="1"
                  className="w-4 cursor-pointer"
                  type="checkbox"
                  checked={filterOption.venta}
                  onChange={() => filterSearch("venta")}
                />
                <p className="font-open-sans">Venta</p>
              </div>
              <div className="flex flex-row gap-5">
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
            <div className="mb-1 flex h-full  ">
              <p className=" font-fira-sans font-semibold">Condicion:</p>
            </div>
            <div className="mb-3 flex h-full flex-row gap-5 ">
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
            <div className="mb-3 h-full  ">
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
            <div className="mb-3 h-full  ">
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
            <div className="mb-1 flex h-full  flex-col   md:h-auto ">
              <div className="mb-1 flex items-center justify-around ">
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
            <div className="mb-1 flex h-full  items-center  ">
              <p className="font-fira-sans font-semibold">Tipo de inmueble: </p>
            </div>
            <div className="mb-1 flex h-full  flex-col   gap-5 ">
              <div className="flex w-full">
                <div className="flex w-full flex-row gap-5  ">
                  <input
                    id="1"
                    className="w-4 cursor-pointer"
                    type="checkbox"
                    checked={filterOption.casa}
                    onChange={() => filterSearch("casa")}
                  />
                  <p className="font-open-sans ">Casa</p>
                </div>
                <div className="flex w-full flex-row gap-5 ">
                  <input
                    id="2"
                    className="w-4 cursor-pointer"
                    type="checkbox"
                    checked={filterOption.apartamento}
                    onChange={() => filterSearch("apartamento")}
                  />
                  <p className="font-open-sans ">Apartamento</p>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-full flex-row gap-5 ">
                  <input
                    id="2"
                    className="w-4 cursor-pointer"
                    type="checkbox"
                    checked={filterOption.local}
                    onChange={() => filterSearch("local")}
                  />
                  <p className="font-open-sans ">Local</p>
                </div>
                <div className="flex w-full flex-row gap-5 ">
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
            <div className="flex h-12 w-full items-end justify-between pb-1 ">
              <p
                onClick={closed}
                className=" flex cursor-pointer justify-start font-open-sans underline"
              >
                Limpiar busqueda
              </p>

              <div className="flex h-11 w-24 cursor-pointer rounded-lg border bg-blue-new">
                <p className="m-auto text-white">Buscar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
}

//     overflow-y: hidden;
// }

//   if (modal) {
//     document.body.classList.add("active-modal");
//   } else {
//     document.body.classList.remove("active-modal");
