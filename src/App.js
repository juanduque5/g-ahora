import React, { Component } from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PropiedadesYa from "./components/PropiedadesYa/PropiedadesYa";
import Cards from "./components/Cards/Cards";
import PropiedadesYaS from "./components/PropiedadesYaS/PropiedadesYaS";
import Footer from "./components/Footer/Footer";
import Publica from "./components/Publica/Publica";
import ListaPropiedades from "./components/ListaPropiedades/ListaPropiedades";
import Info from "./components/Info/Info";
import Vacations from "./components/Vacations/Vacations";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Reset from "./components/Reset/Reset";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Account from "./components/Account/Account";
import Agregar from "./components/Agregar/Agregar";
import Detalles from "./components/Detalles/Detalles";
import Profile from "./components/Profile/Profile";
import Catalogo from "./components/Catalogo/Catalogo";
import Landing from "./components/Landing/Landing";
import Favoritos from "./components/Favoritos/Favoritos";
import Edit from "./components/Edit/Edit";
import InfoVacation from "./components/InfoVacation/info";
import Search from "./components/Search/Search";

// import image5 from "./images/image5.png";
// import image6 from "./images/image6.png";
// import image7 from "./images/image7.png";
//

// import MainB from "./components/MainB/MainB";
// import MainF from "./components/MainF/MainF";
// import MainS from "./components/MainS/MainS";
// import MainHalfF from "./components/MainHalfF/MainHalfF";
// import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      properties: [],
      new: {},
      token: null,
      expiryDate: null,
      isAuth: false,
      userId: null,
      reload: true,
      first: null,
      last: null,
      email: null,
    };
  }

  componentDidMount() {
    // const languageChangeValue =
    //   localStorage.getItem("languageChange") === "true";
    // if (languageChangeValue) {
    //   console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    //   this.setState({ skeleton: true }); // Actualizar el estado de skeleton
    //   setTimeout(() => {
    //     this.setState({ skeleton: false });
    //     console.log("2");
    //   }, 2000);
    //   localStorage.removeItem("languageChange");
    // }
    console.log("App componentDidMount");

    // this.fetchData();

    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
    });
    // console.log("expiryDate componentDidMount", expiryDate);
    // console.log("TOKEN IN APP:", token);
    // console.log("remainingMilliseconds", remainingMilliseconds);

    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.setState({
      isAuth: false,
      token: null,
      userId: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("first");
    localStorage.removeItem("last");
    localStorage.removeItem("email");

    window.location.reload();
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  render() {
    const { isAuth, userId } = this.state;

    const storedLanguage = localStorage.getItem("language");
    if (!storedLanguage) {
      localStorage.setItem("language", "ES"); // Establecer el idioma predeterminado en español si no hay ninguno almacenado
      window.location.reload(); // Recargar la página para aplicar el nuevo idioma
    }

    console.log("language", storedLanguage);

    const first = localStorage.getItem("first");
    const last = localStorage.getItem("last");
    const email = localStorage.getItem("email");
    const url = localStorage.getItem("url");
    const wnumber = localStorage.getItem("wnumber");
    const phone = localStorage.getItem("phone");

    const whatsappValue = localStorage.getItem("whatsapp");

    // Obtener el valor de Instagram del almacenamiento local
    const instagramValue = localStorage.getItem("instagram");

    // Obtener el valor de Facebook del almacenamiento local
    const facebookValue = localStorage.getItem("facebook");

    // Obtener el valor de TikTok del almacenamiento local
    const tiktokValue = localStorage.getItem("tiktok");

    // Obtener el valor de LinkedIn del almacenamiento local
    const linkedinValue = localStorage.getItem("linkedin");

    const OPTIONS = {};

    // const intenta = properties;

    // const newArr = properties.slice(0, 3);

    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <PropiedadesYa />
                <Cards title={true} userId={userId} />
                <PropiedadesYaS />
                <Footer />
              </>
            }
          />
          <Route
            path="/Propiedades"
            element={
              <div className="flex min-h-screen flex-col">
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <div className="flex-grow">
                  <ListaPropiedades userId={userId} isAuth={isAuth} />
                </div>
                <Footer />
              </div>
            }
          />
          <Route
            path="/Pricing"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Publica />
                <Footer />
              </>
            }
          />
          <Route
            path="/PropertyInfo/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Info options={OPTIONS} userId={userId} isAuth={isAuth} />
                <Footer />
              </>
            }
          />
          <Route
            path="/PropertyInfoVacations/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Search />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InfoVacation
                    options={OPTIONS}
                    userId={userId}
                    isAuth={isAuth}
                  />
                </LocalizationProvider>

                <Footer />
              </>
            }
          />
          <Route
            path="/Vacations"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Vacations />
                </LocalizationProvider>

                <Footer />
              </>
            }
          />
          <Route
            path="/Login"
            element={
              <>
                <Login setAutoLogout={this.setAutoLogout} />
              </>
            }
          />
          <Route
            path="/Register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/Reset"
            element={
              <>
                <Reset />
              </>
            }
          />

          <Route
            path="/Reset-Password/:token"
            element={
              <>
                <ResetPassword />
              </>
            }
          />
          <Route
            path="/Account/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Profile
                  first={first}
                  last={last}
                  email={email}
                  url={url}
                  whatsappv={whatsappValue}
                  facebookv={facebookValue}
                  instagramv={instagramValue}
                  tiktokv={tiktokValue}
                  linkedinv={linkedinValue}
                  wnumber={wnumber}
                  phone={phone}
                  isAuth={this.state.isAuth}
                />
              </>
            }
          />
          <Route
            path="/Propiedades/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Account
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
              </>
            }
          />
          <Route
            path="/Edit/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Edit logged={first} userId={userId} />
              </>
            }
          />
          <Route
            path="/Catalogo/:id"
            element={<Catalogo url={url} isAuth={this.state.isAuth} />}
          />
          <Route
            path="/Favoritos/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Favoritos />
              </>
            }
          />
          <Route
            path="/Agregar/:id"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Agregar
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
              </>
            }
          />
          <Route
            path="/Detalles/:id/:selectedOption"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <Detalles
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
              </>
            }
          />
          <Route
            path="/Unique"
            element={
              <>
                <Landing options={OPTIONS} />
              </>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;

// {
//           url: image5,
//           tipo: "Apartamento-Venta",
//           precio: "600,000",
//           lugar: "Ciudad guatemala",
//           cuartos: "5",
//           banos: "3",
//           parqueo: "2",
//           metros: "m473.2",
//         },
//         {
//           url: image6,
//           tipo: "Casa-Venta",
//           precio: "200,000",
//           lugar: "Ciudad Gotica",
//           cuartos: "2",
//           banos: "2",
//           parqueo: "1",
//           metros: "m173.2",
//         },
//         {
//           url: image7,
//           tipo: "Apartamento-Venta",
//           precio: "400,000",
//           lugar: "Ciudad Vieja",
//           cuartos: "3",
//           banos: "2",
//           parqueo: "1",
//           metros: "m73.2",
//         },
//         {
//           url: image7,
//           tipo: "Apartamento-Venta",
//           precio: "400,000",
//           lugar: "Ciudad Vieja",
//           cuartos: "3",
//           banos: "2",
//           parqueo: "1",
//           metros: "m73.2",
//         },
//         {
//           url: image6,
//           tipo: "Casa-Venta",
//           precio: "200,000",
//           lugar: "Ciudad Gotica",
//           cuartos: "2",
//           banos: "2",
//           parqueo: "1",
//           metros: "m173.2",
//         },
//         {
//           url: image5,
//           tipo: "Apartamento-Venta",
//           precio: "600,000",
//           lugar: "Ciudad guatemala",
//           cuartos: "5",
//           banos: "3",
//           parqueo: "2",
//           metros: "m473.2",
//         },
//         {
//           url: image7,
//           tipo: "Apartamento-Venta",
//           precio: "400,000",
//           lugar: "Ciudad Vieja",
//           cuartos: "3",
//           banos: "2",
//           parqueo: "1",
//           metros: "m73.2",
//         },
//         {
//           url: image6,
//           tipo: "Casa-Venta",
//           precio: "200,000",
//           lugar: "Ciudad Gotica",
//           cuartos: "2",
//           banos: "2",
//           parqueo: "1",
//           metros: "m173.2",
//         },
//         {
//           url: image5,
//           tipo: "Apartamento-Venta",
//           precio: "600,000",
//           lugar: "Ciudad guatemala",
//           cuartos: "5",
//           banos: "3",
//           parqueo: "2",
//           metros: "m473.2",
//         },
//         {
//           url: image5,
//           tipo: "Apartamento-Venta",
//           precio: "600,000",
//           lugar: "Ciudad guatemala",
//           cuartos: "5",
//           banos: "3",
//           parqueo: "2",
//           metros: "m473.2",
//         },
