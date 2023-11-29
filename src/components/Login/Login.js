import { React, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import visible from "../../images/visible.png";

const Login = ({ name }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleLoginClick = () => {
    const postData = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch("http://localhost:2001/auth/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        name(data.name);
        navigate("/"); // Reemplaza 'NombreDeLaPantalla' con el nombre de tu pantalla
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error al registrar. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <div className="wx">
      <div id="img" className="  flex w-1/2 justify-center">
        <div className="xl:w-30 h-90 relative m-auto w-10/12  rounded-2xl bg-white shadow-2xl sm:h-5/6 sm:w-3/5 md:left-52 md:h-5/6 md:w-2/5 lg:h-5/6 xl:left-96 xl:h-5/6">
          <div className="h-1/2 ">
            <div className="h-30 flex items-end justify-center ">
              <p className="font-open-sans text-2xl font-semibold">
                Inicia sesion
              </p>
            </div>
            <div className="h-70 ">
              <div className="m-auto flex h-1/4 w-11/12 items-end ">
                <p className="font-open-sans">
                  No tienes cuenta?{" "}
                  <span className="text-blue-new cursor-pointer">
                    <Link to="/Register"> Crea una aqui</Link>
                  </span>
                </p>
              </div>
              <div className="h-75 m-auto  flex w-11/12 items-center ">
                <div className="mt-10  h-3/5 w-full">
                  <div className="flex h-2/5 items-center  ">
                    <p className="font-open-sans text-sm font-bold">
                      Correo electronico
                    </p>
                  </div>
                  <div className="flex h-3/5 items-center ">
                    <input
                      className="h-full w-full rounded-lg border"
                      type="text"
                      placeholder="Email"
                      onChange={handleEmail}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/2 ">
            <div className="flex h-1/2 justify-center ">
              <div className=" h-3/5 w-11/12 ">
                <div className="flex h-2/5  items-center">
                  <p className="font-open-sans text-sm font-bold">Contrasena</p>
                </div>
                <div className="flex h-3/5  ">
                  <input
                    className="h-full w-full rounded-lg border"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                  ></input>
                  <img
                    className="absolute right-8  flex h-6 w-6 translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                    src={visible}
                    alt="Hi"
                  ></img>
                </div>
                <div className="flex h-3/5">
                  <p className="font-open-sans mt-3">contrasena correcta</p>
                </div>
              </div>
            </div>
            <div className="flex h-1/2 justify-center ">
              <div
                onClick={handleLoginClick}
                className="bg-blue-new mt-5 flex  h-2/5 w-3/5 cursor-pointer rounded-lg border"
              >
                <p className="font-fira-sans m-auto text-white">
                  Iniciar sesion
                </p>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
