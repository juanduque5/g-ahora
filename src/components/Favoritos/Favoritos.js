import React from "react";

const Favoritos = () => {
  //   useEffect(() => {
  //     // Useeffect will be use to call favorite properties depending on the id
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:2001/properties/infoById/${id}`,
  //         );
  //         if (!response.ok) {
  //           console.log(
  //             "NOT RESPONSE OK: Error al obtener datos de la propiedad",
  //           );
  //         }
  //         const data = await response.json();
  //         // console.log("data", data.data);
  //         setPropertyData(data.data[0]);
  //         setData(data.data);
  //         // Guardar la información en el estado local o hacer lo que sea necesario
  //       } catch (error) {
  //         console.error(
  //           "CATCH ERROR: Error al obtener datos de la propiedad",
  //           error,
  //         );
  //       }
  //     };

  //     fetchData();
  //   }, [id]);
  return (
    <div className="flex h-1/5 w-full justify-center border border-black">
      <p>The favorites</p>
    </div>
  );
};

export default Favoritos;
