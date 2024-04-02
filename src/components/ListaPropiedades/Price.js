import React from "react";

function Price({ opciones, handleSelectedFilter, handleSearchData }) {
  return (
    <div className="  rounded-lg shadow-md">
      <div className="flex justify-center border-b">
        <p>$ USD</p>
      </div>
      {handleSearchData.uso["Renta"] ? (
        <div className="flex w-auto flex-col ">
          <div className=" ">
            <p>Precio min:</p>
          </div>
          <div className="w-full">
            <input
              onChange={(event) =>
                handleSelectedFilter("min", event.target.value)
              }
              value={handleSearchData.minPrice}
              className="w-full rounded-md border border-blue-new focus:outline-none "
              type="text"
            ></input>
          </div>
          <div className=" ">
            <p>Precio max:</p>
          </div>
          <div className="w-full ">
            <input
              value={handleSearchData.maxPrice}
              onChange={(event) =>
                handleSelectedFilter("max", event.target.value)
              }
              className="w-full rounded-md  border border-blue-new focus:outline-none  "
              type="text"
            ></input>
          </div>
        </div>
      ) : (
        <div>
          {opciones.map((option) => (
            <div key={option} className=" w-full">
              <div
                onClick={() => handleSelectedFilter("price", option)}
                className="flex w-full flex-col justify-center border-b hover:bg-blue-new hover:text-white"
              >
                <div className="flex justify-center">
                  <p className="m-auto"> {option}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Price;
