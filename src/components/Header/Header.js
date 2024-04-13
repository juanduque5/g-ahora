import { React, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import "./Header.css";
import logo from "../../images/PROPIEADES_AHORAWEB-02.png";
import down from "../../images/chevron-down.png";
import language from "./language";
import { useSelector, useDispatch } from "react-redux"; // Importa las funciones useSelector y useDispatch
import {
  setLanguage,
  setSkeleton,
  resetSkeleton,
} from "./../../reducers/languageReducer";

const Header = ({ logged, isAuth, logoutHandler }) => {
  // console.log("isAuth", isAuth);
  // window.location.reload();
  const navigate = useNavigate();
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);

  // const newLanguage = storedLanguage;
  const dispatch = useDispatch();
  // const [skeleton, setSkeleton] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [languageOptions, setLanguageOptions] = useState(false);

  //Handle language change option1
  // const storedLanguage = localStorage.getItem("language") || "ES"; // Obtener el idioma almacenado en localStorage o establecer en español por defecto

  // const handleLanguageSelect = (newLanguage) => {
  //   localStorage.setItem("languageChange", true); // Guardar el idioma seleccionado en localStorage
  //   window.location.reload(); // Recargar la página para aplicar el nuevo idioma
  //   // localStorage.setItem("language", newLanguage); // Guardar el idioma seleccionado en localStorage

  //   dispatch(setLanguage(newLanguage));
  //   // window.location.reload(); // Recargar la página para aplicar el nuevo idioma
  // };
  //Handle language change option2
  const handleLanguageSelect = (newLanguage) => {
    // window.location.reload();
    // localStorage.setItem("languageChange", true); // Guardar el idioma seleccionado en localStorage
    setMostrarOpciones(false);

    dispatch(setSkeleton(true)); // Activar el skeleton
    dispatch(setLanguage(newLanguage)); // Cambiar el idioma después de un breve retraso

    setTimeout(() => {
      // window.location.reload();
      dispatch(resetSkeleton());
      // window.location.reload();
      // Recargar la página para aplicar el nuevo idioma
    }, 1000); // Ajusta el tiempo de retraso según sea necesario
  };
  const {
    list,
    pricing,
    vacations,
    publica,
    login,
    register,
    account,
    properties,
    catalog,
    saved,
    logout,
  } = language[storedLanguage];
  const location = useLocation();

  const handleClick = () => {
    // Navegar a la ruta solo si no estamos en /propiedades
    if (location.pathname !== "/Propiedades") {
      navigate("/Propiedades");
    }
  };
  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
    setLanguageOptions(false);
  };

  const toggleLanguage = () => {
    setLanguageOptions(!languageOptions);
    setMostrarOpciones(false);
  };

  const openMobileMenu = () => {
    setMenu(!menu);
    console.log(menu);
  };

  // const accessLogin = () => {
  //   navigate("/Login");
  //   window.location.reload();
  // };

  const handleAuth = (value) => {
    const token = localStorage.getItem("token");
    console.log("token handle", token);
    fetch("http://localhost:2001/auth/dropdown", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        if (value === "account") {
          navigate(`/Account/${data.id}`);
        } else if (value === "propiedades") {
          navigate(`/Propiedades/${data.id}`);
        } else if (value === "favoritos") {
          navigate(`/Favoritos/${data.id}`);
        } else {
          navigate(`/Catalogo/${data.id}`);
        }
        console.log("data from authenthication", data);
      })
      .catch((err) => {
        console.error("isAuth ERROR", err);
        if (err.text) {
          return err.text().then((errorMessage) => {
            console.error("Error message from server:", errorMessage);
          });
        } else {
          console.error("Error message from server:", err.message);
        }
      });
  };

  return (
    // absolute top left
    <div className="">
      <div className="header-shadow   flex h-20 w-full ">
        <div className="ajusta m-auto flex h-full w-full flex-row  ">
          <div className="m-auto flex h-3/4 w-9/12  sm:w-1/2 md:w-1/2 md:border-r  lg:w-1/2 lg:border-r xl:w-1/2 xl:border-r">
            <div className="h-auto  cursor-pointer sm:m-auto sm:ml-0 sm:w-auto md:w-auto lg:w-2/5 xl:w-2/5">
              <Link to="/">
                <img
                  className="relative bottom-3 right-20 h-18   w-auto md:w-full"
                  src={logo}
                  alt=""
                ></img>
              </Link>
            </div>
            <div
              className="m-auto hidden w-30  cursor-pointer lg:block"
              onClick={handleClick}
            >
              {skeleton ? (
                <h1 className="h-8 w-90 animate-pulse bg-gray-300 text-center text-base font-semibold">
                  {}
                </h1>
              ) : (
                <h1 className="text-center text-base font-semibold ">{list}</h1>
              )}
            </div>
            <div className="m-auto hidden w-30  cursor-pointer lg:block">
              {skeleton ? (
                <h1 className="h-8  w-90 animate-pulse bg-gray-300 text-center text-base font-semibold">
                  {}
                </h1>
              ) : (
                <h1 className="text-center text-base font-semibold">
                  <Link to="/Pricing"> {pricing}</Link>
                </h1>
              )}
            </div>
          </div>
          <div className="m-auto flex h-3/4 w-1/2 ">
            <div className="m-auto hidden w-1/2 cursor-pointer  lg:block">
              {skeleton ? (
                <p className="ml-16 h-8 animate-pulse bg-gray-300 text-base font-semibold">
                  {}
                </p>
              ) : (
                <p className="ml-16 text-base font-semibold">
                  <Link to="/Vacations">🏖️️ {vacations}</Link>
                </p>
              )}
            </div>
            <div className="m-auto hidden h-90 w-1/2  justify-end   lg:flex">
              {skeleton ? (
                <div className="m-auto hidden h-8 w-1/2  animate-pulse cursor-pointer   bg-gray-300 lg:flex lg:items-center">
                  <p className="my-auto  text-base font-bold  text-blue-new underline">
                    {}
                  </p>
                </div>
              ) : (
                <div className="hidden w-1/2 cursor-pointer   lg:flex lg:items-center">
                  <p className="my-auto  text-base font-bold text-blue-new underline">
                    {publica}
                  </p>
                </div>
              )}

              <div className="relative my-auto w-auto  md:w-2/5">
                <div className=" hidden flex-row   text-center   lg:flex ">
                  <div
                    onClick={toggleOpciones}
                    className="flex h-full w-full cursor-pointer items-center  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // width="auto"
                      // height="auto"
                      viewBox="0 0 46 46"
                      fill="none"
                      className="relative left-1 m-auto hidden h-full w-9 lg:flex xl:left-3"
                    >
                      <circle
                        cx="23"
                        cy="23"
                        r="21"
                        fill="#D9D9D9"
                        fillOpacity="0.2"
                      />
                      <circle
                        cx="23"
                        cy="23"
                        r="22"
                        stroke="black"
                        strokeOpacity="0.2"
                        strokeWidth="2"
                      />
                      <svg
                        x="10"
                        y="9"
                        xmlns="http://www.w3.org/2000/svg"
                        width="55%"
                        height="55%"
                        viewBox="0 0 22 25"
                        fill="none"
                      >
                        <path
                          d="M11 12.5C7.51339 12.5 4.71429 9.7168 4.71429 6.25C4.71429 2.83203 7.51339 0 11 0C14.4375 0 17.2857 2.83203 17.2857 6.25C17.2857 9.7168 14.4375 12.5 11 12.5ZM13.4554 14.8438C18.1696 14.8438 22 18.6523 22 23.3398C22 24.2676 21.2143 25 20.2812 25H1.66964C0.736607 25 0 24.2676 0 23.3398C0 18.6523 3.78125 14.8438 8.49554 14.8438H13.4554Z"
                          fill="black"
                          fillOpacity="0.1"
                        />
                      </svg>
                    </svg>
                    <img
                      className={`m-auto hidden h-auto w-4 select-none lg:flex ${
                        isAuth && mostrarOpciones ? "rotate-180" : "-rotate-0"
                      }`}
                      src={down}
                      alt="Hi"
                    ></img>
                  </div>

                  <div className="flex w-1/2  ">
                    {/* <div className="m-auto flex w-full">
                      <div className="m-auto w-1/2  border-r">
                        <p className="cursor-pointer">EN</p>
                      </div>
                      <div className="m-auto w-1/2 ">
                        <p className="cursor-pointer">ES</p>
                      </div>
                    </div> */}
                    <div
                      onClick={toggleLanguage}
                      className=" m-auto cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="relative left-3 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
                        />
                      </svg>
                    </div>
                    <div
                      className={`absolute  top-full z-20 hidden w-1/2 bg-white ${
                        languageOptions ? "lg:block" : "hidden"
                      }`}
                    >
                      <div className="flex flex-col rounded-lg shadow-xl">
                        <div
                          onClick={() => handleLanguageSelect("ES")}
                          className={`cursor-pointer border-b text-blue-new   ${storedLanguage === "ES" ? " bg-blue-dark text-white" : ""}`}
                        >
                          <p>ES</p>
                        </div>
                        <div
                          onClick={() => handleLanguageSelect("EN")}
                          className={`cursor-pointer border-b text-blue-new   ${storedLanguage === "EN" ? " bg-blue-dark text-white" : ""}`}
                        >
                          <p>EN</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute left-0 top-full z-20 hidden w-full bg-white ${
                      mostrarOpciones ? "lg:block" : "hidden"
                    }`}
                  >
                    {isAuth ? (
                      <div className=" rounded-md border bg-white shadow-2xl">
                        <div className="flex cursor-pointer border-b border-slate-200 bg-slate-200 font-semibold text-black-new">
                          <p className="m-auto">
                            {logged.charAt(0).toUpperCase() + logged.slice(1)}
                          </p>
                        </div>
                        <div
                          onClick={() => handleAuth("account")}
                          className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                        >
                          <p className="m-auto">{account}</p>
                        </div>
                        <div
                          onClick={() => handleAuth("propiedades")}
                          className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                        >
                          <p className="m-auto">{properties}</p>
                        </div>
                        <div
                          onClick={() => handleAuth("catalogo")}
                          className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                        >
                          <p className="m-auto">{catalog}</p>
                        </div>
                        <div
                          onClick={() => handleAuth("favoritos")}
                          className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                        >
                          <p className="m-auto">{saved}</p>
                        </div>
                        <div
                          onClick={logoutHandler}
                          className="flex cursor-pointer rounded-sm rounded-b-md border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                        >
                          <p className="m-auto">{logout}</p>
                        </div>
                      </div>
                    ) : (
                      <div className=" rounded-md border bg-white shadow-2xl">
                        <div className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white">
                          <p className="m-auto">
                            <Link to="/Login">{login}</Link>
                          </p>
                        </div>
                        <div className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white">
                          <p className="m-auto">
                            <Link to="/Register">{register}</Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* {isAuth && mostrarOpciones && ( */}
              </div>
            </div>

            <div
              onClick={openMobileMenu}
              className="menu my-auto ml-auto flex h-5 w-9 cursor-pointer flex-col justify-between border  lg:hidden "
            >
              <div
                className={` h-1 rounded-lg bg-new ${
                  menu ? "burger-bar" : "unclick"
                }`}
              ></div>
              <div
                className={` h-1 rounded-lg bg-new ${
                  menu ? "burger-bar" : "unclick"
                }`}
              ></div>
              <div
                className={` h-1 rounded-lg bg-new ${
                  menu ? "burger-bar" : "unclick"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`buu m-auto inline-block h-auto w-full select-none  lg:hidden ${
          menu ? "menu-open" : "menu-closed"
        }`}
      >
        {isAuth ? (
          <div
            className={`m-auto flex w-11/12  select-none flex-col gap-1 rounded-md border bg-gray-50   pb-3 shadow-lg transition`}
          >
            <div className=" w-full   border bg-slate-200">
              <p className="m-auto flex h-9 w-full items-center justify-center font-fira-sans font-bold text-black-new">
                {logged}
              </p>
            </div>
            <div
              onClick={() => handleAuth("account")}
              className="w-full cursor-pointer "
            >
              <p className="flex h-9 items-center justify-center border font-fira-sans font-bold   text-new3">
                {account}
              </p>
            </div>
            <div
              onClick={() => handleAuth("propiedades")}
              className="w-full cursor-pointer "
            >
              <p className="flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
                {properties}
              </p>
            </div>
            <div
              onClick={() => handleAuth("catalogo")}
              className="w-full cursor-pointer "
            >
              <p className="m-auto flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
                {catalog}
              </p>
            </div>
            <div
              onClick={() => handleAuth("favoritos")}
              className="w-full cursor-pointer "
            >
              <p className="m-auto flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
                {saved}
              </p>
            </div>
            <div
              // onClick={() => handleAuth("favoritos")}
              className="w-full cursor-pointer border bg-blue-new"
            >
              <p className="m-auto  flex h-9 w-full items-center justify-center font-fira-sans font-bold  text-white">
                {publica}
              </p>
            </div>
            <div
              onClick={logoutHandler}
              className=" w-full  cursor-pointer border bg-blue-dark"
            >
              <p className="m-auto flex h-9 w-full items-center justify-center font-fira-sans font-bold text-white">
                {logout}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`m-auto flex w-11/12  select-none flex-col gap-1 rounded-md border bg-gray-50   pb-3 shadow-lg transition`}
          >
            <div className="w-full cursor-pointer ">
              <p className="flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
                <Link to="/Publica"> {publica}</Link>
              </p>
            </div>
            <div className="w-full cursor-pointer ">
              <p className="flex h-9 items-center justify-center border font-fira-sans font-bold   text-new3">
                <Link to="/Propiedades"> {list} </Link>
              </p>
            </div>
            <div className="w-full cursor-pointer ">
              <p className="m-auto flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
                <Link to="/Vacations">🏖️️ {vacations}</Link>
              </p>
            </div>
            <div className="w-full cursor-pointer border bg-blue-new">
              <p className="m-auto  flex h-9 w-full items-center justify-center font-fira-sans font-bold  text-white">
                <Link to="/Login">{login}</Link>
              </p>
            </div>
            <div className=" w-full  cursor-pointer border bg-blue-dark">
              <p className="m-auto flex h-9 w-full items-center justify-center font-fira-sans font-bold text-white">
                {register}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
