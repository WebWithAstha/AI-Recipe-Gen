import React from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveRecipeAction, unsaveRecipeAction } from '../../store/actions/recipeActions';

const SaveBtn = ({recipe,img,status, position="absolute"}) => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleClick = () => {
    try {
        if (recipe._id) {
            dispatch(unsaveRecipeAction(recipe,navigate))
        } else {
            dispatch(saveRecipeAction({...recipe,imageUrl: img},img,navigate))
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
        <div className={`${position} ${position === 'absolute' ? 'md:top-0 top-12 md:-translate-x-[115%] right-0' : ''} z-99 group text-sm`}>
          <button onClick={handleClick} className={`p-2 ${recipe._id ? 'bg-gradient-to-r uppercase from-red-400 to-red-500 hover:from-red-300 hover:to-red-400 ' : 'bg-gradient-to-r uppercase from-green-400 to-lime-400 hover:from-green-300 hover:to-lime-300'} transition duration-300 ease-in-out backdrop-blur-2xl cursor-pointer text-white font-bold text-xs py-3.5 px-3.5 rounded-full`}>
            {!recipe?._id ? <FaRegBookmark /> : <FaBookmark />}
          </button>
          <span className={`absolute -translate-x-[0%] top-full ${position === 'absolute' ?  'left-1/2' : '-translate-x-[50%]'}  -translate-y-[60%] pointer-events-none z-[99] bg-neutral-700/[.7] group-hover:opacity-100 opacity-0 px-2 text-xs rounded pb-1 transition-opacity duration-300`}>
            {recipe?._id ? 'Unsave' : 'Save'}
          </span>
        </div>
      
  )
}

export default SaveBtn