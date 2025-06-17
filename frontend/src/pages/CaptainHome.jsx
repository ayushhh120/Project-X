import React from "react";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const ridePopupPanelRef = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelRef = useRef(null)
  
   useGSAP(()=>{
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
      transform:'translateY(0)'
     })
    }else{
      gsap.to(ridePopupPanelRef.current,{
      transform:'translateY(100%)'
     })
    }
  },[ridePopupPanel])

    useGSAP(()=>{
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current,{
      transform:'translateY(0)'
     })
    }else{
      gsap.to(confirmRidePopupPanelRef.current,{
      transform:'translateY(100%)'
     })
    }
  },[confirmRidePopupPanel])

 return (
    <div className="h-screen" w-screen>
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img className="w-16" src="/Images/UberLogo.png" alt="" />
        <Link
          to="/captain-home"
          className="w-10 h-10 bg-white ml-2 flex items-center justify-center rounded-full">
          <i className="text-lg font-semibold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5 ">
        <img
          className="h-full w-full object-cover"
          src="/Images/UberMap.gif"
          alt="UberMap"
        />
      </div>
      <div className="h-2/5 p-6">
       < CaptainDetails />
      </div>
       <div ref={ridePopupPanelRef}  className='fixed z-10 px-3 py-8 pt-12 w-full translate-y-full bg-white bottom-0'>
        <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupPanelRef}  className='fixed h-screen z-10 px-3 py-8 pt-12 w-full translate-y-full bg-white bottom-0'>
        <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
