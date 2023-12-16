import { React, useState } from "react";
import "./Reset.css";
import { Link, useNavigate } from "react-router-dom";
// import visible from "../../images/visible.png";
import Modal from "react-modal";

const Reset = ({ name }) => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [passed, setPassed] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const openModal = () => {
    setIsModalOPen(true);
  };
  const closeModal = () => {
    setIsModalOPen(false);
  };

  const handleLoginClick = () => {
    const postData = {
      email: email,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch("http://localhost:2001/auth/reset", requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setMessage(errorData.message);
            openModal();
            throw new Error(`Error: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        setPassed(true);
        setMessage(data.message);
        openModal();
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setMessage(error.message);
        openModal();
      });
  };

  const statusMessage = passed ? "Email sent" : "Error occurred";
  const handleExit = () => {
    navigate("/Login");
  };

  return (
    <div className="wx">
      <div id="img" className="  flex w-1/2 justify-center">
        <div className="relative m-auto h-90 w-10/12 rounded-2xl  bg-white shadow-2xl sm:h-5/6 sm:w-3/5 md:left-52 md:h-5/6 md:w-2/5 lg:h-5/6 xl:left-96 xl:h-5/6 xl:w-30">
          <div className="h-1/2 ">
            <div className="flex h-30 items-end justify-center ">
              <p className="font-open-sans text-2xl font-semibold">
                Inicia sesion
              </p>
            </div>
            <div className="h-70 ">
              <div className="m-auto flex h-1/4 w-11/12 items-end ">
                <p className="font-open-sans">
                  No tienes cuenta?{" "}
                  <span className="cursor-pointer text-blue-new">
                    <Link to="/Register"> Crea una aqui</Link>
                  </span>
                </p>
              </div>
              <div className="m-auto flex  h-75 w-11/12 items-center ">
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
              <div
                onClick={handleLoginClick}
                className="mt-8 flex h-2/5  w-3/5 cursor-pointer rounded-lg border bg-blue-new"
              >
                <p className="m-auto font-fira-sans text-white">
                  Reset password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onAfterClose={closeModal}>
        <div className="flex flex-col gap-1">
          <div className="  border-b-slate-400">
            <p className="font-semibold">{statusMessage} </p>
          </div>
          {message && (
            <div className="mt-2 h-28">
              <ul>
                <li className="ml-1">- {message}</li>
              </ul>
            </div>
          )}

          <div
            onClick={handleExit}
            className="relative top-5 flex justify-end "
          >
            <button className="flex h-9 w-1/4 justify-center rounded-md bg-red-500">
              <p className="m-auto font-open-sans text-white ">Exit</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reset;
