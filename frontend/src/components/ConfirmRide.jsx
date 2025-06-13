import React from "react";


const ConfirmRide = (props) => {
  return (
    <div>
      <h4
        className="absolute top-12 right-6 text-2xl"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h4>

      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="w-full mt-5">
          <div className="flex justify-between gap-3 items-center flex-col">
        <img className="h-25" src="/Images/UberCar.webp" alt="" />
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
      <button 
        onClick={() => {
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false)
        }} 
        className="w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg"
      >
        Confirm
      </button>
      </div>
      
    </div>
  );
};

export default ConfirmRide;
