import React, { useState } from "react";
import Btn from "./partials/Btn";
import { FormField } from "./partials/FormField";

const RecipeGenerator = ({ recipe, setRecipe }) => {
  const [formState, setFormState] = useState({
    ingredients: [],
    preferences: [],
    cuisine: "",
    loading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    setTimeout(() => {
      setFormState({ ...formState, loading: false });
    }, 1000);
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
          id="cuisine"
          label="Cuisine Type"
          value={formState.cuisine}
          onChange={(e) => setFormState({ ...formState, cuisine: e.target.value })}
          placeholder="Italian, Indian, Mexican..."
        />
        <Btn text={formState.loading ? <LoadingIndicator /> : "Generate Recipe"} disabled={formState.loading} />
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