import React from "react";

export const Header = (props) => {
  //   const { selected, imgSrc, index, onClick } = props;

  return (
    <div className="  bg-orange-dark">
      <div className="ajusta m-auto flex h-16  w-full justify-between">
        <div className="flex items-center">
          <div className="flex w-auto border-r pl-2 pr-2">
            <p className="m-auto font-bold text-white">Yesenia gomez</p>
          </div>
          <div className="ml-2 flex">
            <p className="m-auto  text-white">asesora inmobilaria</p>
          </div>
        </div>

        <div className="flex h-12 w-40 cursor-pointer self-center  border">
          <p className="m-auto font-bold text-white ">Contactar Agente</p>
        </div>
      </div>
    </div>
  );
};
