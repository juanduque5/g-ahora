import React from "react";

export const Header = (props) => {
  //   const { selected, imgSrc, index, onClick } = props;

  return (
    <div className="flex h-20 w-full items-center justify-between   bg-blue-dark">
      <div className="flex justify-start">
        <div className="flex gap-1 ">
          <div className="flex w-20 border-r">
            <p className="m-auto text-white">ajaja</p>
          </div>
          <div className="flex w-20">
            <p className="m-auto text-white">jaja</p>
          </div>
        </div>
      </div>

      <div className="mr-4 flex w-20 border">
        <p className="m-auto text-white">jaja</p>
      </div>
    </div>
  );
};
