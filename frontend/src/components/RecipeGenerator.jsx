import React, { useState } from "react";
import Btn from "./partials/Btn";
import { FormField } from "./partials/FormField";
import { useDispatch, useSelector } from "react-redux";
import { generateAction } from "../store/actions/recipeActions";

const RecipeGenerator = () => {
  const [formState, setFormState] = useState({
    ingredients: [],
    preferences: [],
    cuisineType: "", // Changed from cuisine to cuisineType
  });
  
  const {isLoading} =  useSelector(store=> store.RecipeSlice)

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(generateAction(formState));

  };

  return (
    <div className="w-full mx-auto px-8 pb-4 py-6 rounded-2xl">
      <h2 className="text-center w-[70%] mx-auto text-lg tracking-wide md:text-3xl font-bold text-neutral-200 mb-6">Discover Your Next Favorite Dish</h2>
      <form onSubmit={handleSubmit} className="space-y-5 flex items-center flex-col">
        <FormField
          id="ingredients"
          label="Ingredients"
          value={formState.ingredients.join(", ")}
          onChange={(e) => setFormState({ ...formState, ingredients: e.target.value.split(",").map((item) => item.trim()) })}
          placeholder="Enter ingredients (comma-separated)"
          type="textarea"
        />
        <FormField
          id="preferences"
          label="Dietary Preferences"
          value={formState.preferences.join(", ")}
          onChange={(e) => setFormState({ ...formState, preferences: e.target.value.split(",").map((item) => item.trim()) })}
          placeholder="Vegetarian, Keto, etc."
        />
        <FormField
          id="cuisineType" // Changed from cuisine to cuisineType
          label="Cuisine Type"
          value={formState.cuisineType} // Changed from cuisine to cuisineType
          onChange={(e) => setFormState({ ...formState, cuisineType: e.target.value })} // Changed from cuisine to cuisineType
          placeholder="Italian, Indian, Mexican..."
        />
        <Btn text={isLoading ? <LoadingIndicator /> : "Generate Recipe"} disabled={isLoading  } />
      </form>
    </div>
  );
};

const LoadingIndicator = () => (
  <div className="flex justify-center">
    <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

export default RecipeGenerator;