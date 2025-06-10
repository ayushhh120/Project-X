import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { CaptainDataContext } from "../context/CaptainContext"

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


const navigate = useNavigate()
const { captain, setCaptain } = useContext(CaptainDataContext)


  const submitHandler = async (e) =>{
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    }
 
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      )
      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')   
      }

    setEmail('')
    setPassword('')
         
  }

  return (
   <div className='p-4 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 mb-7 h-16' src='/Images/UberDriverLogo.png'></img>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>

        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
        required 
      
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)  
        }}

        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 w-full text-lg placeholder:text-sm'
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        required
              value={password}
        onChange={(e)=>{
          setPassword(e.target.value)  
          
        }}

        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 w-full text-lg placeholder:text-sm'
        type='password' 
        placeholder='password'/>
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-2 py-2 w-full text-lg placeholder:text-sm'>Login</button>

      </form>
              <p className='text-center'>Join a fleet<Link to={'/captain-signup'} className='text-blue-500'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to={'/login'} className='bg-[#dcac29] flex items-center justify-center mb-5 text-white font-semibol rounded px-2 py-2 w-full text-lg placeholder:text-sm'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin