import React from 'react'
import RecipeDisplay from './RecipeDisplay'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleRecipe = () => {

  const {id} = useParams();
  console.log(id)
  const {recipes} = useSelector(store=>store.RecipeSlice);
  const recipe = recipes.find(recipe => recipe._id === id);
  return (
    <div className="">
        <RecipeDisplay recipe={recipe}/>
    </div>
  )
}

export default SingleRecipe