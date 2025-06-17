import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { useState, useContext } from "react"
import { CaptainDataContext } from "../context/CaptainContext"
import axios from "axios"


const CaptainSignup = () => {
  
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
   
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')

  const {captain, setCaptain} = React.useContext(CaptainDataContext)
  
    const submitHandler = async (e)=>{
      e.preventDefault();
      const captainData = {
        fullname:{
          firstname: firstName,
          lastname: lastName,
        },
          email: email,
          password: password,
          vehicle : {
            vehicleType: vehicleType,
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity
          }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if (response.status === 201) {

        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')   
      }
      
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVehicleColor('')
      setVehicleType('')
      setVehiclePlate('')
      setVehicleCapacity('')
      
    }
  
  return (
    <div className='p-4 h-screen flex flex-col justify-between'>
      <div>
         <img className='w-15 mb-7 h-16' src='/Images/UberDriverLogo.png'></img>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-4 mb-4'>
        <input 
        required 
          value={firstName}
          onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        className='bg-[#eeeeee] w-1/2 mb-4 rounded px-2 py-2 text-base placeholder:text-sm'
        type='text' 
        placeholder='First name'/>

        <input 
        required 
          value={lastName}
          onChange={(e)=>{
          setLastName(e.target.value)
        }}
        className='bg-[#eeeeee] w-1/2 mb-4 rounded px-2 py-2 text-base placeholder:text-sm'
        type='text' 
        placeholder='Last name'/>
        </div>


        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)  
        }}
        required 
        className='bg-[#eeeeee] mb-5 rounded px-2 py-2 w-full text-base placeholder:text-sm'
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2'>Create New Password</h3>
        <input 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)  
          
        }}
        required
        className='bg-[#eeeeee] mb-8 rounded px-2 py-2 w-full text-base placeholder:text-sm'
        type='password' 
        placeholder='password'/>

        <div className='mb-4'>
          <label className='block mb-1 text-sm font-medium'>Vehicle Type</label>
          <select
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className='bg-[#eeeeee] rounded px-2 py-2 w-full text-base'
          >
            <option value='' disabled>Select vehicle type</option>
            <option value='motorcycle'>Motorcycle</option>
            <option value='car'>Car</option>
            <option value='auto'>Auto</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm font-medium'>Vehicle Color</label>
          <input
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className='bg-[#eeeeee] rounded px-2 py-2 w-full text-base placeholder:text-sm'
            type='text'
            placeholder='e.g. Red'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm font-medium'>Vehicle Plate Number</label>
          <input
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className='bg-[#eeeeee] rounded px-2 py-2 w-full text-base placeholder:text-sm'
            type='text'
            placeholder='e.g. AB12CD3456'
          />
        </div>
        <div className='mb-8'>
          <label className='block mb-1 text-sm font-medium'>Vehicle Capacity</label>
          <input
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className='bg-[#eeeeee] mb-1 rounded px-2 py-2 w-full text-base placeholder:text-sm'
            type='number'
            min='1'
            placeholder='e.g. 4'
          />
        </div>
                <button className='bg-[#111] text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-sm'>Register your account</button>


      </form>
       <p className='text-center'>Already have an account?<Link to={'/captain-login'} className='text-blue-500'>Login</Link></p>
      </div>
    </div>
  )
}

export default CaptainSignup