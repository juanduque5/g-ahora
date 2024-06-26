import React from "react";

function selectBathroom({ opciones, handleSelectedFilter }) {
  return (
    <div className="  rounded-lg shadow-md">
      {opciones.map((option) => (
        <div key={option} className=" w-auto">
          <div
            onClick={() => handleSelectedFilter("bathrooms", option)}
            className="flex w-full flex-col border-b hover:bg-blue-new hover:text-white"
          >
            <p className="m-auto "> {option}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default selectBathroom;
