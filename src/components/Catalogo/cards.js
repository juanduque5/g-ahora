import React from "react";
import car from "../../images/car.png";
import house from "../../images/house.png";
import bath from "../../images/bath.png";
import bed from "../../images/bed.png";
import { useState } from "react";

export const Cards = (props) => {
  const { lista } = props;
  //   const infoH = [{}];
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Número de elementos por página

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Calcula el número total de páginas
  const totalPages = Math.ceil(lista.length / itemsPerPage);

  //
  // Función para generar los números de página a mostrar
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  };

  // Calcula el índice del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtra los datos para mostrar solo los elementos de la página actual
  const currentProperties = lista.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="">
      <div className="grid h-auto grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {currentProperties.map((info, index) => (
          <div
            // onClick={() => redirect(info)}
            className="h-500  w-full   cursor-pointer flex-col    rounded-lg   shadow-md md:w-full  "
            key={index}
          >
            <div className="relative h-3/5 ">
              <div className="absolute left-0 top-0 bg-black p-2 text-white opacity-60">
                {info.uso}
              </div>

              <img
                className="m-auto h-full w-full rounded-t-lg"
                src={info.imageURL}
                alt="Hi"
              ></img>
            </div>
            <div className="flex h-2/5 justify-center ">
              <div className="m-auto flex h-44  w-11/12 flex-col ">
                <div className=" flex h-full ">
                  <p className="m-auto ml-0 font-open-sans text-lg font-bold md:text-lg lg:text-xl xl:text-xl">
                    {info.tipo}
                  </p>
                </div>
                <div className=" flex h-full ">
                  <p className="m-auto  ml-0 font-open-sans text-lg font-bold md:text-lg lg:text-22 xl:text-22">
                    $ {info.precio.toLocaleString() + " "}{" "}
                    <span className="text-gray-new">{info.currency}</span>
                  </p>
                </div>
                <div className=" flex h-full ">
                  <p className="m-auto ml-0 font-open-sans text-base font-normal text-gray-new md:text-lg lg:text-xl xl:text-xl">
                    {info.municipio}
                  </p>
                </div>
                <div className=" flex h-full flex-row ">
                  <div className="flex w-1/5  ">
                    <img
                      className="m-auto ml-0 mr-2 h-5 w-5"
                      src={bed}
                      alt="Hi"
                    ></img>
                    <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                      {info.habitaciones}
                    </p>
                  </div>
                  <div className="flex w-1/5 ">
                    <img
                      className="m-auto  ml-0 mr-2 h-5 w-5 "
                      src={bath}
                      alt="Hi"
                    ></img>
                    <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                      {info.banos}
                    </p>
                  </div>
                  <div className="flex w-1/5 ">
                    <img
                      className="m-auto ml-0 mr-2 h-5 w-5"
                      src={car}
                      alt="Hi"
                    ></img>
                    <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                      {info.estacionamientos}
                    </p>
                  </div>
                  <div className="flex w-2/5 ">
                    <img
                      className="m-auto ml-0 mr-2 h-5 w-5 "
                      src={house}
                      alt="Hi"
                    ></img>
                    <p className="m-auto ml-0 text-base md:text-base lg:text-lg xl:text-xl">
                      {info.area}m²
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-5 mt-5 flex justify-center">
        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            className={`mx-1 rounded-lg bg-blue-500 px-3 py-1 text-white ${
              number === currentPage ? "bg-blue-700" : ""
            }`}
            onClick={() => handlePageChange(number)}
            disabled={number === "..."}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;
