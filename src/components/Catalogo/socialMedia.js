import React from "react";

const socialMedia = ({ wpp, instagram, facebook, linkedin, tiktok }) => {
  return (
    <div className="flex h-1/5 w-full justify-center">
      <div className="mt-2 flex w-auto gap-2 ">
        <Icon imagen={wpp} />
        <Icon imagen={instagram} />
        <Icon imagen={facebook} />
        <Icon imagen={tiktok} />
        <Icon imagen={linkedin} />
      </div>
    </div>
  );
};

const Icon = ({ imagen }) => {
  return (
    <div className="cursor-pointer">
      <img className="h-8 w-8" src={imagen} alt=""></img>
    </div>
  );
};

export default socialMedia;
