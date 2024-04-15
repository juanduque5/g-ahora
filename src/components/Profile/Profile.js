import { React, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
// import image5 from "../../images/image5.png";
// import image6 from "../../images/image6.png";
// import image7 from "../../images/image7.png";
// import car from "../../images/car.png";
// import house from "../../images/house.png";
// import bath from "../../images/bath.png";
import Modal from "./modal";
import account from "../../images/account.png";
import "./Profile.css";
import language from "./language";
import check from "../../images/check.png";

import { useSelector } from "react-redux";
// import numberGuests from "../Vacations/numberGuests";

const Profile = ({
  first,
  last,
  email,
  url,
  whatsappv,
  instagramv,
  facebookv,
  tiktokv,
  linkedinv,
  wnumber,
  phone,
}) => {
  const [email2, setEmail2] = useState(email);
  const oldEmail = email;
  const [first2, setFirst2] = useState(first);
  const [last2, setLast2] = useState(last);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorFirst, setErrorFirst] = useState("");
  const [errorLast, setErrorLast] = useState("");

  const [whatsapp, setWhatsapp] = useState(whatsappv);
  const [instagram, setInstagram] = useState(instagramv);
  const [facebook, setFacebook] = useState(facebookv);
  const [tiktok, setTiktok] = useState(tiktokv);
  const [linkedin, setLinkedin] = useState(linkedinv);
  const [phoneN, setPhoneN] = useState(phone);
  const [whatsappNumber, setWhatsappNumber] = useState(wnumber);
  const [change, setChange] = useState(false);
  const [router, setRouter] = useState(true);

  ///
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const {
    settings,
    publicProfile,
    changePicture,
    deletePicture,
    firstName,
    lastName,
    email3,
    phoneNumber,
    whatsappNumber2,
    whatsappLink,
    instagramLink,
    facebookLink,
    tiktokLink,
    linkedinLink,
    ingresa,
    save,
    edit2,
    subs,
  } = language[storedLanguage];

  const navigate = useNavigate();
  const [IsValidEmail, setIsValidEmail] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImageLink] = useState(
    url === "https://juanma-user-s3.s3.us-west-1.amazonaws.com/null" ||
      url === "https://juanma-user-s3.s3.us-west-1.amazonaws.com/" ||
      url === null
      ? account
      : url,
  );
  console.log(instagram, facebook, tiktok);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    return () => {};
  }, [token, navigate]);

  //Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  console.log("id profile", id);
  console.log("URL", url);

  const handleEdit = () => {
    setEdit(true);
    // setEmail2("");
    // setFirst2("");
    // setLast2("");
    // setWhatsapp("");
    // setInstagram("");
    // setFacebook("");
    // setTiktok("");
    // setLinkedin("");
  };

  const handleEmail = (event) => {
    const emailValue = event.target.value ? event.target.value : email2;
    setEmail2(emailValue);
    const emailRegex = /\S+@\S+\.\S+/; // Expresión regular para validar un correo electrónico
    const isValidElement = emailRegex.test(emailValue);

    if (!isValidElement) {
      setIsValidEmail(false);
      console.log("Correo electrónico no válido");
    } else {
      setIsValidEmail(true);
      console.log(" válido");
    }
  };
  const handleFirst = (e) => {
    setFirst2(e.target.value);
  };

  const handleLast = (e) => {
    setLast2(e.target.value);
  };

  const handlePhone = (e) => {
    const phoneNumber = e.target.value;
    const phoneWithoutSpecialChars = phoneNumber.replace(/[^\d]/g, ""); // Eliminar todo lo que no sea dígito
    setPhoneN(phoneWithoutSpecialChars);
  };
  const handleWhatsapp = (e) => {
    const phoneNumber = e.target.value;
    const phoneWithoutSpecialChars = phoneNumber.replace(/[^\d]/g, ""); // Eliminar todo lo que no sea dígito
    setWhatsappNumber(phoneWithoutSpecialChars);
  };

  const handleChange = () => {
    if (change === true) {
      setWhatsappNumber("");
      setChange(!change);
    } else {
      setWhatsappNumber(phoneN);
      setChange(!change);
    }
  };

  const verifyInput = () => {
    if (!email2 || !IsValidEmail || !first2 || !last2) {
      console.log("1");
      setErrorEmail(!IsValidEmail || !email2 ? "Email" : "");
      console.log("2");
      setErrorFirst(!first2 ? "Nombre" : "");
      console.log("3");
      setErrorLast(!last2 ? "Apellido" : "");
      console.log("4");
      setIsModalOpen(true);
    } else {
      handleSave();
    }
  };

  const handleSave = () => {
    const postData = {
      email: email2,
      first: first2,
      last: last2,
      whatsapp: whatsapp,
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin,
      tiktok: tiktok,
      oldEmail: oldEmail,
      phone: phoneN,
      whatsappNumber: whatsappNumber,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(`http://localhost:2001/auth/profile/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setErrorEmail(errorData.message);
            // console.log("Error profile updating", errorData.message);

            return;
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.newProfile);
        console.log(data);

        localStorage.setItem("first", data.newProfile.first);
        localStorage.setItem("last", data.newProfile.last);
        localStorage.setItem("email", data.newProfile.email);
        localStorage.setItem("whatsapp", data.socialmedia.whatsapp);

        localStorage.setItem("instagram", data.socialmedia.instagram);

        localStorage.setItem("facebook", data.socialmedia.facebook);

        localStorage.setItem("tiktok", data.socialmedia.tiktok);

        localStorage.setItem("linkedin", data.socialmedia.linkedin);
        localStorage.setItem("wnumber", data.socialmedia.wnumber);
        localStorage.setItem("phone", data.socialmedia.phone);
        setEdit(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      try {
        // Crea un objeto FormData
        const formData = new FormData();
        formData.append("imagen", selectedFile);

        // Envía la solicitud al backend
        const response = await fetch(
          `http://localhost:2001/auth/imageUpdate/${id}`,
          {
            method: "PUT",
            body: formData,
          },
        );

        // Maneja la respuesta del backend
        const responseData = await response.json();
        console.log("Respuesta del backend:", responseData);
        console.log("Respuesta del backend:", responseData.image);
        // setImageLink(responseData.image);
        localStorage.setItem("url", responseData.image);
        window.location.reload();
      } catch (error) {
        console.error("Error al enviar la imagen al backend:", error);
      }
    }
  };

  const handleDeleteImg = async () => {
    try {
      // Envía la solicitud al backend
      const response = await fetch(
        `http://localhost:2001/auth/deleteProfileImage/${id}`,
        {
          method: "DELETE",
        },
      );

      // Maneja la respuesta del backend
      const responseData = await response.json();
      console.log("Respuesta del backend:", responseData);
      localStorage.removeItem("url");
      setImageLink(null);
      // localStorage.setItem("url", responseData.image);
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la imagen al backend:", error);
    }
  };

  const updateImage = () => {
    // Activa el input de tipo file al hacer clic en el botón
    fileInputRef.current.click();
  };

  const route = (value) => {
    if (value === "subscription") {
      setRouter(false);
    } else {
      setRouter(true);
    }
  };

  return (
    <div className="ajusta">
      {skeleton && router ? (
        <div className="mt-12 flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
          <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
            <div className="sticky top-12 flex h-40 flex-col gap-2  border-r  bg-gray-300 p-4 text-sm">
              <h2 className="mb-4 animate-pulse bg-gray-300 pl-3 text-2xl font-semibold">
                {" "}
              </h2>
              <p className="flex animate-pulse items-center rounded-full  bg-gray-300  px-3  py-2.5 font-bold text-indigo-900"></p>
            </div>
          </aside>
          <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
              <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg ">
                <h2 className="h-9 animate-pulse bg-gray-300 pl-6 text-2xl font-bold sm:text-xl">
                  {" "}
                </h2>

                <div className="mx-auto mt-8 grid h-850 max-w-2xl animate-pulse bg-gray-300"></div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="mt-12 flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
          {skeleton && !router ? (
            <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
              <div className="sticky top-12 flex h-40 animate-pulse flex-col gap-2 border-r bg-gray-300  p-4 text-sm"></div>
            </aside>
          ) : (
            <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
              <div className="sticky top-12 flex flex-col gap-2 border-r border-indigo-100 p-4 text-sm">
                <h2 className="mb-4 pl-3 text-2xl font-semibold">{settings}</h2>
                <p
                  onClick={() => route("Public")}
                  className="flex items-center rounded-full border bg-white px-3  py-2.5 font-bold text-indigo-900"
                >
                  {publicProfile}
                </p>
                <p
                  onClick={() => route("subscription")}
                  className="flex items-center rounded-full border bg-white px-3  py-2.5 font-bold text-indigo-900"
                >
                  {subs}
                </p>
              </div>
            </aside>
          )}

          <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
            {router ? (
              <div className="p-2 md:p-4">
                <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    {publicProfile}
                  </h2>

                  <div className="mx-auto mt-8 grid max-w-2xl">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                      <img
                        className="h-40 w-40 rounded-full border object-cover "
                        src={image}
                        alt=""
                      />

                      <div className="flex flex-col space-y-5 sm:ml-8">
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }} // Oculta el input
                            onChange={handleFileChange}
                          />
                          <button
                            type="button"
                            onClick={updateImage}
                            className="rounded-lg border border-indigo-200 bg-[#202142] px-7 py-3.5 text-base font-medium text-indigo-100 hover:bg-indigo-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                          >
                            {changePicture}
                          </button>
                        </div>
                        <button
                          onClick={handleDeleteImg}
                          type="button"
                          className="rounded-lg border border-indigo-200 bg-white px-7 py-3.5 text-base font-medium text-indigo-900 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200 "
                        >
                          {deletePicture}
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 items-center text-[#202142] sm:mt-14">
                      <div className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <div className="w-full">
                          <label
                            htmlFor="first_name"
                            className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Your first name
                          </label>
                          <p>{firstName}</p>
                          <input
                            onChange={handleFirst}
                            type="text"
                            id="first_name"
                            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                            placeholder="Your first name"
                            value={first2 ? first2 : ""}
                            disabled={!edit}
                            required
                          ></input>
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="last_name"
                            className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Your last name
                          </label>
                          <p>{lastName}</p>
                          <input
                            onChange={handleLast}
                            type="text"
                            id="last_name"
                            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                            placeholder="Your last name"
                            value={last2 ? last2 : ""}
                            disabled={!edit}
                            required
                          ></input>
                        </div>
                      </div>

                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <p>{email3}</p>
                        <input
                          onChange={handleEmail}
                          type="email"
                          id="email"
                          placeholder={ingresa}
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                          value={email2 ? email2 : ""}
                          disabled={!edit}
                        ></input>
                      </div>

                      <div className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <div className="w-full">
                          <label
                            htmlFor="first_name"
                            className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Phone Number
                          </label>
                          <p>{phoneNumber}</p>
                          <input
                            onChange={handlePhone}
                            type="text"
                            id="first_name"
                            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                            placeholder="#"
                            value={phoneN ? phoneN : ""}
                            disabled={!edit}
                            required
                          ></input>
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="last_name"
                            className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Whatsapp Number
                          </label>
                          <p>{whatsappNumber2}</p>
                          <input
                            onChange={handleWhatsapp}
                            type="text"
                            id="last_name"
                            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                            placeholder="#"
                            value={whatsappNumber ? whatsappNumber : ""}
                            disabled={!edit}
                            required
                          ></input>
                          <div className="absolute ">
                            <input
                              onChange={handleChange}
                              type="checkbox"
                              id="miCheckbox"
                              name="miCheckbox"
                              className=" mr-2"
                              checked={change}
                            ></input>
                            <label htmlFor="miCheckbox">{phoneNumber}</label>
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="whatsapp"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          WhatsApp Link
                        </label>
                        <p>{whatsappLink}</p>
                        <input
                          onChange={(e) => setWhatsapp(e.target.value)}
                          type="text"
                          id="whatsapp"
                          placeholder="https://wa.me/502whatsappNumber"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          value={whatsapp}
                          disabled={!edit}
                        ></input>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="instagram"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          {instagramLink}
                        </label>
                        <p>Instagram:</p>
                        <input
                          onChange={(e) => setInstagram(e.target.value)}
                          type="text"
                          id="instagram"
                          placeholder="https://www.instagram.com/tuusuario/"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          value={instagram}
                          disabled={!edit}
                        ></input>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="facebook"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Facebook Link
                        </label>
                        <p>{facebookLink}</p>
                        <input
                          onChange={(e) => setFacebook(e.target.value)}
                          type="text"
                          id="facebook"
                          placeholder="https://www.facebook.com/tupaginadeejemplo"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          value={facebook}
                          disabled={!edit}
                        ></input>
                      </div>

                      {/* Input para TikTok */}
                      <div className="w-full">
                        <label
                          htmlFor="tiktok"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          TikTok Link
                        </label>
                        <p>{tiktokLink}</p>
                        <input
                          onChange={(e) => setTiktok(e.target.value)}
                          type="text"
                          id="tiktok"
                          placeholder="https://www.tiktok.com/@tucuentaejemplo"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          value={tiktok}
                          disabled={!edit}
                        ></input>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="linkedin"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          LinkedIn Link
                        </label>
                        <p>{linkedinLink} </p>
                        <input
                          onChange={(e) => setLinkedin(e.target.value)}
                          type="text"
                          id="linkedin"
                          placeholder="https://www.linkedin.com/in/username"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          value={linkedin}
                          disabled={!edit}
                        ></input>
                      </div>

                      <div className="mt-5 flex justify-end gap-2">
                        <button
                          onClick={handleEdit}
                          type="submit"
                          className="w-full rounded-lg  bg-yellow-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto"
                        >
                          {edit2}
                        </button>
                        <button
                          onClick={verifyInput}
                          disabled={edit ? false : true}
                          type="submit"
                          className={`w-full rounded-lg ${
                            edit ? "cursor-pointer" : "cursor-not-allowed"
                          }  bg-blue-dark px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto`}
                        >
                          {save}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                {skeleton ? (
                  <div className="mt-12 flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
                    <div className="flex h-auto w-full flex-col  md:h-618 lg:h-786 xl:h-850">
                      <div className="flex h-full w-full  flex-col items-center justify-center  gap-6   md:flex-row">
                        <div className="mt-5 flex h-auto animate-pulse flex-col rounded-2xl  bg-gray-300 md:mt-0 md:h-95 md:w-1/2  lg:w-2/4 xl:w-1/2">
                          <div className="flex h-11  rounded-t-3xl">
                            <p className="m-auto text-2xl font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl "></p>
                          </div>
                          <div className=" m-auto flex h-full w-11/12 flex-col  ">
                            <div className="flex h-16 w-full  md:h-15">
                              <p className="sm:text-md m-auto text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl"></p>
                            </div>
                            <div className="flex h-12 w-full md:h-15">
                              <p className="m-auto font-open-sans text-3xl font-semibold text-blue-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl"></p>
                            </div>
                            <div className="flex h-20 w-full md:h-15">
                              <button className="m-auto h-11 w-36 rounded-lg font-fira-sans text-sm font-medium text-white"></button>
                            </div>
                            <div className="flex h-3/5 w-full flex-col gap-3  md:gap-0  lg:gap-2 xl:gap-6">
                              <div className="  flex h-auto  md:h-16  ">
                                <div className=" "></div>
                                <div className="flex h-full w-full "></div>
                              </div>
                              <div className=" flex h-auto  md:h-16 ">
                                <div className=""></div>
                                <div className="flex h-full  w-full "></div>
                              </div>
                              <div className=" flex h-auto md:h-16 ">
                                <div className=""></div>
                                <div className="flex h-full w-full "></div>
                              </div>
                              <div className=" flex h-auto  md:h-16 ">
                                <div className=""></div>
                                <div className="flex w-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-16 flex h-auto animate-pulse flex-col rounded-2xl  bg-gray-300 md:mb-0 md:h-95 md:w-1/2  lg:w-2/4 xl:w-1/2">
                          <div className="flex h-11 animate-pulse rounded-t-2xl ">
                            <p className="m-auto text-2xl font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"></p>
                          </div>
                          <div className=" m-auto flex h-full w-11/12 flex-col  ">
                            <div className="flex h-16 w-full  md:h-15">
                              <p className="sm:text-md m-auto  text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl"></p>
                            </div>
                            <div className="flex h-12 w-full  md:h-15">
                              <p className="m-auto font-open-sans text-3xl font-semibold text-orange-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl"></p>
                            </div>
                            <div className="flex h-20 w-full  md:h-15">
                              <button className="m-auto h-11 w-36 rounded-lg  font-fira-sans text-sm font-medium text-white"></button>
                            </div>
                            <div className="flex h-3/5 w-full flex-col   md:gap-0 lg:gap-2 xl:gap-6">
                              <div className="  flex h-auto  md:h-16 ">
                                <div className=""></div>
                                <div className="flex h-full w-full "></div>
                              </div>
                              <div className=" flex h-auto  md:h-16 ">
                                <div className=""></div>
                                <div className="flex h-full w-full "></div>
                              </div>
                              <div className=" flex h-auto  md:h-16 ">
                                <div className=""></div>
                                <div className="flex h-full w-full "></div>
                              </div>
                              <div className=" flex h-auto  md:h-16  ">
                                <div className=""></div>
                                <div className="flex h-full w-full "></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" flex h-auto w-full flex-col md:h-618 lg:h-786 xl:h-850">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-6   md:flex-row">
                      <div className="mt-5 flex h-auto flex-col rounded-2xl border  md:mt-0  md:h-95 md:w-1/2 lg:w-2/4 xl:w-2/5">
                        <div className="flex h-11 rounded-t-3xl border bg-gray-k">
                          <p className="m-auto text-2xl font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ">
                            GRATUITO{" "}
                          </p>
                        </div>
                        <div className=" m-auto flex h-full w-11/12 flex-col  border">
                          <div className="flex h-16 w-full border md:h-15">
                            <p className="sm:text-md m-auto text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl">
                              Ideal para independientes o particulares
                            </p>
                          </div>
                          <div className="flex h-12 w-full border md:h-15">
                            <p className="m-auto font-open-sans text-3xl font-semibold text-blue-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                              Gratis
                            </p>
                          </div>
                          <div className="flex h-20 w-full border md:h-15">
                            <button className="m-auto h-11 w-36 rounded-lg bg-blue-new font-fira-sans text-sm font-medium text-white">
                              AGENDAR CITA
                            </button>
                          </div>
                          <div className="flex h-3/5 w-full flex-col gap-3  md:gap-0  lg:gap-2 xl:gap-6">
                            <div className="  flex h-auto border   md:h-16  ">
                              <div className=" border">
                                <img className="" src={check} alt="Hi"></img>
                              </div>
                              <div className="flex h-full w-full border">
                                <p className="md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                            <div className=" flex h-auto border md:h-16 ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex h-full  w-full border">
                                <p className="md:text-md text-lg sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                            <div className=" flex h-auto border md:h-16 ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex h-full  w-full border">
                                <p className="md:text-md text-lg sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                            <div className=" flex h-auto border md:h-16 ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex w-full border">
                                <p className="md:text-md h-full  text-lg sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-16 flex h-auto flex-col rounded-2xl border md:mb-0 md:h-95 md:w-1/2 lg:w-2/4  xl:w-2/5">
                        <div className="flex h-11 rounded-t-2xl border bg-orange-new">
                          <p className="m-auto text-2xl font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                            PRO
                          </p>
                        </div>
                        <div className=" m-auto flex h-full w-11/12 flex-col  border">
                          <div className="flex h-16 w-full border md:h-15">
                            <p className="sm:text-md m-auto  text-center font-open-sans text-xl text-gray-t md:text-sm  lg:text-lg xl:text-xl">
                              Ideal para independientes o particulares
                            </p>
                          </div>
                          <div className="flex h-12 w-full border md:h-15">
                            <p className="m-auto font-open-sans text-3xl font-semibold text-orange-new  sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                              $20/mes
                            </p>
                          </div>
                          <div className="flex h-20 w-full border md:h-15">
                            <button className="m-auto h-11 w-36 rounded-lg bg-blue-new font-fira-sans text-sm font-medium text-white">
                              AGENDAR CITA
                            </button>
                          </div>
                          <div className="flex h-3/5 w-full flex-col   md:gap-0 lg:gap-2 xl:gap-6">
                            <div className="  flex h-auto border md:h-16 ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex h-full w-full border">
                                <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                            <div className=" flex h-auto border md:h-16 ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex h-full w-full border">
                                <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                            <div className=" flex h-auto border md:h-16 ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex h-full w-full border">
                                <p className="md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                            <div className=" flex h-auto border md:h-16  ">
                              <div className="border">
                                <img
                                  className="mt-1"
                                  src={check}
                                  alt="Hi"
                                ></img>
                              </div>
                              <div className="flex h-full w-full border">
                                <p className=" md:text-md text-lg  sm:text-sm lg:text-lg xl:text-lg">
                                  Promociona hasta 20 propiedades en la red de
                                  bienes raíces más poderosa en Guatemala
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}

      <Modal
        open={isModalOpen}
        close={closeModal}
        errorEmail={errorEmail}
        errorFirst={errorFirst}
        errorLast={errorLast}
      />
    </div>
  );
};
export default Profile;
