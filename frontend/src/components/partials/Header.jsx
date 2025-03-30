import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Btn from "./Btn";
import logo from "../../assets/genie.png";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi"; // Importing the logout icon from React Icons
import { logoutUserAction } from "../../store/actions/userActions";

const Header = () => {
  
  const {user} = useSelector(store=> store.UserSlice);
  const navigate =  useNavigate();
  const dispatch =  useDispatch();
  const handleLogout = () => {
    dispatch(logoutUserAction(navigate))
  }

  return (
    <div className="fixed z-[99] w-full  left-0 top-0  flex backdrop-blur-sm justify-center">
      <header className=" w-full max-w-[1256px] px-6 py-3 text-white lg-[70vw] max-auto flex  justify-between items-center">

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
            to="/saved"
            className="text-white hover:text-sky-300"
            style={{ textDecoration: "none" }}
          >
            Saved Recipes
          </NavLink>
          <div>
            {user ? (
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-700 to-yellow-500 overflow-hidden">
                  {user.name.substring(0,1)}
                </div>
                <button
                  className="border-0 backdrop-blur-2xl bg-white/[.11] cursor-pointer duration-150 hover:text-rose-400 font-black text-xs px-4 py-2 rounded-lg"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-sm font-black"  /> 
                </button>
              </div>
            ) : (
              <Link to="/auth">

              <Btn
                text="Login/Signup"
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                />
                </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
