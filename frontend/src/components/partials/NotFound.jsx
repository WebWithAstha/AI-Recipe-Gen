import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found-page flex flex-col items-center justify-center  max-h-screen">
      <img className='h-40' src="https://i.gifer.com/6kp.gif" alt="" />
      <h1 className="oops text-xl text-white font-bold mb-2 backdrop-blur-xs">PAGE NOT FOUND</h1>
      <Link to="/dashboard" className="return-home text-sky-500 hover:text-sky-700">Go Home</Link>
    </div>
  )
}

export default NotFound