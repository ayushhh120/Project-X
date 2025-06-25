import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h4
        className="absolute top-12 right-6 text-2xl"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h4>

      <h3 className="text-2xl font-semibold mb-5">Looking for a Captain...</h3>

      <div className="w-full mt-5">
        <div className="flex justify-between gap-3 items-center flex-col">
          <img className="h-25" src="/Images/UberCar.webp" alt="" />
        </div>
        <div className="flex items-center gap-2 p-2 ">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/21-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 ">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/21-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 ">
          <i className="text-lg ri-money-rupee-circle-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
