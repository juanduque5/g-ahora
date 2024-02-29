import React, { useState, useEffect, useCallback } from "react";
import down from "../../images/chevron-down.png";
import SelectCheckBox from "./selectOption";
import Cards from "./cards";
import { useNavigate, useParams } from "react-router-dom";

const Favoritos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOptionOpen, setIsOptionOPen] = useState(false);
  const ventaoRenta = ["Venta", "Renta"];
  const [Selected, setSelected] = useState([]);
  const [properties, setProperties] = useState([]);
  const openOption = () => {
    setIsOptionOPen(!isOptionOpen);
  };

  const redirect = (info) => {
    console.log("id", info.id);
    // fill(info);
    navigate(`/PropertyInfo/${info.id}`);
  };

  const handleSelectedChange = (option) => {
    if (Selected.includes(option)) {
      const newSelected = Selected.filter((items) => items !== option);
      console.log("newSelected", newSelected);
      if (newSelected[0] === undefined) {
        setSelected([]);
      } else {
        setSelected([...newSelected]);
      }
    } else {
      setSelected([...Selected, option]);
    }

    // console.log("option", option);
  };
  useEffect(() => {
    // Useeffect will be use to call favorite properties depending on the id
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:2001/properties/allFavoritePropertiesByUser/${id}`,
        );
        if (!response.ok) {
          console.log(
            "NOT RESPONSE OK: Error al obtener datos de la propiedad",
          );
        }
        const data = await response.json();
        // console.log("data", data.data);
        setProperties(data.favoriteProperties);

        // Guardar la información en el estado local o hacer lo que sea necesario
      } catch (error) {
        console.error(
          "CATCH ERROR: Error al obtener datos de la propiedad",
          error,
        );
      }
    };

    fetchData();
  }, [id]);

  const handleHeartClick = useCallback(
    (event, index, propertyId) => {
      event.stopPropagation();
      const updateHeartColors = [...properties];
      console.log(updateHeartColors);
      updateHeartColors[index].favorito_id =
        !updateHeartColors[index].favorito_id;
      setProperties(updateHeartColors);
      updateFavorites(propertyId, id, updateHeartColors[index].favorito_id);

      //(PENDING) crear if/else si esta autenticado y el userId no es null para poder activar el favorito
    },
    [id, properties],
  );

  const updateFavorites = async (propertyId, userId, isLiked) => {
    console.log("isLiked", isLiked);
    try {
      const response = await fetch(
        `http://localhost:2001/properties/favorites/${propertyId}/${userId}`, // Suponiendo que este sea el endpoint para marcar favorito
        {
          method: isLiked ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json", // Especificar el tipo de contenido si envías datos en formato JSON
          },
        },
      );
      if (!response.ok) {
        console.log(
          "NOT RESPONSE OK: Error al marcar la propiedad como favorita",
        );
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(
        "CATCH ERROR: Error al marcar la propiedad como favorita",
        error,
      );
    }
  };

  return (
    <div className=" ajusta flex h-auto w-full flex-col justify-center ">
      <div className="mt-9 flex h-12 w-full ">
        <p className="m-auto text-xl font-bold">Favoritos</p>
      </div>
      <div className="mb-7 mt-8 flex h-auto w-full items-center">
        <div className="  h-12 w-44 cursor-pointer border">
          <div onClick={openOption} className="flex h-full  ">
            <p className="m-auto font-open-sans text-base font-bold lg:text-sm xl:text-base">
              Venta o alquiler
            </p>
            <div className="m-auto">
              <img
                className={`m-auto ${isOptionOpen ? "rotate-180" : "rotate-0"}`}
                src={down}
                alt="Hi"
              ></img>
            </div>
          </div>
          <div
            className={`relative z-10 w-full border bg-white ${
              isOptionOpen ? "block" : "hidden"
            }`}
          >
            <SelectCheckBox
              opciones={ventaoRenta}
              opcionesSeleccionadas={Selected}
              handleSelectedChange={handleSelectedChange}
            />
          </div>
        </div>

        <div className={`ml-auto ${!properties.length ? "hidden" : "block"}`}>
          <p>Resultados: {properties.length}</p>
        </div>
      </div>
      <div className="">
        <Cards
          properties={properties}
          handleHeartClick={handleHeartClick}
          redirect={redirect}
        />
      </div>
    </div>
  );
};

export default Favoritos;
