import React, { Component } from "react";
import "./App.css";
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
    console.log("App componentDidMount");

    this.fetchData();

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
    console.log("expiryDate componentDidMount", expiryDate);
    console.log("TOKEN IN APP:", token);
    console.log("remainingMilliseconds", remainingMilliseconds);

    this.setAutoLogout(remainingMilliseconds);
  }

  fetchData = async () => {
    console.log("fetchio");
    try {
      const response = await fetch("http://localhost:2001/properties/info");
      if (!response.ok) {
        console.log("Error al obtener datos iniciales");
      }
      const data = await response.json();
      this.setState({ properties: data.data });
      console.log("properties data:", data.data);
    } catch (error) {
      console.error("Error al obtener datos iniciales:", error);
    }
  };

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

  // fill = (info) => {
  //   // console.log("app", info);
  //   this.setState((prevState) => ({
  //     new: info,
  //   }));
  // };

  render() {
    const { info, properties, isAuth, token, userId } = this.state;

    const first = localStorage.getItem("first");
    const last = localStorage.getItem("last");
    const email = localStorage.getItem("email");

    const OPTIONS = {};

    // const intenta = properties;

    const newArr = properties.slice(0, 3);

    console.log(
      "first:",
      first,
      "last:",
      last,
      "email:",
      email,
      "isAuth:",
      isAuth,
      "token:",
      token,
      "userId:",
      userId,
    );

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
                <Cards title={true} infoH={newArr} />
                <PropiedadesYaS />
                <Footer />
              </>
            }
          />
          <Route
            path="/Propiedades"
            element={
              <>
                <Header
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
                <ListaPropiedades />
                <Cards title={false} infoH={properties} fill={this.fill} />
                <Footer />
              </>
            }
          />
          <Route
            path="/Publica"
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
                <Info options={OPTIONS} info={this.state.new} infoH={info} />
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
                <Vacations />
                <Cards title={true} infoH={newArr} vacation={true} />
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
                <Profile first={first} last={last} email={email} />
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
            path="/Catalogo/:id"
            element={
              <>
                <Catalogo />
              </>
            }
          />
          <Route
            path="/Agregar/:id"
            element={
              <>
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
                <Detalles
                  logged={first}
                  isAuth={this.state.isAuth}
                  logoutHandler={this.logoutHandler}
                />
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
