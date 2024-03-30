import React from "react";

function type({
  opciones,
  handleSelectedFilter,
  handleSearchData,
  handleSelectedChange,
}) {
  return (
    <div className="  rounded-lg shadow-md">
      {opciones.map((option) => (
        <label key={option} className="flex  w-full flex-row gap-3  border-b">
          <input
            className=" w-5 border"
            type="checkbox"
            checked={handleSearchData.tipo[option]}
            onChange={() => {
              handleSelectedFilter(option);
              handleSelectedChange(option);
            }}
          />
          <p className="flex w-full select-none items-center">{option}</p>
        </label>
      ))}
    </div>
  );
}

export default type;
