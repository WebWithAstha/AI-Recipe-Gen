import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Btn from "./Btn";
import logo from "../../assets/genie.png";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut ,FiMenu, FiX} from "react-icons/fi"; // Importing the logout icon from React Icons
import { logoutUserAction } from "../../store/actions/userActions";
import { LoadingIndicator } from "./LoadingIndicator";

const Header = () => {
  
  const {user,isLoading} = useSelector(store=> store.UserSlice);
  const navigate =  useNavigate();
  const dispatch =  useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUserAction(navigate))
    setIsMenuOpen(false);
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const MobileMenu = () => {
    if (!isMenuOpen) return null;
    
    return (
      <div className="absolute top-0 pt-16 z-[-1] left-0 right-0 bg-gradient-to-r from-gray-800 to-[#101828] backdrop-blur-sm py-4 md:hidden">
        <div className="flex flex-col px-6 gap-4">
          <NavLink
            to="/dashboard"
            className="text-white hover:text-sky-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Generate
          </NavLink>
          <NavLink
            to="/saved"
            className="text-white hover:text-sky-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Saved Recipes
          </NavLink>
          {user && (
            <div className="flex items-center justify-between py-2 border-t border-gray-700 mt-2 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-700 to-yellow-500 overflow-hidden">
                  {user?.name?.substring(0, 1)}
                </div>
                <span className="text-white">{user?.name}</span>
              </div>
              <Logout/>
            </div>
          )}
        </div>
      </div>
    );
  };
  const Logout = ()=>{
    return (
      <div className="relative group">

                <button
                  className="border-0 text-white backdrop-blur-2xl bg-white/[.11] cursor-pointer duration-150 hover:text-rose-400 font-black text-xs px-4 py-3 rounded-lg"
                  onClick={handleLogout}
                  >
                 {isLoading ? <LoadingIndicator/> : <FiLogOut className="text-sm font-black"  /> }
                </button>
                <span className={`absolute -translate-x-[0%] text-white top-full left-[20%] -translate-y-[30%] pointer-events-none z-[99] bg-neutral-700/[.7] group-hover:opacity-100 opacity-0 px-2 text-xs rounded pb-1 transition-opacity duration-300`}>
            Logout
          </span>
                  </div>
    )
  }  

  return (
    <div className="fixed z-[99] w-full  left-0 top-0  flex backdrop-blur-sm justify-center">
      <header className=" w-full max-w-[1256px] px-6 py-3 text-white lg-[70vw] max-auto flex  justify-between items-center">

          <NavLink to="/dashboard" >

        <div className="flex gap-1 items-center">
          <img className="h-10 rounded-full" alt="Logo" src={logo} />
          <div>
            <h2 className="leading-none italic text-xs">Recipe</h2>
            <h2 className="leading-none italic">Genie</h2>
          </div>
        </div>
          </NavLink>
          
        <nav className="md:flex hidden items-center gap-10">
          <NavLink
            to="/dashboard"
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
            {user &&
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-700 to-yellow-500 overflow-hidden">
                  {user?.name?.substring(0,1)}
                </div>
                <Logout/>
              </div>
            }
          </div>
        </nav>
        <button 
          className="md:hidden border-0 backdrop-blur-2xl bg-white/[.11] cursor-pointer px-3 py-2 rounded-lg"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
        </button>
      </header>
      <MobileMenu />

    </div>
  );
};



export default Header;
