import React from 'react'
import { FaUser } from 'react-icons/fa'
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <div className='' >
      <div className='flex justify-between items-center shadow-md bg-slate-200 backdrop-blur-md rounded-3xl  '>
        <a href="/"><img src='logo1.png' alt="Lapify.logo" className='h-18 w-50 object-cover ml-15 mt-2' /></a>

        <div className='flex justify-center gap-10 font-medium text-lg '>
          <NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-sky-500 underline text-xl" : "hover:text-sky-500 hover:underline transition duration-300"}> Home</NavLink>

          <NavLink to="/Predict" className={({ isActive }) =>isActive
              ? "font-bold text-sky-500 underline text-xl"
              : "hover:text-sky-500 hover:underline transition duration-300"
          }> Predict</NavLink>

          <NavLink to="/Recommend" className={({ isActive }) =>isActive
              ? "font-bold text-sky-500 underline text-xl"
              : "hover:text-sky-500 hover:underline transition duration-300"
          }>Recommend</NavLink>

          <NavLink to="/Compare" className={({ isActive }) =>isActive
              ? "font-bold text-sky-500 underline text-xl"
              : "hover:text-sky-500 hover:underline transition duration-300"
          }> Compare</NavLink>

        </div>

        <a href="/Profile" className=' text-xl font-medium mr-20 border-2 border-sky-300 rounded-full px-3 py-1 bg-sky-200 hover:bg-sky-300 transition duration-300  flex items-center gap-2' > <FaUser className='text-sky-600' /> Profile</a>
      </div>
    </div>
  )
}

export default Navbar
