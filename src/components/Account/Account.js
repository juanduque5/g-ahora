import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import "./Account.css";
// import deletee from "../../images/deletee.png";
// // import down from "../../images/chevron-down.png";
// import plus from "../../images/plus.png";
// import edit from "../../images/edit.png";
import language from "./language";

import { useSelector } from "react-redux";

const Account = ({ isAuth }) => {
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const { properties, add, edit2, days } = language[storedLanguage];
  const [lista, setLista] = useState([]);
  const { id } = useParams();
  const [button, setButton] = useState(null);
  console.log("jaja", isAuth);
  console.log("id daddy", id);

  const navigate = useNavigate();

  const accessAgregar = () => {
    navigate(`/Agregar/${id}`);
  };

  //if logged if false, return to home page, change for token
  useEffect(() => {
    if (isAuth === false) {
      navigate("/");
    }
    return () => {};
  }, [isAuth, navigate]); // Dependencias que activarán el efecto

  useEffect(() => {
    // Lógica para llamar al backend y obtener la información basada en el ID
    // Puedes utilizar una función asíncrona y gestionar el estado local para la información
    // Ejemplo:
    const fetchLista = async () => {
      try {
        const response = await fetch(
          `http://localhost:2001/properties/allPropertiesByUser/${id}`,
        );
        if (!response.ok) {
          console.log(
            "NOT RESPONSE OK: Error al obtener datos de las propiedades",
          );
        }
        const data = await response.json();
        console.log("data", data.propertiesById);
        console.log(data);
        setLista(data.propertiesById);
        setButton(data.button);
        localStorage.setItem("freeplan", data.button);
        console.log(data.button);

        // Guardar la información en el estado local o hacer lo que sea necesario
      } catch (error) {
        console.error(
          "CATCH ERROR: Error al obtener datos de las propiedades",
          error,
        );
      }
    };

    fetchLista();
  }, [id]);

  //redirect to edit page
  const redirect = (info) => {
    navigate(`/Edit/${info.id}`);
  };

  // const deleteProperty = async (info) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:2001/properties/deletePropertyById/${id}`,
  //       {
  //         method: "DELETE", // Método HTTP DELETE
  //         headers: {
  //           "Content-Type": "application/json", // Tipo de contenido JSON
  //         },
  //         body: JSON.stringify(info), // Convertir la información a JSON y enviar en el cuerpo de la solicitud
  //       },
  //     );
  //     if (!response.ok) {
  //       throw new Error("Error al eliminar propiedad");
  //     }
  //     console.log("Propiedad eliminada exitosamente");
  //     // Realizar acciones adicionales después de eliminar la propiedad, si es necesario
  //   } catch (error) {
  //     console.error("Error al eliminar propiedad:", error);
  //   }
  // };

  console.log("isAuth", isAuth);
  console.log("lista", lista);

  // Función para calcular los días restantes desde 30 días
  const calcularDiasRestantes = (joindate) => {
    const fechaJoindate = new Date(joindate);
    const fechaActual = new Date();
    const diferenciaMs = fechaActual - fechaJoindate;
    let diasRestantes = Math.floor(
      (30 * 24 * 60 * 60 * 1000 - diferenciaMs) / (1000 * 60 * 60 * 24),
    );

    // Si quedan menos de 0 días, establecer en 0
    if (diasRestantes < 0) {
      diasRestantes = 0;
    }
    // Si quieres establecer un máximo de 30 días, descomenta la siguiente línea
    // diasRestantes = Math.min(diasRestantes, 30);

    return diasRestantes;
  };

  return (
    <div className="ajusta">
      {skeleton ? (
        <div className="mt-12 h-850 animate-pulse bg-gray-300"></div>
      ) : (
        <div className="mt-12">
          <div className="flex h-auto w-full justify-between ">
            <div className="flex">
              <p className=" m-auto font-semibold">
                {properties}: {lista.length > 0 ? lista.length : 0}
              </p>
            </div>
            <div>
              <button
                disabled={button}
                onClick={accessAgregar}
                className={`flex flex-row rounded-md bg-blue-new p-3 ${button ? "cursor-not-allowed  opacity-30" : "cursor-pointer"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-1 h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                <p className=" font-semibold text-white">{add}</p>
              </button>
            </div>
          </div>
          <div
            className=" mt-12 flex h-auto max-h-dvh
         flex-col gap-1 overflow-y-auto "
          >
            {lista.map((info, index) => (
              <div
                key={index}
                className="flex h-auto flex-row  gap-6 border shadow-md"
              >
                <div className="w-30 ">
                  <img
                    loading="lazy"
                    className="m-auto h-28 w-full rounded-t-lg"
                    src={info.imageURL}
                    alt="Hi"
                  ></img>
                </div>
                <div className="flex w-10/12 flex-col justify-start ">
                  <div className="flex h-full font-semibold">
                    {info.tipo === "Casa" && storedLanguage === "ES"
                      ? "Casa"
                      : info.tipo === "Apartamento" && storedLanguage === "ES"
                        ? "Apartamento"
                        : info.tipo === "Lote" && storedLanguage === "ES"
                          ? "Lote"
                          : info.tipo === "Local" && storedLanguage === "ES"
                            ? "Local"
                            : info.tipo === "Casa" && storedLanguage === "EN"
                              ? "House"
                              : info.tipo === "Apartamento" &&
                                  storedLanguage === "EN"
                                ? "Apartment"
                                : info.tipo === "Lote" &&
                                    storedLanguage === "EN"
                                  ? "Land lot"
                                  : info.tipo === "Local" &&
                                      storedLanguage === "EN"
                                    ? "Premises"
                                    : ""}
                  </div>
                  <div className="flex h-full text-gray-400">
                    {info.municipio}
                  </div>
                  <div className="flex h-full font-semibold">
                    $ {info.precio.toLocaleString()}
                  </div>
                </div>
                <div className="mr-2 flex w-1/4  flex-row ">
                  <div className="m-auto w-full font-medium text-gray-400 ">
                    {days}{" "}
                    <span className="text-black">
                      {" "}
                      {calcularDiasRestantes(info.joindate)}{" "}
                    </span>
                  </div>
                  <button
                    onClick={() => redirect(info)}
                    className="m-auto flex gap-3 rounded-lg border p-3 shadow-md"
                  >
                    <div>
                      <p className="font-mono text-lg font-semibold  text-slate-900">
                        {edit2}
                      </p>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 fill-gray-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </div>
                  </button>
                  {/* <button
                  onClick={() => deleteProperty(info)}
                  className="m-auto rounded-lg  border p-2 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 fill-red-200 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <div className=" mt-12 flex h-96 flex-col gap-1  ">
        <div className="flex h-1/4 flex-row  gap-6 border shadow-md">
          <div className=" w-20 border">jaja</div>
          <div className="flex w-10/12 flex-col justify-start ">
            <div className="flex h-full font-semibold">
              Hermosa casa con vista al mar
            </div>
            <div className="flex h-full text-gray-k">Ciudad guatemala</div>
            <div className="flex h-full font-semibold">$ 38,00000</div>
          </div>
          <div className="flex w-10 flex-row gap-1">
            <button className="m-auto flex rounded-lg border p-2 shadow-md">
              <img
                className="m-auto  flex h-6 w-6 select-none"
                src={edit}
                alt="Hi"
              ></img>
            </button>
            <button className="m-auto rounded-lg  border p-2 shadow-md">
              <img
                className="m-auto  flex h-6 w-6 select-none"
                src={deletee}
                alt="Hi"
              ></img>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Account;
