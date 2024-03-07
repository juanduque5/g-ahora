import { React, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Modal from "./modal";
const Detalles = ({ logged, isAuth, logoutHandler }) => {
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOPen] = useState(false);
  const { id, selectedOption } = useParams();
  const [files, setFiles] = useState([]);
  const [numFiles, setNumFiles] = useState(0);
  const { selectedOption2 } = state || {};
  const [autoComplete, setAutoComplete] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState([]);
  const [error2, setError2] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");

  const [info, setInfo] = useState({
    ciudad: "",
    barrio: "",
    description: "",
    habitaciones: "",
    banos: "",
    estacionamientos: "",
    area: "",
    estado: "usado",
    direccion: "",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!logged) {
  //     navigate("/");
  //   }
  //   return () => {};
  // }, [logged, navigate]); // Dependencias que activarán el efecto

  const accessAccount = () => {
    navigate("/");
    window.location.reload();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //handling all input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (!isNaN(value) && name === "habitaciones") ||
      (!isNaN(value) && name === "banos") ||
      (!isNaN(value) && name === "estacionamientos") ||
      (!isNaN(value) && name === "area")
    ) {
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (
      name === "ciudad" ||
      name === "barrio" ||
      name === "description"
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
    }
  };

  //Selecting all the files(pictures) and updating its constants
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setNumFiles((prevNumFiles) => prevNumFiles + selectedFiles.length);
  };

  console.log("files:", files);
  console.log("info", info);

  //Sending all information required to the backend
  const uploadInfo = async (info) => {
    const errorKeys = [];
    try {
      // if (files.length === 0) {
      //   alert("Selecciona al menos una imagen.");
      //   return;
      // }

      console.log("info obj", info.ciudad.length > 0 ? info.ciudad : "nada");

      for (const key in info) {
        if (info.hasOwnProperty(key)) {
          if (info[key].length === 0 && numFiles < 5) {
            console.log("numfiles si", numFiles);
            errorKeys.push(key);
            setError2("You need at least 5 photos");
          } else if (info[key].length === 0) {
            errorKeys.push(key);
            setError2("");
          } else if (numFiles < 5) {
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

      // const formData = new FormData();
      // formData.append("prueba", "Hola, esto es una prueba");

      // Agrega datos específicos
      // formData.append("ciudad", info.ciudad);
      // formData.append("barrio", info.barrio);
      // formData.append("description", info.description);
      // formData.append("habitaciones", info.habitaciones);
      // formData.append("banos", info.banos);
      // formData.append("estacionamientos", info.estacionamientos);
      // formData.append("area", info.area);
      // formData.append("estado", info.estado);
      // formData.append("tipo", selectedOption);
      // formData.append("id", id);
      // formData.append("uso", selectedOption2);

      // Verifica si files contiene archivos válidos
      // if (files.some((file) => file instanceof File)) {
      //   // Agrega archivos al FormData
      //   files.forEach((file, index) => {
      //     console.log(`Agregando archivo ${index}:`, file);
      //     formData.append("imagen", file);
      //   });

      //   console.log("Claves del FormData:", [...formData.keys()]);
      //   console.log("id:", formData.get("id"));
      //   console.log("Ciudad:", formData.get("ciudad"));
      //   console.log("Barrio:", formData.get("barrio"));
      //   console.log("Imagen 0:", formData.get("imagen"));

      //   const response = await fetch(
      //     "http://localhost:2001/properties/properties",
      //     {
      //       method: "POST",
      //       body: formData,
      //     },
      //   );
      //   if (!response.ok) {
      //     console.log("error");
      //   }

      //   Resto del código...
      // } else {
      //   alert("La lista de archivos no contiene elementos válidos.");
      // }
    } catch (error) {
      console.log("ERROR", error);
      // Handle error as needed
    }
  };

  console.log(error);

  //handling autoserach to call autoComplete fetch
  const handleSearch = (e) => {
    const textInput = e.target.value;
    setSearchAddress(textInput);
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
      setInfo({
        ...info,
        direccion: place,
      });
      setIsListOPen(false);

      const result = await response.json();
      console.log(result);
      const location = result;
      setCoordinates([location]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("isAuth", isAuth);
  console.log(autoComplete);
  console.log("coordinates", coordinates);
  console.log("info.address", info.direccion);

  return (
    <div className="ajusta flex flex-col">
      <div className="mb-12 mt-12">
        <div className="flex h-auto w-full justify-between ">
          <div className="flex">
            <p className=" m-auto font-semibold">Nueva propiedad</p>
          </div>
          <div>
            <button
              onClick={accessAccount}
              className="rounded-md border border-blue-new p-3"
            >
              <p className="font-semibold text-blue-new">Cancelar</p>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className=" flex h-auto flex-col border">
          <div className="flex justify-start">
            <p className="font-medium">Datos principales</p>
          </div>
          <div className="flex h-96 w-full flex-col border md:h-72  md:flex-row">
            <div className="order-2 flex w-full flex-col border md:order-1 md:w-67">
              <div className="flex h-auto flex-col border md:h-1/2 md:flex-row">
                <div className="flex w-full flex-col border md:w-1/2">
                  <div className="flex h-1/2 items-center border">
                    <p className="font-semibold">Ciuadad:</p>
                  </div>
                  <div className="flex h-1/2 items-center border">
                    <select
                      name="ciudad"
                      value={info.ciudad}
                      onChange={handleChange}
                      className="h-8 w-95 rounded-md border border-gray-400 md:h-3/5"
                    >
                      <option value="Alta Verapaz">Alta Verapaz</option>
                      <option value="Baja Verapaz">Baja Verapaz</option>
                      <option value="Chimaltenango">Chimaltenango</option>
                      <option value="Chiquimula">Chiquimula</option>
                      <option value="El Peten">El Peten</option>
                      <option value="Escuintla">Escuintla</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Huehuetenango">Huehuetenango</option>
                      <option value="Izabal">Izabal</option>
                      <option value="Jalapa">Jalapa</option>
                      <option value="Jutiapa">Jutiapa</option>
                      <option value="Quetzaltenango">Quetzaltenango</option>
                      <option value="Quiche">Quiche</option>
                      <option value="Retalhuleu">Retalhuleu</option>
                      <option value="Sacatepequez">Sacatepequez</option>
                      <option value="San Marcos">San Marcos</option>
                      <option value="Santa Rosa">Santa Rosa</option>
                      <option value="Solola">Solola</option>
                      <option value="Suchitepequez">Suchitepequez</option>
                      <option value="Totonicapan">Totonicapan</option>
                      <option value="Zacapa">Zacapa</option>
                    </select>
                  </div>
                </div>
                <div className="flex w-full flex-col border md:w-1/2">
                  <div className="flex h-1/2 items-center border">
                    <p className=" font-semibold">Area: </p>
                  </div>
                  <div className="flex h-1/2 items-center border">
                    <input
                      name="barrio"
                      value={info.barrio}
                      onChange={handleChange}
                      type="text"
                      placeholder="Ex. Zona 17"
                      className="h-8 w-95  rounded-md border border-gray-400 p-1 md:h-3/5"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="flex h-full flex-col border md:h-3/5">
                <div className="h-auto border">
                  <p className="font-semibold">Description:</p>
                </div>
                <div
                  style={{
                    height: "100%",
                    border: "1px solid #ccc",
                    padding: "8px",
                    overflowY: "auto",
                  }}
                >
                  <textarea
                    name="description"
                    value={info.description}
                    onChange={handleChange}
                    style={{
                      width: "99%",
                      height: "90%",
                      maxHeight: "90%",
                      borderRadius: "4px",
                      border: "1px solid rgb(156 163 175)",
                      padding: "8px",
                      boxSizing: "border-box",
                      resize: "none", // Evitar que se redimensione
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="order-1 flex h-2/4 w-full border md:order-2 md:h-full md:w-33">
              <div className="m-auto h-4/6 w-11/12 cursor-pointer flex-col border border-dashed border-gray-600 bg-slate-100 md:h-5/6">
                <div className=" flex h-1/2 w-full flex-col border">
                  <input
                    className="m-auto w-1/2 "
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>

                <div className=" flex h-1/2 w-full items-center justify-center border">
                  <p className="flex w-full justify-center   text-black">
                    Fotos selecionadas: {numFiles}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex h-auto w-full flex-col border md:h-72">
            <div className="h-10 border">
              <p className="font-semibold">Detalles</p>
            </div>
            <div className="flex h-1/2 flex-col border md:flex-row">
              <div className="flex w-full flex-col border">
                <div className="flex h-1/2 items-center border">
                  <p className="font-semibold">Habitaciones:</p>
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
                  <p className="font-semibold">Banos:</p>
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
                  <p className="font-semibold">Estacionamientos:</p>
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
                  <p className="font-semibold">
                    Area construccion en metros cuadrados:
                  </p>
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
                  <p className="font-semibold">Estado:</p>
                </div>
                <div className="flex h-1/2 items-center border">
                  <select
                    name="estado"
                    value={info.estado}
                    onChange={handleChange}
                    className="h-8 w-95 rounded-md border border-gray-400 md:h-3/5"
                  >
                    <option value="usado">Usado</option>
                    <option value="nuevo">Nuevo</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full flex-col border md:w-4/12">
                <div className="flex h-1/2 items-center border">
                  <p className="font-semibold">Ubicación:</p>
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
                    className={`relative  z-10 m-auto  max-h-48 w-95 cursor-pointer overflow-y-auto  bg-white shadow-xl ${
                      isListOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="">
                      {autoComplete.map((suggestion) => (
                        <div key={suggestion.place_id}>
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

      <div className="mb-6">
        <div className="ajusta flex ">
          <button
            onClick={() => uploadInfo(info)}
            className="m-auto rounded-lg border bg-blue-new p-4 "
          >
            <p className="text-md font-semibold text-white">Crear</p>
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
