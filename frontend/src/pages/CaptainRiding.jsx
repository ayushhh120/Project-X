import React from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useState, useRef } from 'react'
import FinishRide from '../components/FinishRide'

const  CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(()=>{
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current,{
          transform:'translateY(0)'
         })
        }else{
          gsap.to(finishRidePanelRef.current,{
          transform:'translateY(100%)'
         })
        }
      },[finishRidePanel])

  return (
    
  <div className="h-screen" relative w-screen>
    

      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img className="w-16" src="/Images/UberLogo.png" alt="" />
        <Link
          to="/captain-home"
          className="w-10 h-10 bg-white ml-2 flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-semibold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5 ">
        <img
          className="h-full w-full object-cover"
          src="/Images/UberMap.gif"
          alt="UberMap"
        />
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-300"
      onClick={()=>{
        setFinishRidePanel(true)
      }}
      >
      <h5 className="absolute text-center top-1 w-[95%] right-6 text-3xl"
        onClick={() => {
         
       }}>
        <i className="ri-arrow-up-wide-line"></i>
      </h5>

      <h4 className="text-xl font-medium">4Km away</h4>

      <button className="mt-5 bg-green-600 text-white font-semibold p-2 px-4 rounded-lg">Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef}  className='fixed z-10 px-3 py-8 pt-12 w-full translate-y-full bg-white bottom-0'>
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    
    </div>
  )
}

export default CaptainRiding