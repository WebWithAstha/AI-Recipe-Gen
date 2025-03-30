import React from "react";
import { NavLink } from "react-router-dom";
import Btn from "./Btn";
import logo from "../../assets/genie.png";

const Header = () => {
  const isLoggedIn = true;

  return (
    <div className="fixed z-[99] w-full  left-0 top-0  flex backdrop-blur-sm justify-center">
      <header className=" w-full max-w-[1256px]  p-4 px-16 flex  justify-between items-center">

          <NavLink to="/" >

        <div className="flex gap-1 items-center">
          <img className="h-10 rounded-full" alt="Logo" src={logo} />
          <div>
            <h2 className="leading-none italic text-xs">Recipe</h2>
            <h2 className="leading-none italic">Genie</h2>
          </div>
        </div>
          </NavLink>
        <nav className="flex items-center gap-10">
          <NavLink
            to="/"
            className="text-white hover:text-sky-300"
            style={{ textDecoration: "none" }}
          >
            Generate
          </NavLink>
          <NavLink
            to="/auth"
            className="text-white hover:text-sky-300"
            style={{ textDecoration: "none" }}
          >
            Auth
          </NavLink>
          <NavLink
            to="/saved"
            className="text-white hover:text-sky-300"
            style={{ textDecoration: "none" }}
          >
            Saved Recipes
          </NavLink>
          <div>
            {isLoggedIn ? (
              <div className="h-10 w-10 rounded-full bg-amber-500 overflow-hidden">
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={`https://picsum.photos/id/90/200/300`}
                  alt=""
                />
              </div>
            ) : (
              <Btn
                text="Login/Signup"
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
              />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
