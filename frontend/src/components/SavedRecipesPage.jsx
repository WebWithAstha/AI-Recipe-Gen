import React from "react";
import Btn from "./partials/Btn";
import { Link } from "react-router-dom";
import SaveBtn from "./partials/SaveBtn";

const sampleRecipes = [
  {
    id: 1,
    title: "Spaghetti Aglio e Olio",
    ingredients: ["Spaghetti", "Garlic", "Olive Oil"],
    cuisine: "Italian",
    preferences: ["Vegetarian", "Quick Meal"],
  },
  {
    id: 2,
    title: "Chicken Tacos",
    ingredients: ["Chicken", "Tortillas", "Salsa"],
    cuisine: "Mexican",
    preferences: ["Meat Lover", "Spicy"],
  },
  {
    id: 3,
    title: "Veggie Stir Fry",
    ingredients: ["Broccoli", "Carrots", "Rice"],
    cuisine: "Chinese",
    preferences: ["Vegan", "Healthy"],
  },
  {
    id: 4,
    title: "Beef Burgers",
    ingredients: ["Beef", "Buns", "Cheese"],
    cuisine: "American",
    preferences: ["Meat Lover", "Comfort Food"],
  },
];

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-neutral-100/[.2] relative rounded-xl max-h-[30rem] p-6 flex flex-col items-center shadow-lg">
      
      <div className="w-full bg-gradient-to-r from-purple-200/[.3] to-blue-300/[.3] rounded-xl overflow-hidden shrink-0 mb-2">
        <img
          src={`https://picsum.photos/id/${recipe.id+80}/200/300`}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold mb-1 text-center">{recipe.title.length > 25 ? `${recipe.title.substring(0, 40)}...` : recipe.title}</h2>
      <p className="text-neutral-400 mb-2">Cuisine: <span className="text-yellow-500"> {recipe.cuisine.length > 10 ? `${recipe.cuisine.substring(0, 10)}...` : recipe.cuisine}</span></p>
      {recipe.preferences.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          <strong className="text-neutral-400 text-sm">Preferences:</strong>
          {recipe.preferences.slice(0, 3).map((preference, index) => (
            <span
              key={index}
              className="bg-neutral-800/[.7] cursor-default text-neutral-200 text-xs font-bold py-1 px-2 rounded-full border border-neutral-700"
            >
              {preference}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex gap-2 items-center justify-self-end mt-auto">
      <SaveBtn position={"relative"}/>

        <Link to={`/d/${recipe.id}`} className="inline-block">
        <Btn text={"View"}/>
        </Link>
      </div>
    </div>
  );
};

const SavedRecipesPage = () => {
  return (
    <div className="rounded-xl">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-xl p-10 bg-neutral-600/[0] text-white"
      >
        {sampleRecipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default SavedRecipesPage;
