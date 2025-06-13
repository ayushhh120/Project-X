import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div> <h4 className='absolute top-8 right-6 text-2xl' onClick={()=>{
          props.setVehiclePanel(false)
        }} ><i className="ri-arrow-down-wide-line"></i></h4>
        
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }} className='flex p-3 mb-2 w-full border-gray-300 active:border-black  rounded-xl item-center justify-between'>
            <img className='h-12' src="/Images/UberCar.webp" alt="" />
            <div className='w-1/2 ml-2'>
              <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill">4</i></span></h4>
            <h5 className='font-light text-sm'>2 mins away</h5>
            <p className='font-light text-xs text-gray-600'>Affordable, compact rides</p>
            </div>
            <h1 className='text-1xl font-semibold'>193.20</h1>
          </div>

          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }}  className='flex p-3 mb-2 w-full border-gray-300 active:border-black rounded-xl item-center justify-between'>
            <img className='h-12' src="/Images/UberBike.webp" alt="" />
            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill">1</i></span></h4>
            <h5 className='font-light text-sm'>2 mins away</h5>
            <p className='font-light text-xs text-gray-600'>Affordable, Motorcycle rides</p>
            </div>
            <h1 className='text-1xl font-semibold'>75.80</h1>
          </div>  

          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }}  className='flex p-3 mb-2 w-full border-gray-300 active:border-black rounded-xl item-center justify-between'>
            <img className='h-12' src="/Images/UberAuto.webp" alt="" />
            <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill">3</i></span></h4>
            <h5 className='font-light text-sm'>5 mins away</h5>
            <p className='font-light text-xs text-gray-600'>Affordable, Auto rides</p>
            </div>
            <h1 className='text-1xl font-semibold'>120.25</h1>
          </div></div>
  )
}

export default VehiclePanel