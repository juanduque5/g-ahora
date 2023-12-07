import { React, useState } from "react";
import "./Register.css";

import visible from "../../images/visible.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [message, setMessage] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  //Handle Sign up API

  const handleSignupClick = () => {
    // if (password !== password2) {
    //   setIsModalOPen(true);

    //   return;
    // } else {
    //   setError(false);
    // }

    const postData = {
      email: email,
      name: name,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch("http://localhost:2001/auth/signup", requestOptions)
      .then((response) => {
        if (!response.ok) {
          // En el caso de un error, maneja el JSON que envía el backend
          return response.json().then((errorData) => {
            if (password !== password2) {
              const newErrorMessages = errorData.data.map((error) => error.msg);
              setMessage([...newErrorMessages, "Passwords does not match"]);
              throw new Error(`Error: ${errorData.message}`);
            } else {
              const newErrorMessages = errorData.data.map((error) => error.msg);
              setMessage([...newErrorMessages]);
              throw new Error(`Error: ${errorData.message}`);
            }
          });
        } else if (password !== password2) {
          setMessage(["Passwords does not match"]);
          setIsModalOPen(true);
          setError(false);
          throw new Error(`Error: passwords`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);

        navigate("/Login"); // Reemplaza '/dashboard' con la ruta deseada
      })
      .catch((error) => {
        console.error("Error :", error);

        setError("Error al registrar. Por favor, inténtalo de nuevo.");
        openModal();
      });
  };

  //Handle names, email and passwords

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordChange2 = (event) => {
    setPassword2(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  //

  const openModal = () => {
    setIsModalOPen(true);
  };
  const closeModal = () => {
    setIsModalOPen(false);
  };

  console.log("M", message);

  //Creating Sign up form
  return (
    <div className="wx">
      <div id="img" className="  flex w-1/2 justify-center">
        <div className="relative m-auto h-90 w-10/12 rounded-2xl  bg-white shadow-2xl sm:h-5/6 sm:w-3/5 md:left-52 md:h-5/6 md:w-2/5 lg:h-5/6 xl:left-96 xl:h-5/6 xl:w-30">
          <div className="h-13 ">
            <div className="flex h-full items-end justify-center ">
              <p className="font-open-sans text-2xl font-semibold">
                Registrate
              </p>
            </div>
          </div>

          <div className="h-4/6  ">
            <div className="m-auto flex h-1/4 w-11/12 flex-col  ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">Nombre</p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-5/6 w-full rounded-lg border"
                  type="text"
                  placeholder="Nombre"
                  onChange={handleName}
                ></input>
              </div>
            </div>
            <div className="m-auto flex h-1/4 w-11/12 flex-col  ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">
                  Correo electronico
                </p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-5/6 w-full rounded-lg border"
                  type="text"
                  placeholder="Email"
                  onChange={handleEmail}
                ></input>
              </div>
            </div>
            <div className="m-auto flex h-1/4 w-11/12 flex-col   ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">Password</p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-full w-full rounded-lg border"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
                <img
                  className="absolute right-8  flex h-6 w-6 translate-y-1/4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                  src={visible}
                  alt="Hi"
                ></img>
              </div>
            </div>

            <div className="m-auto flex h-1/4 w-11/12 flex-col   ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">
                  Re-enter password
                </p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-full w-full rounded-lg border"
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Re-enter Password "
                  value={password2}
                  onChange={handlePasswordChange2}
                ></input>
                <img
                  className="absolute right-8  flex h-6 w-6 translate-y-1/4 cursor-pointer"
                  onClick={togglePasswordVisibility2}
                  src={visible}
                  alt="Hi"
                ></img>
              </div>
            </div>
          </div>
          <div className="relative top-2 m-auto flex h-5 w-11/12 ">
            <div className="flex h-1/2  cursor-pointer rounded-xl">
              <p className="cursor-pointer  font-open-sans text-base text-black">
                Already have an account ?{" "}
                <span className="cursor-pointer text-blue-new">
                  <Link to="/Login"> Inicia session </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="mt-2 flex h-15">
            <button
              onClick={handleSignupClick}
              disabled={error}
              style={{ opacity: error ? 0.5 : 1 }}
              className="m-auto flex h-1/2 w-1/2 cursor-pointer rounded-xl bg-blue-new"
            >
              <p className="m-auto  cursor-pointer font-fira-sans text-lg text-white">
                Register
              </p>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onAfterClose={closeModal}>
        <div className="flex flex-col gap-1">
          <div className="  border-b-slate-400">
            <p className="font-semibold">An Error Occurred</p>
          </div>
          {message && (
            <div className="mt-2 h-28">
              {message.map((err, index) => (
                <ul key={index}>
                  <li className="ml-1" key={index}>
                    - {err}
                  </li>
                </ul>
              ))}
            </div>
          )}

          <div className="relative top-5 flex justify-end ">
            <button className="flex h-9 w-1/4 justify-center rounded-md bg-red-500">
              <p className="m-auto font-open-sans text-white ">Exit</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
