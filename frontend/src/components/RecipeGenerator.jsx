import React, { useState } from "react";
import Btn from "./partials/Btn";
import { FormField } from "./partials/FormField";
import { useDispatch, useSelector } from "react-redux";
import { generateAction } from "../store/actions/recipeActions";
import toast from "react-hot-toast";
import { LoadingIndicator } from "./partials/LoadingIndicator";

const RecipeGenerator = ({formState,setFormState}) => {
 
  
  const {isLoading} =  useSelector(store=> store.RecipeSlice)

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormState = {
      ...formState,
      cuisineType: formState.cuisineType || "general",
      ingredients: formState.ingredients
        ? formState.ingredients.split(",").map((item) => item.trim())
        : [],
      preferences: formState.preferences
        ? formState.preferences.split(",").map((item) => item.trim())
        : [],
    };

    if (updatedFormState.ingredients.length > 0) {
      dispatch(generateAction(updatedFormState, false));
    } else {
      toast.error("No ingredients? No recipe");
    }
  };

  return (
    <div className="w-full mx-auto px-6  rounded-2xl">
      <h2 className="text-center w-[70%] md:mt-0 mt-4 mx-auto text-lg tracking-wide md:text-3xl font-bold text-neutral-200 mb-6">Discover Your Next Favorite Dish</h2>
      <form onSubmit={handleSubmit} className="space-y-5 flex items-center flex-col">
        <FormField
          id="ingredients"
          label="Ingredients"
          value={formState.ingredients}
          onChange={(e) => setFormState({ ...formState, ingredients: e.target.value })}
          placeholder="Enter ingredients (comma-separated)"
          type="textarea"
          required={true}
        />
        <FormField
          id="preferences"
          label="Dietary Preferences"
          value={formState.preferences}
          onChange={(e) => setFormState({ ...formState, preferences: e.target.value })}
          placeholder="Vegetarian, Keto, etc."
        />
        <FormField
          id="cuisineType" 
          label="Cuisine Type"
          value={formState.cuisineType} 
          onChange={(e) => setFormState({ ...formState, cuisineType: e.target.value })} 
          placeholder="Italian, Indian, Mexican..."
          required={true}

        />
        <Btn text={isLoading ? <LoadingIndicator /> : "Generate Recipe"} disabled={isLoading} />
      </form>
    </div>
  );
};

export default RecipeGenerator;