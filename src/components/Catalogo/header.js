import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../../images/back.png";
import share from "../../images/share2.png";

export const Header = (props) => {
  //   const { selected, imgSrc, index, onClick } = props;

  const Navigate = useNavigate();

  return (
    <div className="  bg-blue-dark">
      <div className="ajusta m-auto flex h-16  w-full items-center justify-between">
        <div className="flex ">
          <div onClick={() => Navigate(-1)} className="w-auto cursor-pointer">
            <img className="" src={back} alt=""></img>
          </div>
        </div>

        <div className="flex h-12 w-auto  gap-4 ">
          <div className="flex  ">
            <img className="m-auto cursor-pointer" src={share} alt=""></img>{" "}
          </div>
          <div className="flex h-full w-full cursor-pointer border">
            <p className="m-auto font-bold text-white ">Contactar Agente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
