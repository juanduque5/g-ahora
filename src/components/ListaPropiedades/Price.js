import React from "react";

function Price({ opciones, handleSelectedFilter }) {
  return (
    <div className="  rounded-lg shadow-md">
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
  );
}

export default Price;
