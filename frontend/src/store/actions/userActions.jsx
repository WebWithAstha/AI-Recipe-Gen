import toast from "react-hot-toast";
import { currentUser, login, logout, register } from "../../services/user.services.js";
import { loadUser } from "../slices/UserSlice";

export const loginUserAction = (credentials,navigate) => async (dispatch, getState) => {
    try {
        const { data } = await login(credentials);
        dispatch(loadUser(data?.data?.user))
        toast.success("Login successful");
        navigate('/')
    } catch (error) {
        console.log(error?.response?.data)
        toast.error("Login failed");
    }
};

export const registerUserAction = (userInfo,navigate) => async (dispatch, getState) => {
    try {
        const { data } = await register(userInfo);
        dispatch(loadUser(data?.data?.user))
        toast.success("Registration successful");
        navigate('/')
    } catch (error) {
        console.log(error?.response?.data)
        toast.error("Registration failed");
    }
};

export const loadUserAction = (navigate)=> async(dispatch,getState)=>{
    try {
        console.log("atUserAction")
        const {data} =  await currentUser();
        dispatch(loadUser(data?.data))

        console.log(data?.data)
        
    } catch (error) {
        console.log(error)
        
    }
}

export const logoutUserAction = (navigate)=> async(dispatch,getState)=>{
    try {
        await logout();
        dispatch(loadUser(null))
        toast.success("Logout successful");
        navigate('/')
    } catch (error) {
        console.log(error)
        
    }
}