import React from 'react'
import RecipeDisplay from './RecipeDisplay'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleRecipe = () => {

  const {id} = useParams();
  const {recipes} = useSelector(store=>store.RecipeSlice);
  const recipe = recipes.find(recipe => recipe._id === id);
  
  return (
    <div className="max-w-[1256px] text-white lg:w-[70vw] mx-auto ">
        <RecipeDisplay recipe={recipe}/>
    </div>
  )
}

export default SingleRecipe