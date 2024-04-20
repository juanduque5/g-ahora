import { React, useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   ZoomControl,
// } from "react-leaflet";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import language from "./language";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import Modal from "./modal";
const Detalles = () => {
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const {
    ubicacionMapa,
    estado,
    areaConstruccion,
    estacionamientos,
    banos,
    habitaciones,
    precio,
    descripcion,
    detalles,
    municipio,
    departamento,
    datosPrincipales,
    nuevaPropiedad,
    total,
    crear,
    cancelar,
    selecionar,
    donot,
    nuevo,
    usado,
  } = language[storedLanguage];

  const geoKey = process.env.REACT_APP_GEO_KEY;
  console.log("here", geoKey);
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOPen] = useState(false);
  const { id, selectedOption } = useParams();
  const [files, setFiles] = useState([]);
  const { selectedOption2 } = state || {};
  const [autoComplete, setAutoComplete] = useState([]);
  // const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState([]);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [open, setIsOpen] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  const mapId = process.env.REACT_APP_MAP_ID;

  const [info, setInfo] = useState({
    departamento: "Guatemala",
    municipio: "",
    description: "",
    habitaciones: "",
    banos: "",
    estacionamientos: "",
    area: "",
    estado: "usado",
    //
    direccion: "",
    currency: "USD",
    precio: "",
    coordinates: { lat: 14.6349, lng: -90.5069 },
    lat: 14.6349,
    lng: -90.5069,
  });

  const navigate = useNavigate();

  //  const [filterOptionEn, setFilterOptionEn] = useState({
  //    tipo: {
  //      House: false,
  //      Apartment: false,
  //      "Land lot": false,
  //      Premises: false,
  //    },
  //    uso: {
  //      Sell: false,
  //      Rent: false,
  //      "Sell and Rent": true,
  //    },
  //  });

  ////////////////////

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    return () => {};
  }, [token, navigate]);

  const accessAccount = () => {
    navigate("/");
    window.location.reload();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //request departamentos, and M...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:2001/properties/departamentos/geo",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDepartamentos(data.departamentos);

        console.log("departamentos", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //find the municipios according to the info.ciudad value
  console.log(info);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await fetch(
          `http://localhost:2001/properties/municipios/${info.departamento}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMunicipios(data.municipios);
        // setDepartamentos(data.departamentos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMunicipios();
  }, [info.departamento]);

  //handling all input text, updates info keys
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "habitaciones" && !isNaN(value) && value >= 0 && value <= 9) ||
      (name === "banos" && !isNaN(value) && value >= 0 && value <= 9) ||
      (name === "estacionamientos" &&
        !isNaN(value) &&
        value >= 0 &&
        value <= 9) ||
      (!isNaN(value) && name === "area")
    ) {
      const rawValue = value.replace(/[^\d]/g, "");
      setInfo({
        ...info,
        [name]: rawValue,
      });
    } else if (
      name === "municipio" ||
      name === "description"
      // ||
      // name === "currency"
    ) {
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (name === "estado") {
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (name === "direccion") {
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (name === "precio") {
      // const formattedValue = Number(value).toLocaleString(); // Formatear el valor con comas
      if (value.includes(".") || value.includes(",")) {
        setError3("No utilizar comma or punto");
      } else {
        setError3("");
      }
      const rawValue = value.replace(/[^\d]/g, "");
      setInfo({
        ...info,
        [name]: rawValue,
      });
    } else if (name === "departamento") {
      setInfo({
        ...info,
        [name]: value,
        municipio: "",
      });
    }
  };

  //Delete image from files array
  const deleteImage = (value) => {
    const arrayObjects = files.filter(
      (file) => file.name !== value && file.lastModified !== value.lastModified,
    );

    setFiles([...arrayObjects]);
  };

  //Selecting all the files(pictures) and updating its constants
  const handleFileChange = (e) => {
    const limit = 5;
    const length = files.length;
    const setLimit = limit - length;
    const selectedFiles = Array.from(e.target.files).slice(0, setLimit);
    console.log("selectedFiles", selectedFiles);

    // Filter only type(image) files
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );
    // Verificar duplicados
    const areDuplicates = imageFiles.some((selectedFile) =>
      files.some((file) => file.name === selectedFile.name),
    );

    // Si hay duplicados, filtrar archivos únicos
    let uniqueFiles = [];
    if (areDuplicates) {
      // Filtrar los archivos únicos
      uniqueFiles = imageFiles.filter((selectedFile) =>
        files.every((file) => file.name !== selectedFile.name),
      );
    } else {
      // Si no hay duplicados, todos los archivos en imageFiles son únicos
      uniqueFiles = imageFiles;
    }

    // Insertar archivos únicos en el estado
    uniqueFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles((prevFiles) => [file, ...prevFiles]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ""; // Limpiar el valor del input file para permitir selecciones adicionales
  };

  console.log("files:", files);

  // console.log("precio", info.precio);

  //Sending all information required to the backend
  const uploadInfo = async (info) => {
    const errorKeys = [];
    try {
      //Check if any key in the obj is empty and/or files length is incorrect
      for (const key in info) {
        if (info.hasOwnProperty(key)) {
          if (info[key].length === 0 && files.length < 5) {
            // console.log("numfiles si", numFiles);
            errorKeys.push(key);
            setError2("You need at least 5 photos");
          } else if (info[key].length === 0) {
            errorKeys.push(key);
            setError2("");
          } else if (files.length < 5) {
            setError("");
            setError2("You need at least 5 photos");
            setIsModalOpen(true);
          }
        }
      }
      setError(errorKeys);
      if (errorKeys.length > 0) {
        setIsModalOpen(true);
      }

      if (errorKeys.length === 0 && isModalOpen === false) {
        const formData = new FormData();
        formData.append("prueba", "Hola, esto es una prueba");

        //Agrega datos específicos
        formData.append("departamento", info.departamento);
        formData.append("municipio", info.municipio);
        formData.append("description", info.description);
        formData.append("habitaciones", info.habitaciones);
        formData.append("banos", info.banos);
        formData.append("estacionamientos", info.estacionamientos);
        formData.append("area", info.area);
        formData.append("estado", info.estado);
        formData.append("tipo", selectedOption);
        formData.append("id", id);
        formData.append("uso", selectedOption2);
        formData.append("direccion", info.direccion);
        formData.append("currency", info.currency);
        formData.append("precio", info.precio);
        // formData.append("coordinates", info.coordinates);
        formData.append("lat", info.lat);
        formData.append("lng", info.lng);

        //Verifica si files contiene archivos válidos
        if (files.some((file) => file instanceof File)) {
          // Agrega archivos al FormData
          files.forEach((file, index) => {
            console.log(`Agregando archivo ${index}:`, file);
            formData.append("imagen", file);
          });

          console.log("Claves del FormData:", [...formData.keys()]);
          console.log("id:", formData.get("id"));
          console.log("Ciudad:", formData.get("ciudad"));
          console.log("Barrio:", formData.get("barrio"));
          console.log("Imagen 0:", formData.get("imagen"));

          const response = await fetch(
            "http://localhost:2001/properties/properties",
            {
              method: "POST",
              body: formData,
            },
          );
          if (!response.ok) {
            console.log("error");
          }
        }

        //Resto del código...
      } else {
        console.log("La lista de archivos no contiene elementos válidos.");
      }
    } catch (error) {
      console.log("ERROR", error);
      // Handle error as needed
    }
  };

  //handling autoserach to call autoComplete fetch
  const handleSearch = (e) => {
    const textInput = e.target.value;
    setSearchAddress(textInput);
    setIsOpen(false);
  };

  //Handling autoComplete
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `http://localhost:2001/properties/maps/api/place/autocomplete/json?input=${searchAddress}`,
        );

        const data = await response.json();
        setAutoComplete(data.predictions);
        setIsListOPen(true);
      } catch (error) {
        console.error("Error message from autoComplete:", error);
      }
    };

    handleSearch(); // Llamar a handleSearch cuando el componente se monta inicialmente
  }, [searchAddress]); // handleSearch se ejecutará cada vez que el valor de input cambie

  //Handling latitude location
  const handleSelectSuggestion = async (id, place) => {
    try {
      const response = await fetch(
        `http://localhost:2001/properties/maps/api/geocode/json?place_id=${id}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsListOPen(false);
      const result = await response.json();
      const { lat, lng } = result; // Extraer las coordenadas del resultado
      // setCoordinates({ lat, lng });

      setInfo({
        ...info,
        direccion: place,
        coordinates: { lat, lng },
        lat: lat,
        lng: lng,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("isAuth", isAuth);
  // console.log(autoComplete);
  // console.log("coordinates", coordinates.lat, coordinates.lng);
  // console.log("info", info.coordinates.lat);
  // console.log("info.address", info.direccion);

  return (
    <>
      {skeleton ? (
        <div className="ajusta mt-11  ">
          <div className="mb-12 mt-12 h-14  animate-pulse bg-gray-300 ">
            <div className="flex h-auto w-full justify-between ">
              <div className="flex"></div>
              <div></div>
            </div>
          </div>
          <div className="mt-6 h-650 animate-pulse bg-gray-300"></div>
        </div>
      ) : (
        <div className="ajusta flex flex-col">
          <div className="mb-12 mt-12">
            <div className="flex h-auto w-full justify-between ">
              <div className="flex">
                <p className=" m-auto font-semibold">{nuevaPropiedad}</p>
              </div>
              <div>
                <button
                  onClick={accessAccount}
                  className="rounded-md border border-blue-new p-3"
                >
                  <p className="font-semibold text-blue-new">{cancelar}</p>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className=" flex h-auto flex-col border">
              <div className="flex justify-start">
                <p className="font-medium">{datosPrincipales}</p>
              </div>
              <div className="flex h-auto w-full flex-col border md:h-72  md:flex-row">
                <div className="order-2 flex w-full flex-col border md:order-1 md:w-67">
                  <div className="flex h-auto flex-col border md:h-1/2 md:flex-row">
                    <div className="flex w-full flex-col border md:w-1/2">
                      <div className="flex h-1/2 items-center border">
                        <p className="font-semibold">{departamento}</p>
                      </div>
                      <div className="flex h-1/2 items-center border">
                        <select
                          name="departamento"
                          value={info.departamento}
                          onChange={handleChange}
                          className="h-11 max-h-8 w-95 overflow-y-auto rounded-md border border-gray-400 md:h-3/5 "
                        >
                          {departamentos.map((departamento, index) => (
                            <option key={index}>{departamento}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex w-full flex-col border md:w-1/2">
                      <div className="flex h-1/2 items-center border">
                        <p className=" font-semibold">{municipio} </p>
                      </div>
                      <div className="flex h-1/2 items-center border">
                        <select
                          name="municipio"
                          value={info.municipio}
                          onChange={handleChange}
                          className="h-11 max-h-8 w-95 overflow-y-auto rounded-md border border-gray-400 md:h-3/5 "
                        >
                          <option value="">{selecionar}</option>{" "}
                          {municipios.map((municipio, index) => (
                            <option key={index} value={municipio}>
                              {municipio}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex  h-full w-full flex-col border border-blue-500 md:h-3/5 md:flex-row">
                    <div className="flex w-full flex-col border md:w-1/2">
                      <div className="border">
                        <p className="font-semibold">{descripcion}</p>
                      </div>
                      <div
                        className="h-full w-95 "
                        // style={{
                        //   height: "100%",
                        //   border: "1px solid #ccc",
                        //   padding: "8px",
                        //   overflowY: "auto",
                        // }}
                      >
                        <textarea
                          name="description"
                          className="h-full w-full resize-none rounded-md border border-gray-400"
                          value={info.description}
                          onChange={handleChange}
                          // style={{
                          //   width: "99%",
                          //   height: "90%",
                          //   maxHeight: "90%",
                          //   borderRadius: "4px",
                          //   border: "1px solid rgb(156 163 175)",
                          //   padding: "8px",
                          //   boxSizing: "border-box",
                          //   resize: "none", // Evitar que se redimensione
                          // }}
                        />
                      </div>
                    </div>
                    <div className="flex w-full flex-col border border-green-300 md:w-1/2">
                      <div className="flex w-full border border-red-600">
                        <div>
                          <p className="font-semibold">{precio}: </p>
                        </div>

                        {error3 && (
                          <div>
                            <p className="m-auto ml-1 text-red-500">{donot}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex h-full w-full items-center gap-2 border">
                        <div className="w-full">
                          <input
                            name="precio"
                            value={info.precio}
                            onChange={handleChange}
                            className="h-9 w-full rounded-md border border-gray-400"
                            placeholder="Ex. 100000"
                          />
                        </div>
                        <div className="flex w-30 ">
                          {/* <select
                        name="currency"
                        value={info.currency}
                        onChange={handleChange}
                        className="h-9 w-80 rounded-md border border-gray-400 "
                      >
                        <option>GTQ</option>
                        <option>USD</option>
                      </select> */}
                          <p className="font-mono text-lg font-semibold ">
                            USD
                          </p>
                        </div>
                      </div>
                      <p>{"$ " + Number(info.precio).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 flex h-2/4 w-full border md:order-2 md:h-full md:w-33">
                  <div className="m-auto h-90 w-11/12 cursor-pointer flex-col border border-dashed border-gray-600 bg-slate-100 md:h-5/6">
                    <div className=" flex h-2/5 w-full flex-col  md:h-1/4">
                      <input
                        className="m-auto w-1/2 "
                        type="file"
                        onChange={handleFileChange}
                        disabled={files.length >= 5 ? true : false}
                        multiple
                      />
                    </div>

                    <div className=" flex h-3/5 w-full flex-col  md:h-75">
                      <div>
                        <p className="flex w-full justify-center font-semibold  text-black">
                          {total}: {files.length}
                        </p>
                      </div>
                      <div className="h-95 max-h-72  overflow-y-auto border">
                        {files.map((files, index) => (
                          <div className="flex gap-2 border" key={index}>
                            <div className="h-40 w-70">
                              <img
                                className="h-full w-full"
                                src={
                                  typeof files === "string"
                                    ? files
                                    : URL.createObjectURL(files)
                                }
                                alt=""
                              ></img>
                            </div>
                            <div
                              onClick={() => deleteImage(files.name)}
                              className="flex w-30 items-center justify-center "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4 fill-red-200"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex h-auto w-full flex-col border border-yellow-400 md:h-72">
                <div className="h-10 border">
                  <p className="font-semibold">{detalles}</p>
                </div>
                <div className="flex h-1/2 flex-col border md:flex-row">
                  <div className="flex w-full flex-col border">
                    <div className="flex h-1/2 items-center border">
                      <p className="font-semibold">{habitaciones}:</p>
                    </div>
                    <div className="flex h-1/2 items-center border">
                      <input
                        name="habitaciones"
                        value={info.habitaciones}
                        onChange={handleChange}
                        type="text"
                        className="h-3/5 w-95  rounded-md border border-gray-400 p-1 "
                        placeholder="#"
                      ></input>
                    </div>
                  </div>
                  <div className="flex w-full flex-col border">
                    <div className="flex h-1/2 items-center border">
                      <p className="font-semibold">{banos}: </p>
                    </div>
                    <div className="flex h-1/2 items-center border">
                      <input
                        name="banos"
                        value={info.banos}
                        onChange={handleChange}
                        type="text"
                        className="h-3/5 w-95 rounded-md border border-gray-400 p-1"
                        placeholder="#"
                      ></input>
                    </div>
                  </div>
                  <div className="flex w-full flex-col border">
                    <div className="flex h-1/2 items-center border">
                      <p className="font-semibold">{estacionamientos}:</p>
                    </div>
                    <div className="flex h-1/2 items-center border">
                      <input
                        name="estacionamientos"
                        value={info.estacionamientos}
                        onChange={handleChange}
                        type="text"
                        className="h-3/5 w-95 rounded-md border border-gray-400 p-1"
                        placeholder="#"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex h-1/2 flex-col border md:flex-row">
                  <div className="flex w-full flex-col border md:w-4/12">
                    <div className="flex h-1/2 items-center border">
                      <p className="font-semibold">{areaConstruccion}:</p>
                    </div>
                    <div className="flex h-1/2 items-center border">
                      <input
                        name="area"
                        value={info.area}
                        onChange={handleChange}
                        type="text"
                        className="h-3/5 w-95 rounded-md border border-gray-400 p-1"
                        placeholder="#"
                      ></input>
                    </div>
                  </div>
                  <div className="flex w-full flex-col border md:w-4/12">
                    <div className="flex h-1/2 items-center border">
                      <p className="font-semibold">{estado}:</p>
                    </div>
                    <div className="flex h-1/2 items-center border">
                      <select
                        name="estado"
                        value={info.estado}
                        onChange={handleChange}
                        className="h-8 w-95 rounded-md border border-gray-400 md:h-3/5"
                      >
                        <option value="usado">{usado}</option>
                        <option value="nuevo">{nuevo}</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex w-full flex-col border md:w-4/12">
                    <div className="flex h-1/2 items-center border">
                      <p className="font-semibold">{ubicacionMapa}:</p>
                    </div>
                    <div className="h-1/2 w-full ">
                      <div className="flex h-full items-center border">
                        <input
                          name="direccion"
                          placeholder=""
                          type="text"
                          value={info.direccion}
                          onChange={(e) => {
                            handleChange(e);
                            handleSearch(e);
                          }}
                          className="h-8  w-95 rounded-md border border-gray-400 md:h-3/5 "
                        ></input>
                      </div>
                      <div
                        className={`relative  z-20  max-h-48 w-95 cursor-pointer overflow-y-auto  bg-white shadow-xl ${
                          isListOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="">
                          {autoComplete.map((suggestion, index) => (
                            <div key={index}>
                              <div
                                onClick={() =>
                                  handleSelectSuggestion(
                                    suggestion.place_id,
                                    suggestion.description,
                                  )
                                }
                                className="border hover:bg-slate-100 hover:text-blue-new"
                              >
                                <p> {suggestion.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="z-10 mb-2 w-full border">
            <div>
              <APIProvider apiKey={apiKey}>
                <div style={{ height: "400px", width: "100%", margin: "auto" }}>
                  <Map
                    defaultZoom={13} // Aquí cambiamos zoom a defaultZoom
                    center={info.coordinates}
                    mapId={mapId}
                    de
                  >
                    <AdvancedMarker
                      onClick={() => setIsOpen(true)}
                      position={info.coordinates}
                      defalt
                    ></AdvancedMarker>
                    {open && (
                      <InfoWindow
                        position={info.coordinates}
                        onCloseClick={() => setIsOpen(false)}
                      >
                        {info.direccion}
                      </InfoWindow>
                    )}
                  </Map>
                </div>
              </APIProvider>
            </div>
          </div>

          <div className="mb-6">
            <div className="ajusta flex ">
              <button
                onClick={() => uploadInfo(info)}
                className="m-auto w-28 rounded-lg border bg-blue-new p-4 "
              >
                <p className="text-lg font-semibold text-white">{crear}</p>
              </button>
            </div>
          </div>
          <Modal
            open={isModalOpen}
            close={closeModal}
            error={error}
            error2={error2}
          />
        </div>
      )}
    </>
  );
};
export default Detalles;
// const handleUpload = () => {
//   const formData = new FormData();
//   files.forEach((file, index) => {
//     formData.append(`imagen${index}`, file);
//   });

//   const properData0 = {
//     method: "POST",
//     headers: {
//       // No uses "application/json" para FormData, utiliza "multipart/form-data"
//       "Content-Type": "multipart/form-data",
//     },
//     body: formData, // No necesitas JSON.stringify para FormData
//   };

//   fetch("http://localhost:2001/properties/properties", properData0)
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then((errorData) => {
//           console.log(errorData);
//         });
//       }

//       return response.json();
//     })
//     .then((data) => {

//       console.log("Property data:", data);
//     })
//     .catch((error) => {
//       console.log("ERROR", error);
//     });
// };
