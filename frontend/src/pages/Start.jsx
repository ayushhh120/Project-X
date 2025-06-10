import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url("/Images/HomeBackground.avif")] h-screen pt-8 w-full flex justify-between flex-col'>
        <img className='w-16 ml-9' src='/Images/UberLogo.png'></img>
        <div className='bg-white py-4 pb-7 px-4'>
           <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
           <Link to={'/login'} className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start