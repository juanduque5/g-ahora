import React from "react";

const SelectCheckBox = ({
  opciones,
  opcionesSeleccionadas,
  handleSelectedChange,
}) => {
  return (
    <div className="flex w-full cursor-pointer flex-col  rounded-lg shadow-md">
      {opciones.map((opcion) => (
        <label
          key={opcion}
          className="m-auto flex w-90 items-center  border  border-b"
        >
          <div>
            <input
              className="h-4 w-7 cursor-pointer"
              type="checkbox"
              checked={opcionesSeleccionadas.includes(opcion)}
              onChange={() => handleSelectedChange(opcion)}
            />
          </div>
          <div className="w-full cursor-pointer border">
            <p>{opcion}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default SelectCheckBox;
