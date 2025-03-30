import toast from "react-hot-toast"
import { generate, getAllSaved, save, unsave } from "../../services/recipe.services.js";
import { loading, loadrecipes, saveRecipe, setAiRecipe } from "../slices/RecipeSlice";

export const generateAction = (requirements)=> async (dispatch,getState)=>{
    try {
        dispatch(loading(true));
        const {data} = await generate(requirements);
        dispatch(loading(false));
        dispatch(setAiRecipe(data?.data));
        toast.success("Recipe generated successfully!")
        
    } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error("Error generating recipe") 
    }
}

export const saveRecipeAction = (recipe,navigate)=> async ( dispatch,getState )=>{
    try {
        const recipes = getState().RecipeSlice.recipes;
        const isRecipeAlreadySaved = recipes.findIndex(r => r.title === recipe.title) !== -1;
        // dispatch(setAiRecipe(null))
        if (isRecipeAlreadySaved) {
            toast.success("Recipe already saved.");
            navigate("/saved");
            return;
        }
        const {data} =  await save(recipe);
        const updatedRecipes = [...recipes,data?.data]
        
        dispatch(saveRecipe(updatedRecipes));
        navigate("/saved")
        toast.success("Recipe saved successfully!")
        
    } catch (error) {
        console.log(error)
        toast.error("Can't save recipe.")
        
    }
}

export const unsaveRecipeAction = (recipe,navigate)=> async (dispatch, getState) => {
    try {
        const recipes = getState().RecipeSlice.recipes;
        const isRecipeAlreadySaved = recipes.findIndex(r => r.title === recipe.title) !== -1;
        if (!isRecipeAlreadySaved) {
            toast.error("Recipe not found.");
            navigate("/saved");
            return;
        }
        const {data} = await unsave(recipe._id);
        const updatedRecipes = recipes.filter(r => r.title !== recipe.title);
        
        dispatch(saveRecipe(updatedRecipes));
        navigate("/saved")
        toast.success("Recipe unsaved successfully!")
        
    } catch (error) {
        console.log(error)
        toast.error("Can't unsave recipe.")
        
    }
}

export const getSavedRecipesAction = ()=> async (dispatch, getState) => {
    try {
        const {data} = await getAllSaved();
        dispatch(loadrecipes(data?.data));
    } catch (error) {
        console.log(error)
        
    }
}