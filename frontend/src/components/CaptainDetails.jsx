import React, {useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'


const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext)

  return (
    <div>
         <div className="flex item-center justify-between">
          <div className="flex item-center justify-start gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname+" "+captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Rs295.20</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>

        <div className="flex mt-8 p-3 bg-gray-100 rounded-xl justify-center gap-4 items-start">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-time-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hour Online</p>
          </div>

          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hour Online</p>
          </div>

          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hour Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails