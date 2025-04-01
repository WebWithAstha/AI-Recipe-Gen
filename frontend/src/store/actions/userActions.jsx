import toast from "react-hot-toast";
import { currentUser, login, logout, register } from "../../services/user.services.js";
import { loading, loadUser } from "../slices/UserSlice";
import { loadrecipes } from "../slices/RecipeSlice.jsx";

export const loginUserAction = (credentials,navigate) => async (dispatch, getState) => {
    try {
        dispatch(loading(true));
        const { data } = await login(credentials);
        dispatch(loadUser(data?.data?.user))
        dispatch(loading(false));
        toast.success("Welcome Back!");
        navigate('/dashboard')
    } catch (error) {
        dispatch(loading(false));
        console.log(error?.response?.data?.message)
        if(error?.response?.data.message==='User not found') toast.error("Sign up first!");
        else if(error?.response?.data.message== 'Unauthorized: No token provided'){
            navigate('/')
            toast.error("Login failed"); 
        }
        else if(error?.response?.data.message.includes('Wrong')){

            toast.error("Invalid email or password");
        } else
        toast.error("Login failed"); 
    }
};

export const registerUserAction = (userInfo,navigate) => async (dispatch, getState) => {
    try {
        dispatch(loading(true));
        const { data } = await register(userInfo);
        dispatch(loadUser(data?.data?.user))
        dispatch(loading(false));
        toast.success("Let's go newbie!");
        navigate('/dashboard')
    } catch (error) {
        dispatch(loading(false));
        console.log(error?.response?.data)
        toast.error("Registration failed");
    }
};
export const loadUserAction = (navigate)=> async(dispatch,getState)=>{
    try {
        dispatch(loading(true));
        const {data} =  await currentUser();
        dispatch(loadUser(data?.data))
        dispatch(loading(false));
    } catch (error) {
        dispatch(loading(false));
        if(error?.response?.data.message === 'Unauthorized: No token provided'){
            navigate('/')
        } 
    }
}
export const logoutUserAction = (navigate)=> async(dispatch,getState)=>{
    try {
        dispatch(loading(true));
        await logout();
            toast.success("Be back foodie!");
            dispatch(loadrecipes([]))
            dispatch(loadUser(null))
            navigate('/')
    } catch (error) {
        dispatch(loading(false));
        console.log(error)
        
    }
}