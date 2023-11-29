import React from "react";

function SelectCheckbox({
  opciones,
  opcionesSeleccionadas,
  handleOpcionChange,
}) {
  return (
    <div>
      <h3>Selecciona opciones:</h3>
      {opciones.map((opcion) => (
        <label key={opcion}>
          <input
            type="checkbox"
            checked={opcionesSeleccionadas.includes(opcion)}
            onChange={() => handleOpcionChange(opcion)}
          />
          {opcion}
        </label>
      ))}
    </div>
  );
}

export default SelectCheckbox;
