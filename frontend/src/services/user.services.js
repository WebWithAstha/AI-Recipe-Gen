import axios from "../utils/axios"

export const login = async (credentials)=>{
    return await axios.post('/auth/login',credentials)
}
export const register = async (data)=>{
    return await axios.post('/auth/register',data)
}

export const logout = async ()=>{
    return await axios.post('/auth/logout')
}

export const currentUser = async ()=>{
    return await axios.post('/auth/')
}