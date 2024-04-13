import React from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center py-6 bg-black text-white">
      <div className="flex flex-col  justify-between items-center gap-6 ">
        <div>Contact us Via Whatsapp</div>
        <a target="_blank" rel="noreferrer" href="https://wa.link/1irkr3">
          <div className="text-2xl flex justify-center items-center gap-2">
            <AiOutlineWhatsApp /> +2349167800391
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
