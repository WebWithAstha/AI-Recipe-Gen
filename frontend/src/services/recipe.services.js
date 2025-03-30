import axios from "../utils/axios"

export const generate = async (requirements,regenerate)=>{
    return await axios.post('/recipes/generate',{...requirements, regenerate});
}

export const save  = async (recipe)=>{
    return await axios.post('/recipes/save',recipe);
}

export const unsave  = async (id)=>{
    return await axios.post(`/recipes/unsave/${id}`);
}

export const getAllSaved = async ()=>{
    return await axios.post('/recipes/saved');
}

export const getRecipe = async (id)=>{
    return await axios.post(`/recipes/saved/${id}`);
}