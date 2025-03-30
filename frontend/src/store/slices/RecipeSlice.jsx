import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes : [],
    aiRecipe : null,
    isLoading : false,
    currentRecipe : null,

}

const recipeslice =  createSlice({
    name:'recipes',
    initialState,
    reducers: {
        setCurrentRecipe : (state,action)=>{
            state.currentRecipe = action.payload;
            state.isLoading = false;
        },
        loadrecipes : (state,action) => {
            state.recipes = action.payload;
            state.isLoading = false;
        },
        saveRecipe : (state,action)=>{
            state.recipes = action.payload;
            state.isLoading = false;
        },
        setAiRecipe : (state,action)=>{
            state.aiRecipe = action.payload;
            state.isLoading = false;
        },
        loading : (state,action)=>{
            state.isLoading = action.payload;
        }
    }
})

export const {setCurrentRecipe, loadrecipes,saveRecipe, setAiRecipe, loading} = recipeslice.actions;
export default recipeslice.reducer;