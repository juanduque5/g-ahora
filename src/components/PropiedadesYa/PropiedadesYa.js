import React from "react";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
import down from "../../images/chevron-down.png";
import "./PropiedadesYa.css";

const PropiedadesYa = () => {
  // const opciones = ["Opción 1", "Opción 2", "Opción 3"];
  // const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  // const handleSeleccionarOpcion = (e) => {
  //   setOpcionSeleccionada(e.target.value);
  // };
  return (
    <div className="ajusta">
      <div
        className="h-530 lg:h-786 xl:h-786 m-auto  mb-16 mt-8 flex w-full  rounded-3xl  md:w-full"
        id="imageFilter"
      >
        <div className="m-auto flex h-5/6 w-11/12 flex-col ">
          <div className="flex h-2/5 w-full flex-col ">
            <div className="my-auto flex   w-full">
              <p className="font-fira-sans m-auto  text-2xl font-extrabold not-italic text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl">
                <span className="text-yellow-new">Encuentra</span> o{" "}
                <span className="text-yellow-new"> promociona </span>
                tu propiedad en PropiedadesAhora ✌️
              </p>
            </div>
          </div>
          <div className="h-1/5 ">
            <p className="font-open-sans mb-3  text-sm font-semibold not-italic text-white md:hidden">
              Tu elección segura para el éxito en bienes raíces en Guatemala.
            </p>
            <p className="font-open-sans hidden text-sm font-semibold not-italic  text-white sm:text-base md:block md:text-base lg:text-3xl xl:text-3xl 2xl:text-3xl">
              Tu elección segura para el éxito en bienes raíces en Guatemala.
              Únete a nosotros y toma el control de tu futuro inmobiliario.
            </p>
          </div>
          <div className="aqui  flex h-auto w-full   sm:w-full md:h-1/6 lg:h-1/4 xl:h-1/4">
            <div className="m-auto hidden h-20  border md:block md:w-full lg:block lg:w-11/12 xl:block xl:w-11/12">
              <div className="m-auto flex  h-20 w-full rounded-lg bg-white ">
                <div className="flex w-1/2 cursor-pointer flex-row border-r">
                  <div className=" flex h-full w-2/5 cursor-pointer border-r ">
                    <p className="font-open-sans m-auto text-center text-sm font-bold md:text-sm lg:text-base xl:text-base">
                      venta y alquiler
                    </p>
                    <img className="m-auto" src={down} alt="Hi"></img>
                  </div>
                  <div className=" m-auto flex w-3/5 cursor-pointer ">
                    <p className="font-open-sans m-auto text-sm font-bold md:text-sm lg:text-base xl:text-base">
                      Cualquier tipo de inmueble
                    </p>
                    <img className="m-auto" src={down} alt="Hi"></img>
                  </div>
                </div>
                <div className="flex w-1/2 cursor-pointer flex-row ">
                  <div className=" m-auto flex w-1/2 cursor-pointer ">
                    <p className="font-open-sans m-auto text-sm font-bold md:text-sm lg:text-base xl:text-base">
                      Cualquier propiedad{" "}
                    </p>
                    <img className="m-auto" src={down} alt="Hi"></img>
                  </div>
                  <div className="bg-blue-new m-auto mr-2 flex h-16 w-1/2 cursor-pointer rounded-xl ">
                    <p className="font-fira-sans m-auto text-center text-sm font-bold text-white md:text-sm lg:text-base xl:text-base">
                      BUSCAR PROPIEDADES
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex h-56 w-full flex-col  md:hidden">
              <div className="flex h-full justify-center  ">
                <div className="hover:border-blue-new m-auto flex h-5/6 w-full cursor-pointer border-2 bg-white">
                  <p className="font-open-sans m-auto text-center text-base font-bold">
                    Venta o Alquiler
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center  ">
                <div className="hover:border-blue-new m-auto flex h-5/6 w-full cursor-pointer border-2 bg-white">
                  <p className="font-open-sans m-auto text-center text-base font-bold">
                    Tipo de inmueble
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center  ">
                <div className=" hover:border-blue-new m-auto flex h-5/6 w-full cursor-pointer  border-2 bg-white">
                  <p className="font-open-sans m-auto text-center text-base font-bold">
                    Lugar
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center ">
                <div className="bg-blue-new m-auto flex h-5/6 w-full cursor-pointer rounded-xl">
                  <p className="font-fira-sans m-auto text-center text-base font-bold text-white ">
                    Buscar Propiedad
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-15 flex w-full justify-center">
            <p className="font-open-sans m-auto text-xl font-semibold text-white">
              Encuentra lo que buscas
            </p>
          </div>
        </div>
      </div>
      {/* <div>
        <label>Selecciona una opción:</label>
        <select value={opcionSeleccionada} onChange={handleSeleccionarOpcion}>
          <option value="">Selecciona una opción</option>
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
        {opcionSeleccionada && <p>Opción seleccionada: {opcionSeleccionada}</p>}
      </div> */}
    </div>
  );
};
export default PropiedadesYa;
