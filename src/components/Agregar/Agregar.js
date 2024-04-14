import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import "./Agregar.css";

import househ from "../../images/househ.png";
import land from "../../images/land.png";
import apartment from "../../images/apartment.png";
import business from "../../images/business-goal.png";
import sell from "../../images/sell.png";
import rent from "../../images/rent.png";
import Modal from "./modal";
import { useSelector } from "react-redux";
import language from "./language";

const Agregar = ({ logged }) => {
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const {
    casa,
    apartamento,
    local,
    lote,
    venta,
    renta,
    cancelar,
    properties,
    selecione,
    which,
    next,
  } = language[storedLanguage];
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState({
    Casa: false,
    Apartamento: false,
    Local: false,
    Lote: false,
    Venta: false,
    Renta: false,
  });

  const [Option, setOption] = useState({
    Venta: false,
    Renta: false,
  });

  const { id } = useParams();
  console.log("id-id", id);

  useEffect(() => {
    if (!logged) {
      navigate("/");
    }
    return () => {};
  }, [logged, navigate]); // Dependencias que activarán el efecto

  const accessAgregar = () => {
    const selectedOption = Object.keys(filterOption).find(
      (key) => filterOption[key],
    );
    const selectedOption2 = Object.keys(Option).find((key) => Option[key]);
    if (selectedOption && selectedOption2) {
      navigate(`/Detalles/${id}/${selectedOption}`, {
        state: { selectedOption2 },
      });
    } else {
      openModal();
      setError("Please select both options");
    }
  };

  const accessAccount = () => {
    navigate("/");
    window.location.reload();
  };

  const filterSearch = (option, type) => {
    const updatedFilterOption = {};

    // Set the selected option to true and others to false
    Object.keys(filterOption).forEach((key) => {
      updatedFilterOption[key] = key === option ? true : false;
    });

    setFilterOption(updatedFilterOption);
  };

  const filterSearch2 = (option, type) => {
    const updatedFilterOption = {};

    // Set the selected option to true and others to false
    Object.keys(Option).forEach((key) => {
      updatedFilterOption[key] = key === option ? true : false;
    });

    setOption(updatedFilterOption);
  };

  const openModal = () => {
    setIsModalOPen(true);
  };
  const closeModal = () => {
    setIsModalOPen(false);
  };

  console.log(filterOption);

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
          <div className="mt-6 h-550 animate-pulse bg-gray-300"></div>
        </div>
      ) : (
        <div className="ajusta flex flex-col">
          <div className="  mb-12 mt-12 ">
            <div className="flex h-auto w-full justify-between ">
              <div className="flex">
                <p className=" m-auto font-semibold">{properties}</p>
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

          <div className="  flex h-auto flex-col border">
            <div className=" flex h-20 w-full border">
              <p className="m-auto font-semibold">{selecione}</p>
            </div>
            <div className="m-auto flex h-auto w-full flex-wrap items-center justify-center gap-4 border md:h-52 md:flex-row">
              <div
                onClick={() => filterSearch("Casa")}
                className={`flex cursor-pointer flex-col border p-5 hover:border-blue-new ${
                  filterOption.Casa ? "myBorder" : ""
                } `}
              >
                <img src={househ} className="m-auto" alt="Hi"></img>
                <p className="m-auto">{casa}</p>
              </div>
              <div
                onClick={() => filterSearch("Apartamento")}
                className={`flex cursor-pointer flex-col border pb-5 pl-1 pr-1 pt-5 hover:border-blue-new ${
                  filterOption.Apartamento ? "myBorder" : ""
                } `}
              >
                <img src={apartment} className="m-auto" alt="Hi"></img>
                <p className="m-auto">{apartamento}</p>
              </div>
              <div
                onClick={() => filterSearch("Local")}
                className={`flex cursor-pointer flex-col border p-5 hover:border-blue-new ${
                  filterOption.Local ? "myBorder" : ""
                } `}
              >
                <img src={business} className="m-auto" alt="Hi"></img>
                <p className="m-auto">{local}</p>
              </div>
              <div
                onClick={() => filterSearch("Lote")}
                className={`flex cursor-pointer flex-col border p-5 hover:border-blue-new ${
                  filterOption.Lote ? "myBorder" : ""
                } `}
              >
                <img src={land} className="m-auto" alt="Hi"></img>
                <p className="m-auto">{lote}</p>
              </div>
            </div>
            <div className="borde m-auto h-auto w-full flex-col">
              <div className=" flex h-20 w-full border">
                <p className="m-auto font-semibold">{which}</p>
              </div>
              <div className="m-auto flex h-52 w-full flex-row items-center justify-center gap-4 border">
                <div
                  onClick={() => filterSearch2("Venta")}
                  className={`flex cursor-pointer flex-col border p-5 hover:border-blue-new ${
                    Option.Venta ? "myBorder" : ""
                  } `}
                >
                  <img src={sell} className="m-auto" alt="Hi"></img>
                  <p className="m-auto">{venta}</p>
                </div>
                <div
                  onClick={() => filterSearch2("Renta")}
                  className={`flex cursor-pointer flex-col border p-5 hover:border-blue-new ${
                    Option.Renta ? "myBorder" : ""
                  } `}
                >
                  <img src={rent} className="m-auto" alt="Hi"></img>
                  <p className="m-auto">{renta}</p>
                </div>
              </div>

              <div className="flex">
                <button
                  onClick={accessAgregar}
                  className="m-auto rounded-lg bg-blue-new p-4 text-white"
                >
                  {next}
                </button>
              </div>
            </div>
          </div>
          <Modal open={isModalOpen} close={closeModal} error={error} />
        </div>
      )}
    </>
  );
};
export default Agregar;
