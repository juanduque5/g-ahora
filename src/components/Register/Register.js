import { React, useState } from "react";
import "./Register.css";

import { Link } from "react-router-dom";
// import Modal from "react-modal";
import Modal from "./modal";
import language from "./language";
import { useSelector } from "react-redux";

const Login = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [message, setMessage] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const storedLanguage = useSelector((state) => state.language.language);
  const {
    register,
    name,
    first2,
    last2,
    email2,
    password3,
    reenter,
    already,
    entrar,
    message2,
    crear,
    error1,
    error2,
    error3,
    error4,
  } = language[storedLanguage];

  //Handle Sign up API
  const handleSignupClick = () => {
    let errorMessage = "";

    // Check for empty input fields
    if (!first || !last || !email) {
      errorMessage = error1;
    } else if (isValidEmail) {
      errorMessage = error2;
    }
    // Check password length
    else if (password.length < 8 || password2.length < 8) {
      errorMessage = error3;
    }
    // Check if passwords match
    else if (password !== password2) {
      errorMessage = error4;
    }

    if (errorMessage) {
      setMessage(errorMessage);
      setIsModalOPen(true);
    } else {
      const postData = {
        email: email,
        first: first,
        last: last,
        password: password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "", // Indica que se prefieren los mensajes en español
        },
        body: JSON.stringify(postData),
      };

      fetch("http://localhost:2001/auth/signup", requestOptions)
        .then((response) => {
          if (!response.ok) {
            // En el caso de un error, maneja el JSON que envía el backend
            return response.json().then((errorData) => {
              console.log(errorData.message);
              setMessage(errorData.message);
              setIsModalOPen(true);
            });
          }

          return response.json();
        })
        .then((data) => {
          console.log("data signing up:", data);

          // navigate("/Login"); // Reemplaza '/dashboard' con la ruta deseada
        })
        .catch((error) => {
          console.error("Error :", error);

          openModal();
        });
    }
  };

  //Handle names, email and passwords

  const handleFirst = (event) => {
    const firstName = event.target.value.trim(); // Elimina espacios adicionales al principio y al final
    setFirst(firstName);
  };

  console.log(first);

  const handleLast = (event) => {
    const lastName = event.target.value.trim();
    setLast(lastName);
  };

  const handleEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Expresión regular para validar un correo electrónico
    const emailRegex = /\S+@\S+\.\S+/;

    // Validar el correo electrónico
    const isValidEmail = emailRegex.test(emailValue);

    // Si el correo electrónico no es válido, puedes manejar el error aquí
    if (!isValidEmail) {
      setIsValidEmail(true);
      console.log("Correo electrónico no válido");
    } else {
      setIsValidEmail(false);
    }
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
                {register}
              </p>
            </div>
          </div>

          <div className="h-4/6">
            <div className="m-auto flex h-1/4 w-11/12 flex-col  ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">{name}</p>
              </div>
              <div className="flex h-3/5 items-center gap-2 ">
                <input
                  className="h-5/6 w-full rounded-lg border"
                  type="text"
                  placeholder={first2}
                  onChange={handleFirst}
                ></input>
                <input
                  className="h-5/6 w-full rounded-lg border"
                  type="text"
                  placeholder={last2}
                  onChange={handleLast}
                ></input>
              </div>
            </div>
            <div className="m-auto flex h-1/4 w-11/12 flex-col  ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">{email2}</p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-5/6 w-full rounded-lg border"
                  type="text"
                  placeholder="example@gmail.com"
                  onChange={handleEmail}
                ></input>
              </div>
            </div>
            <div className="m-auto flex h-1/4 w-11/12 flex-col   ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">{password3}</p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-full w-full rounded-lg border"
                  placeholder={message2}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute right-8  h-6 w-6"
                    onClick={togglePasswordVisibility}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute right-8 h-6 w-6"
                    onClick={togglePasswordVisibility}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="m-auto flex h-1/4 w-11/12 flex-col   ">
              <div className="flex h-2/5 items-center  ">
                <p className="font-open-sans text-sm font-bold">{reenter}</p>
              </div>
              <div className="flex h-3/5 items-center ">
                <input
                  className="h-full w-full rounded-lg border"
                  type={showPassword2 ? "text" : "password"}
                  placeholder={message2}
                  value={password2}
                  onChange={handlePasswordChange2}
                ></input>
                {showPassword2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute right-8  h-6 w-6"
                    onClick={togglePasswordVisibility2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute right-8  h-6 w-6"
                    onClick={togglePasswordVisibility2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="relative top-2 m-auto flex h-5 w-11/12 ">
            <div className="flex h-1/2  cursor-pointer rounded-xl">
              <p className="cursor-pointer  font-open-sans text-base text-black">
                {already}{" "}
                <span className="cursor-pointer text-blue-new">
                  <Link to="/Login"> {entrar}</Link>
                </span>
              </p>
            </div>
          </div>
          <div className="mt-2 flex h-15">
            <button
              onClick={handleSignupClick}
              // disabled={error}
              // style={{ opacity: error ? 0.5 : 1 }}
              className="m-auto flex h-1/2 w-1/2 cursor-pointer rounded-xl bg-blue-new"
            >
              <p className="m-auto  cursor-pointer font-fira-sans text-lg text-white">
                {crear}
              </p>
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} close={closeModal} error={message} />
    </div>
  );
};

export default Login;
