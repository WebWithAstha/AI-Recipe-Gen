import RecipeGenerator from "../components/RecipeGenerator";
import { useState, useEffect } from "react";
import RecipeDisplay from "./RecipeDisplay.jsx";
import heroImage from "../assets/genie.png"; // Importing the image from the assets folder
import { useSelector } from "react-redux";

function Home() {
  const {aiRecipe} = useSelector(store=>store.RecipeSlice);

  const [formState, setFormState] = useState({
    ingredients: [],
    preferences: [],
    cuisineType: "general", 
  });

  useEffect(() => {
    if (aiRecipe) {
      window.scrollTo({
        top: window.innerHeight * 0.7,
        behavior: 'smooth'
      });
    }
  }, [aiRecipe]);

  return (
    <div className="flex  items-center justify-center flex-col">
      <div className="max-w-[1256px] w-full lg:w-[70vw]  h-max rounded-2xl  text-white">
        <div className="flex rounded-2xl py-6 bg-neutral-600/[.6] md:flex-row flex-col ">
          <RenderHeroSection />
          <div className="w-[.02rem] opacity-30 rounded-full bg-white"></div>
          <RenderRecipeGenerator formState={formState} setFormState={setFormState} />
        </div>
        {aiRecipe && <div className="border-t-0 mt-2 bg-neutral-600/[.6] rounded-2xl px-6 py-6">

        <RecipeDisplay formState={formState} setFormState={setFormState} regenerate={true} recipe={aiRecipe} />
        </div> 
        }
      </div>
    </div>
  );
}

const RenderHeroSection = () => (
  <section className="text-center  relative px-10 z-[0] overflow-hidden  md:border-none border-b pb-8 md:rounded-lg">
    <img
      className="md:h-[70%] h-20 md:left-1/2 md:-translate-x-1/2 md:absolute w-max z-[-1] bottom-8  object-contain opacity-100 mx-auto "
      src={heroImage} 
      alt=""
    />
    
    <h1 className="md:text-4xl text-xl tracking-wide font-bold">Recipe Genie</h1>
    <p className="my-2 text-lg">Your AI-powered recipe generator</p>
  </section>
);

const RenderRecipeGenerator = ({formState,setFormState}) => (
  <div className=" flex-1 flex items-center justify-center ">
    <RecipeGenerator setFormState={setFormState} formState={formState} />
  </div>
);

export default Home;
