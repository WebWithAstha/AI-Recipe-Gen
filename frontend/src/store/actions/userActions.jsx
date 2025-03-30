import toast from "react-hot-toast";
import { currentUser, login, logout, register } from "../../services/user.services.js";
import { loadUser } from "../slices/UserSlice";
import { loadrecipes } from "../slices/RecipeSlice.jsx";

export const loginUserAction = (credentials,navigate) => async (dispatch, getState) => {
    try {
        const { data } = await login(credentials);
        dispatch(loadUser(data?.data?.user))
        toast.success("Welcome Back!");
        navigate('/dashboard')
    } catch (error) {
        console.log(error?.response?.data)
        if(error?.response?.data.message==='User not found') toast.error("Sign up first!");
        else 
            toast.error("Login failed");
    }
};

export const registerUserAction = (userInfo,navigate) => async (dispatch, getState) => {
    try {
        const { data } = await register(userInfo);
        dispatch(loadUser(data?.data?.user))
        toast.success("Let's go newbie!");
        navigate('/dashboard')
    } catch (error) {
        console.log(error?.response?.data)
        toast.error("Registration failed");
    }
};

export const loadUserAction = (navigate)=> async(dispatch,getState)=>{
    try {
        const {data} =  await currentUser();
        dispatch(loadUser(data?.data))
    } catch (error) {
        console.log(error)
        
    }
}

export const logoutUserAction = (navigate)=> async(dispatch,getState)=>{
    try {
        await logout();
        dispatch(loadUser(null))
        dispatch(loadrecipes([]))
        toast.success("Bye foodie!");
        navigate('/')
    } catch (error) {
        console.log(error)
        
    }
}