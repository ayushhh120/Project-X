import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'



const ConfirmRidePopup = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e)=>{
   e.preventDefault()  
   const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
   params:{ rideId: props.ride._id,
    otp: otp },
     headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
   })

   if(response.status === 200){
    props.setConfirmRidePopupPanel(false)
    props.setRidePopupPanel(false)
    navigate('/captain-riding', { state: { ride: props.ride } })
   }

  }
  return (
    <div>
      <h4
        className="absolute top-12 right-6 text-2xl"
        onClick={() => {
         props.setRidePopupPanel(false)
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h4>

      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4'>
        <div className=' flex items-center gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 Km</h5>
      </div>
      

      <div className="w-full mt-5">
          <div className="flex justify-between gap-3 items-center flex-col">
       
      </div>
        <div className="flex items-center gap-2 p-2 ">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/21-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
             {props.ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 "> 
           <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/21-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.destination}
            </p>
          </div>
          </div>
        <div className="flex items-center gap-2 p-2 "> 
          <i className="text-lg ri-money-rupee-circle-fill"></i>
          <div>
            <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Cash, Cash
            </p>
          </div>
          </div>
      <div className='mt-6'>
     <form onSubmit={submitHandler}>
        
        <input 
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        type="text" className='bg-[#eee] px-6 py-3 w-full rounded-2xl' placeholder='Enter OTP' />

        <button className="w-full mt-5 flex justify-center bg-green-500 text-white font-semibold p-2 rounded-lg">
        Confirm
      </button>
      <button 
        onClick={() => {
         props.setConfirmRidePopupPanel(false)
         props.setRidePopupPanel(true)
        }} 
        className="w-full mt-3 bg-gray-200 text-gray-600 font-semibold p-2 rounded-lg">
        Cancle
      </button>
     </form>
      </div>

      </div>   
    </div>
  )
}

export default ConfirmRidePopup