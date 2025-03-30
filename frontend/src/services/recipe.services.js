import axios from "../utils/axios"

export const generate = async (requirements)=>{
    console.log("at generate")
    return await axios.post('/recipes/generate',requirements);
}

export const save  = async (recipe)=>{
    console.log("at save")
    return await axios.post('/recipes/save',recipe);
}

export const unsave  = async (id)=>{
    console.log("at save")
    return await axios.post(`/recipes/unsave/${id}`);
}

export const getAllSaved = async ()=>{
    console.log("at getAllSaved")
    return await axios.post('/recipes/saved');
}