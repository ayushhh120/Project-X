import React from 'react'


const LocationSearchPanel = ({ setVehiclePanel, setPanelOpen }) => {
  // sample array for location

  const locations = [
    "3/250, Jankipuram extension, 60 feet road, Lucknow",
    "24f, Near Engineering college road, Sharma Chauraha, Lucknow",
    "4/255, Near petrol pump, Vikas Khand, Gomtinagar, Lucknow",
    "2/250, Near watertank park, VIbhuti Khand, Gomtinagar, Lucknow"
  ]
  return (

    <div className='mr-5'>
         {/* this is a sample data */}

         {
          locations.map(function(elem, idx){
            return <div key={idx} onClick={()=>{
              setVehiclePanel(true)
              setPanelOpen(false)
            }}
            className='flex border-2 border-gray-200 active:border-black p-2 rounded-xl items-center my-2 justify-start gap-4'>
          <h2 className='bg-[#eee] h-6 w-9 flex items-center justify-center rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
          <h4>{elem}</h4>
        </div>
          })
         }
    </div>
  )
}

export default LocationSearchPanel