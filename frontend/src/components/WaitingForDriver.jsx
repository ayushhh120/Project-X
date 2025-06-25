import React from 'react'

const WaitingForDriver = (props) => {

   const ride = props.ride;

  // If ride or captain is not available, show a loading or fallback UI
  if (!ride || !ride.captain) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Waiting for driver details...</p>
      </div>
    );
  }
  
  return (
    <div>
      <h4
        className="absolute top-5 text-2xl"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}                                                                                                                                                                                          
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h4>

       <div className='flex items-center justify-between'>
         <img className="h-12" src="/Images/UberCar.webp" alt="" />
         <div className='text-right'>
         <h2 className='text-lg font-medium capitalize'>{props.ride.captain.fullname.firstname}</h2>
         <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride.captain?.vehicle.plate}</h4>
         <p className='text-sm text-gray-600'>Bugatti Sherron</p>
         <h2 className='text-sm font-medium'>{props.ride?.otp}</h2>
         </div>
       </div>

      <div className="w-full mt-5">
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
            <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver