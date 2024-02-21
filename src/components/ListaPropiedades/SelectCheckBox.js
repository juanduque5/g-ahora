import React from "react";

function SelectCheckbox({
  opciones,
  opcionesSeleccionadas,
  handleSelectedChange,
}) {
  return (
    <div className="  rounded-lg shadow-md">
      {opciones.map((opcion) => (
        <label
          key={opcion}
          className="flex h-9 w-full flex-row gap-3  border-b"
        >
          <input
            className=" w-5 border"
            type="checkbox"
            checked={opcionesSeleccionadas.includes(opcion)}
            onChange={() => handleSelectedChange(opcion)}
          />
          <p className="flex w-full select-none items-center border">
            {opcion}
          </p>
        </label>
      ))}
    </div>
  );
}

export default SelectCheckbox;
