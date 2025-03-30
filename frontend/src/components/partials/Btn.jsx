import React from 'react'

const Btn = ({text}) => {
  return (
    <button className="bg-gradient-to-r uppercase from-blue-400 to-teal-400 text-neutral-700 font-bold cursor-pointer text-sm px-6 py-2 rounded-lg shadow-md hover:from-blue-300 hover:to-teal-300 transition duration-300 ease-in-out">
    {text}
  </button>
  )
}

export default Btn