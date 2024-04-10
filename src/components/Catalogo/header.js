import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../../images/back.png";
import share from "../../images/share2.png";
import Modal from "./modal";
import { useState } from "react";

export const Header = (props) => {
  const { token, socialLinks } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Navigate = useNavigate();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "¡Comparte este sitio!",
          url: window.location.href,
        });
      } else {
        // Si la API Web Share no está disponible, muestra un enlace de compartir
        const shareUrl = window.location.href;
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl);
          alert("El enlace ha sido copiado al portapapeles.");
        } else {
          prompt("Doble tap para copiar el enlace:", shareUrl);
        }
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="  bg-blue-dark">
      <div className="ajusta m-auto flex h-16  w-full items-center justify-between">
        <div className="flex ">
          {token ? (
            <div onClick={() => Navigate(-1)} className="w-auto cursor-pointer">
              <img className="" src={back} alt=""></img>
            </div>
          ) : (
            <div className="w-auto">
              <p className="text-lg text-white">Asesor</p>
            </div>
          )}
        </div>

        <div className="flex h-12 w-auto  gap-4 ">
          <div onClick={handleShare} className="flex">
            <img className="m-auto cursor-pointer" src={share} alt=""></img>{" "}
          </div>
          <div
            onClick={handleModal}
            className="flex h-full w-full cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="m-auto h-7 w-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} close={closeModal} socialLinks={socialLinks} />
    </div>
  );
};

export default Header;
