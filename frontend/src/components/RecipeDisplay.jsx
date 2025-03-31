import React, { useEffect } from "react";
import { FaRedo } from "react-icons/fa"; // Added FaRedo icon for regenerate
import SaveBtn from "./partials/SaveBtn";
import { images } from "../utils/images";
import { generateAction ,loadRecipeAction} from "../store/actions/recipeActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "./partials/Loading.jsx"

const RecipeDisplay = ({regenerate, formState, recipe }) => {
  // recipe = {
  //   _id: "67e7062e81db42cd399e9afd",
  //   userId: "67e63aaec801e5e14cfa3e9c",
  //   title:
  //     "Spicy Italian Chicken with Tomatoes and Onions (Low-Carb, Gluten-Free)",
  //   mainIngredients: ["Chicken, Tomatoes, Onions, Chili, Garlic"],
  //   ingredients: [
  //     "1.5 lbs boneless, skinless chicken thighs or breasts, cut into 1-inch pieces",
  //     "1 large onion, chopped",
  //     "4 cloves garlic, minced",
  //     "1 (28 ounce) can crushed tomatoes",
  //     "1 (14.5 ounce) can diced tomatoes, undrained",
  //     "1-2 small red chilies, finely chopped (adjust to your spice preference)",
  //     "2 tablespoons olive oil",
  //     "1 teaspoon dried oregano",
  //     "1 teaspoon dried basil",
  //     "1/2 teaspoon dried thyme",
  //     "Salt and freshly ground black pepper to taste",
  //     "Optional: Fresh basil leaves, for garnish",
  //     "Optional: Grated Parmesan cheese (use sparingly to keep low-carb)",
  //     "Optional: 1/4 cup dry red wine (for added flavor)",
  //   ],
  //   instructions: [
  //     "Heat olive oil in a large skillet or Dutch oven over medium-high heat.",
  //     "Season chicken pieces generously with salt and pepper.",
  //     "Add chicken to the skillet in a single layer (work in batches if necessary) and brown on all sides. Remove chicken and set aside.",
  //     "Add chopped onion to the skillet and cook until softened and translucent, about 5 minutes.",
  //     "Add minced garlic and chopped chili to the skillet and cook for 1 minute more, until fragrant.",
  //     "If using, add the red wine to the skillet and deglaze, scraping up any browned bits from the bottom. Let it simmer for a minute or two until slightly reduced.",
  //     "Add crushed tomatoes, diced tomatoes, oregano, basil, and thyme to the skillet. Season with salt and pepper to taste.",
  //     "Bring the sauce to a simmer, then return the browned chicken to the skillet.",
  //     "Reduce heat to low, cover, and simmer for 20-25 minutes, or until the chicken is cooked through and tender.",
  //     "Taste and adjust seasonings as needed.",
  //     "Serve hot, garnished with fresh basil leaves and a sprinkle of Parmesan cheese (optional).",
  //     "Serve with cauliflower rice or zucchini noodles for a low-carb, gluten-free meal.",
  //   ],
  //   cuisine: "Italian",
  //   preferences: ["Low-Carb", "Gluten-Free"],
  //   source: "gemini",
  //   originalQuery: "",
  //   createdAt: "2025-03-28T20:27:26.525Z",
  //   updatedAt: "2025-03-28T20:27:26.525Z",
  //   __v: 0,
  //   img: "https://plus.unsplash.com/premium_photo-1701006579559-49cf5d1a0b7a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Added img field
  // };

  const renderList = (list, className = "list-disc list-inside mb-4") => (
    <ul className={className}>
      {list.map((item, index) => (
        <li key={index} className="py-1">
          {item}
        </li>
      ))}
    </ul>
  );
  

  const dispatch =  useDispatch();
  const handleRegen = ()=>{
    dispatch(generateAction(formState,true));
  }

  const img = images[Math.floor(Math.random() * images.length)]
  const {id} = useParams()

  const {currentRecipe} = useSelector(store=>store.RecipeSlice)
  if(!recipe) recipe = currentRecipe

  useEffect(()=>{
    if(!recipe) dispatch(loadRecipeAction(id))
  },[])


  return (
    recipe ?
    
    <div className="w-full relative">
      <SaveBtn img={img} position="relative" recipe= {recipe} />
      {regenerate && 
      <div onClick={handleRegen} className="absolute top-0 right-0 z-99 group text-sm">
        <button className="p-2 bg-gradient-to-r uppercase from-blue-400 to-green-400 hover:from-blue-300 hover:to-green-300 transition duration-300 ease-in-out backdrop-blur-2xl cursor-pointer text-white font-bold text-xs py-3.5 px-3.5 rounded-full">
          <FaRedo /> {/* Changed icon to FaRedo for regenerate */}
        </button>
        <span className="absolute left-1/2 -translate-x-[0%] top-full -translate-y-[60%] pointer-events-none z-[99] bg-neutral-700/[.7] group-hover:opacity-100 opacity-0 px-2 text-xs rounded pb-1 transition-opacity duration-300">
          Regenerate
        </span>
      </div>
      }
      <button></button>
            <h2 className="text-3xl font-bold mb-6 w-[90%]">{recipe.title}</h2>
      <div className="mb-6 h-80  bg-gradient-to-r from-purple-200/[.5] to-blue-300/[.5] rounded-lg relative overflow-hidden">
        <img
          src={`https://image.pollinations.ai/prompt/${recipe.title}`}
          alt="Recipe Image"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-600/[.5] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Main Ingredients:</h3>
          {renderList(recipe?.mainIngredients)}
        </div>
        <div className="bg-gray-500/[.5] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Cuisine and Preferences:
          </h3>
          <p className="mb-2">{recipe?.cuisine}</p>
          {renderList(recipe?.preferences)}
        </div>
      </div>
      <div className="bg-gray-400/[.5] p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">Ingredients:</h3>
        {renderList(recipe?.ingredients)}
      </div>
      <div className="bg-gray-500/[.5] p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">Instructions:</h3>
        <ol className="list-decimal list-inside">
          {recipe?.instructions?.map((instruction, index) => (
            <li key={index} className="py-1">
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    </div>
      : <Loading/>

  );
};

export default RecipeDisplay;
