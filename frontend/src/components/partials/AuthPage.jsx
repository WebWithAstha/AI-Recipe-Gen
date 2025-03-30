import React, { useState } from "react";
import { FormField } from "./FormField";
import Btn from "./Btn";
import logo from "../../assets/genie.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(store => store.UserSlice)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        dispatch(loginUserAction({email,password},navigate))
      } else {
        dispatch(registerUserAction({name,email,password},navigate))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className="w-full flex justify-center">
    <div className=" w-max h-max flex md:flex-row flex-col items-center justify-between  gap-8 p-10 rounded-2xl bg-neutral-600/[.6] text-white">
      <div className="flex md:w-[15rem] lg:w-[18rem] w-32 justify-center rounded-full overflow-hidden">
        <img
          src={logo}
          alt="Recipe Genie Logo"
          className=" h-full w-max  mx-auto"
        />
      </div>
      <div className="flex flex-1 items-center lg:w-[30rem] flex-col gap-8 ">
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold">
            {mode === "login"
              ? "Login to Your Recipe World!"
              : "Join the Recipe Revolution!"}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 max-w-[30rem] w-full flex items-center flex-col"
        >
          {mode === "register" && (
            <FormField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name to join the culinary journey!"
            />
          )}
          <FormField
            id="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to get cooking!"
          />
          <FormField
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password that's the icing on the cake!"
          />
          <Btn
            text={mode === "login" ? "Sign In to Savor" : "Sign Up for a Taste"}
          />
        </form>
        <p className=" text-md">
          {mode === "login"
            ? "New to Recipe Genie? "
            : "Already a Recipe Rockstar? "}
          <span className="text-sky-500 cursor-pointer" onClick={toggleMode}>
            {mode === "login" ? "Join the Fun!" : "Login to Your Account"}
          </span>
        </p>
      </div>
    </div>
    </div>
  );
};

export default AuthPage;
