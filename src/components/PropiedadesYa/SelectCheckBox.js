import React from "react";

const SelectCheckBox = ({
  opciones,
  opcionesSeleccionadas,
  handleSelectedChange,
  type,
  handleSelected,
}) => {
  return (
    <div className="flex w-full cursor-pointer flex-col  rounded-lg shadow-md">
      {opciones.map((option) => (
        <label
          key={option}
          className="m-auto flex h-8 w-95 items-center border-b "
        >
          <div>
            <input
              className="mt-1 h-5 w-7 cursor-pointer"
              type="checkbox"
              checked={
                type
                  ? opcionesSeleccionadas.tipo[option]
                  : opcionesSeleccionadas.uso[option]
              }
              onChange={() => {
                handleSelectedChange(option);
                if (type) {
                  handleSelected(option);
                }
              }}
            />
          </div>
          <div className="w-full cursor-pointer ">
            <p>{option}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default SelectCheckBox;
