import React from "react";

const socialMedia = ({
  wpp,
  instagram,
  facebook,
  linkedin,
  tiktok,
  socialLinks,
}) => {
  return (
    <div className="flex h-1/5 w-full justify-center">
      <div className="mt-2 flex w-auto gap-2 ">
        <Icon socialLinks={socialLinks.whatsapp} imagen={wpp} />
        <Icon socialLinks={socialLinks.instagram} imagen={instagram} />
        <Icon socialLinks={socialLinks.facebook} imagen={facebook} />
        <Icon socialLinks={socialLinks.tiktok} imagen={tiktok} />
        <Icon socialLinks={socialLinks.linkedin} imagen={linkedin} />
      </div>
    </div>
  );
};

const Icon = ({ imagen, socialLinks }) => {
  return (
    <div className="cursor-pointer">
      <a href={socialLinks} target="blank">
        <img className="h-8 w-8" src={imagen} alt=""></img>
      </a>
    </div>
  );
};

export default socialMedia;
