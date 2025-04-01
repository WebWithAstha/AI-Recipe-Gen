import React, { useEffect } from "react";
import Btn from "./partials/Btn";
import { Link } from "react-router-dom";
import SaveBtn from "./partials/SaveBtn";
import { useDispatch, useSelector } from "react-redux";
import { getSavedRecipesAction } from "../store/actions/recipeActions.jsx";
import Loading from "./partials/Loading.jsx";

// const sampleRecipes = [
//   {
//     id: 1,
//     title: "Spaghetti Aglio e Olio",
//     ingredients: ["Spaghetti", "Garlic", "Olive Oil"],
//     cuisine: "Italian",
//     preferences: ["Vegetarian", "Quick Meal"],
//   },
//   {
//     id: 2,
//     title: "Chicken Tacos",
//     ingredients: ["Chicken", "Tortillas", "Salsa"],
//     cuisine: "Mexican",
//     preferences: ["Meat Lover", "Spicy"],
//   },
//   {
//     id: 3,
//     title: "Veggie Stir Fry",
//     ingredients: ["Broccoli", "Carrots", "Rice"],
//     cuisine: "Chinese",
//     preferences: ["Vegan", "Healthy"],
//   },
//   {
//     id: 4,
//     title: "Beef Burgers",
//     ingredients: ["Beef", "Buns", "Cheese"],
//     cuisine: "American",
//     preferences: ["Meat Lover", "Comfort Food"],
//   },
// ];


const RecipeCard = ({ recipe,index }) => {

  return (
    <div className="bg-neutral-100/[.2] relative rounded-xl max-h-[30rem] p-6 flex flex-col items-center shadow-lg">
      
      <div className="w-full bg-gradient-to-r from-purple-200/[.3] to-blue-300/[.3] rounded-xl overflow-hidden shrink-0 mb-2">
        <img
          src={`https://image.pollinations.ai/prompt/${recipe.title}`}
          alt={recipe.title}
          className="w-full h-56 object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold mb-1 text-center">{recipe.title.length > 25 ? `${recipe.title.substring(0, 40)}...` : recipe.title}</h2>
      <p className="text-neutral-400 mb-6 ">Cuisine: <span className="text-yellow-500"> {recipe.cuisine.length > 10 ? `${recipe.cuisine.substring(0, 10)}...` : recipe.cuisine}</span></p>

      <div className="relative flex gap-2 items-center justify-self-end mt-auto">
      <SaveBtn recipe={recipe} status={true} position={"relative"}/>

        <Link to={`/d/${recipe?._id}`} className="inline-block">
        <Btn text={"View"}/>
        </Link>
      </div>
    </div>
  );
};

const SavedRecipesPage = () => {
  const {recipes} = useSelector(store=>store.RecipeSlice)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(recipes?.length <2) dispatch(getSavedRecipesAction())
  },[dispatch])


  return (

    recipes?.length > 0 ? 
    <div className="rounded-xl mx-auto lg:w-[70vw] max-w-[1256px]">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-xl bg-neutral-600/[0] text-white"
        >
         {[...recipes].reverse().map((recipe, index) => (
          <RecipeCard key={recipe._id} recipe={recipe} index={index} />
        ))}
      </div>
    </div>
    : <div className="flex items-center justify-center flex-col gap-4 h-[60vh] "> <img src="https://i.gifer.com/42xT.gif" alt="" /> <h2 className="text-white font-black tracking-wide backdrop-blur-xs px-2">No recipe found</h2></div>
  );
};

export default SavedRecipesPage;
