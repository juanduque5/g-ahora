import React from "react";

function SelectCheckbox({
  opciones,
  opcionesSeleccionadas,
  handleSelectedChange,
  handleSelectedFilter,
  handleSearchData,
}) {
  return (
    <div className="  rounded-lg shadow-md">
      {opciones.map((option) => (
        <label
          key={option}
          className="flex h-9 w-full flex-row gap-3  border-b"
        >
          <input
            className=" w-5 border"
            type="checkbox"
            checked={handleSearchData.uso[option]}
            onChange={() => {
              handleSelectedChange(option);
              handleSelectedFilter(option);
            }}
          />
          <p className="flex w-full select-none items-center border">
            {option}
          </p>
        </label>
      ))}
    </div>
  );
}

export default SelectCheckbox;
