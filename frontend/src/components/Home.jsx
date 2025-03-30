import RecipeGenerator from "../components/RecipeGenerator";
import { useState } from "react";
import RecipeDisplay from "./RecipeDisplay.jsx";
import heroImage from "../assets/genie.png"; // Importing the image from the assets folder
import { useSelector } from "react-redux";

function Home() {
  const {aiRecipe} = useSelector(store=>store.RecipeSlice);
  console.log("generated recipe",aiRecipe)

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="max-w-[1256px]  h-max rounded-2xl bg-neutral-600/[.6] text-white">
        <div className="flex md:flex-row flex-col md:gap-10 p-10">
          <RenderHeroSection />
          <div className="w-[.02rem] opacity-30 rounded-full bg-white"></div>
          <RenderRecipeGenerator />
        </div>
        {aiRecipe && <RecipeDisplay recipe={aiRecipe} />}
      </div>
    </div>
  );
}

const RenderHeroSection = () => (
  <section className="text-center  relative md:w-[15rem] lg:w-[25rem] z-[0] overflow-hidden md:pt-10 md:border-none border-b pb-8 md:rounded-lg">
    <img
      className="md:h-[70%] h-20 md:left-1/2 md:-translate-x-1/2 md:absolute w-max z-[-1] bottom-8  object-contain opacity-100 mx-auto "
      src={heroImage} 
      alt=""
    />
    
    <h1 className="md:text-4xl text-xl tracking-wide font-bold">Recipe Genie</h1>
    <p className="my-2 text-lg">Your AI-powered recipe generator</p>
  </section>
);

const RenderRecipeGenerator = () => (
  <div className="lg:w-[30rem]">
    <RecipeGenerator />
  </div>
);

export default Home;
