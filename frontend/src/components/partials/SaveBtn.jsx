import React from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveRecipeAction, unsaveRecipeAction } from '../../store/actions/recipeActions';

const SaveBtn = ({recipe,status=true, position="absolute"}) => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleClick = () => {
    try {
        if (recipe._id) {
            dispatch(unsaveRecipeAction(recipe,navigate))
        } else {
            dispatch(saveRecipeAction(recipe,navigate))
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
        <div className={`${position} ${position === 'absolute' ? 'top-10 right-10' : ''} group text-sm`}>
          <button onClick={handleClick} className={`p-2 ${status ? 'bg-gradient-to-r uppercase from-red-400 to-red-500 hover:from-red-300 hover:to-red-400 ' : 'bg-gradient-to-r uppercase from-green-400 to-lime-400 hover:from-green-300 hover:to-lime-300'} transition duration-300 ease-in-out backdrop-blur-2xl cursor-pointer text-white font-bold text-xs py-3.5 px-3.5 rounded-full`}>
            {!status ? <FaRegBookmark /> : <FaBookmark />}
          </button>
          <span className={`absolute left-1/2 -translate-x-[0%] top-full -translate-y-[60%] pointer-events-none z-[99] bg-neutral-700/[.7] group-hover:opacity-100 opacity-0 px-2 text-xs rounded pb-1 transition-opacity duration-300`}>
            {status ? 'Unsave' : 'Save'}
          </span>
        </div>
      
  )
}

export default SaveBtn