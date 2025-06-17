import React from 'react'

const RidePopup = (props) => {
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

      <h3 className="text-2xl font-semibold mb-5">New Ride Available;</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4'>
        <div className=' flex items-center gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h2 className='text-lg font-medium'>Harshita Tiwari</h2>
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
              Baksi Talab Road, Lucknow
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 "> 
           <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/21-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Baksi Talab Road, Lucknow
            </p>
          </div>
          </div>
        <div className="flex items-center gap-2 p-2 "> 
          <i className="text-lg ri-money-rupee-circle-fill"></i>
          <div>
            <h3 className="text-lg font-medium">193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Cash, Cash
            </p>
          </div>
          </div>

    <div className='flex items-center justify-between'>
          <button 
        onClick={() => {
       props.setConfirmRidePopupPanel(true)
        }} 
        className="mt-5 bg-green-600 text-white font-semibold p-2 px-4 rounded-lg">
        Accept
      </button>
      
      <button 
        onClick={() => {
         props.setRidePopupPanel(false)
        }} 
        className="mt-3 bg-gray-300 text-gray-650 font-semibold p-2 px-4 rounded-lg">
        Ignore
      </button>
          </div>

      </div>
      
    </div>
  )
}

export default RidePopup