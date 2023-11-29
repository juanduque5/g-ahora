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

import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";

// import MainB from "./components/MainB/MainB";
// import MainF from "./components/MainF/MainF";
// import MainS from "./components/MainS/MainS";
// import MainHalfF from "./components/MainHalfF/MainHalfF";
// import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [
        {
          url: image5,
          tipo: "Apartamento-Venta",
          precio: "600,000",
          lugar: "Ciudad guatemala",
          cuartos: "5",
          banos: "3",
          parqueo: "2",
          metros: "m473.2",
        },
        {
          url: image6,
          tipo: "Casa-Venta",
          precio: "200,000",
          lugar: "Ciudad Gotica",
          cuartos: "2",
          banos: "2",
          parqueo: "1",
          metros: "m173.2",
        },
        {
          url: image7,
          tipo: "Apartamento-Venta",
          precio: "400,000",
          lugar: "Ciudad Vieja",
          cuartos: "3",
          banos: "2",
          parqueo: "1",
          metros: "m73.2",
        },
        {
          url: image7,
          tipo: "Apartamento-Venta",
          precio: "400,000",
          lugar: "Ciudad Vieja",
          cuartos: "3",
          banos: "2",
          parqueo: "1",
          metros: "m73.2",
        },
        {
          url: image6,
          tipo: "Casa-Venta",
          precio: "200,000",
          lugar: "Ciudad Gotica",
          cuartos: "2",
          banos: "2",
          parqueo: "1",
          metros: "m173.2",
        },
        {
          url: image5,
          tipo: "Apartamento-Venta",
          precio: "600,000",
          lugar: "Ciudad guatemala",
          cuartos: "5",
          banos: "3",
          parqueo: "2",
          metros: "m473.2",
        },
        {
          url: image7,
          tipo: "Apartamento-Venta",
          precio: "400,000",
          lugar: "Ciudad Vieja",
          cuartos: "3",
          banos: "2",
          parqueo: "1",
          metros: "m73.2",
        },
        {
          url: image6,
          tipo: "Casa-Venta",
          precio: "200,000",
          lugar: "Ciudad Gotica",
          cuartos: "2",
          banos: "2",
          parqueo: "1",
          metros: "m173.2",
        },
        {
          url: image5,
          tipo: "Apartamento-Venta",
          precio: "600,000",
          lugar: "Ciudad guatemala",
          cuartos: "5",
          banos: "3",
          parqueo: "2",
          metros: "m473.2",
        },
        {
          url: image5,
          tipo: "Apartamento-Venta",
          precio: "600,000",
          lugar: "Ciudad guatemala",
          cuartos: "5",
          banos: "3",
          parqueo: "2",
          metros: "m473.2",
        },
      ],
      new: {},
      name: "",
    };

    // Enlazar métodos si es necesario
    // this.miMetodo = this.miMetodo.bind(this);
  }

  // toggleApplyStyle = () => {
  //   this.setState((prevState) => ({
  //     applyStyle: !prevState.applyStyle,
  //   }));
  // };
  // // Métodos de clase

  fill = (info) => {
    // console.log("app", info);
    this.setState((prevState) => ({
      new: info,
    }));
  };

  name = (name) => {
    this.setState((prevState) => ({
      name: name,
    }));
  };

  render() {
    const { info } = this.state;
    console.log("name: ", this.state.name);

    const OPTIONS = {};

    const newArr = info.slice(0, 3);

    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header logged={this.state.name} />
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
                <Header logged={this.state.name} />
                <ListaPropiedades />
                <Cards title={false} infoH={info} fill={this.fill} />
                <Footer />
              </>
            }
          />
          <Route
            path="/Publica"
            element={
              <>
                <Header logged={this.state.name} />
                <Publica />
                <Footer />
              </>
            }
          />
          <Route
            path="/Info"
            element={
              <>
                <Header logged={this.state.name} />
                <Info options={OPTIONS} info={this.state.new} infoH={info} />
                <Footer />
              </>
            }
          />
          <Route
            path="/Vacations"
            element={
              <>
                <Header logged={this.state.name} />
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
                <Login name={this.name} />
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
        </Routes>
      </div>
    );
  }
}

export default App;
