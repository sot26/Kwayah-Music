import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../asset/logo.png";

const Navbar = () => {
  const activeLink = ({ isActive }) =>
    isActive ? "text-gray-600 font-bold border-black" : "";
  return (
    <div className="w-full h-auto">
      <div className="w-full flex flex-col justify-center items-center">
        <Link to="/">
          <img src={logo} className="h-[80px]" />
        </Link>
        <div className="text-md md:text-lg lg:text-xl flex w-full justify-center bg-black text-white">
          <NavLink to="/music" className={activeLink}>
            <p className="p-2 w-full bg-black ">Music</p>
          </NavLink>
          {/* <NavLink to="/entertainment" className={activeLink}>
            <p className="p-2 w-full bg-green-500">Entertainment</p>
          </NavLink> */}
          <NavLink to="/news" className={activeLink}>
            <p className="p-2 w-full bg-black ">News</p>
          </NavLink>
          <NavLink to="/videos" className={activeLink}>
            <p className="p-2 w-full bg-black ">Videos</p>
          </NavLink>
          {/* <NavLink to="/sport" className={activeLink}>
            <p className="p-2 w-full bg-green-500">Sport</p>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
