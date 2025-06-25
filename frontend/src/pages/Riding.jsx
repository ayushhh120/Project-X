import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation()
  const {ride} = location.state || {};
  const navigate = useNavigate()
  const {socket} = useContext(SocketContext)

  socket.on("ride-ended", () => {
   navigate('/Home')
  })

  return (
    <div className='h-screen w-screen'> 
    <Link to= '/Home' className='fixed right-2 top-2 w-10 h-10 bg-white ml-2 flex items-center justify-center rounded-full'><i className="text-lg font-semibold ri-home-2-fill"></i></Link>
      <div className='h-1/2 '>
      <LiveTracking />
      </div>
      <div className='h-1/2 p-4'>
          <div className='flex items-center justify-between'>
         <img className="h-12" src="/Images/UberCar.webp" alt="" />
         <div className='text-right'>
         <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
         <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
         <p className='text-sm text-gray-600'>Bugatti Sherron</p>
         </div>
       </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-2 p-2 ">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/21-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
             {ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 ">
          <i className="text-lg ri-money-rupee-circle-fill"></i>
          <div>
            <h3 className="text-lg font-medium">{ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
          </div>
        </div>
      </div>
         <button className='w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  )
}

export default Riding