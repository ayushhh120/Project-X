import React from "react";
import {useGSAP} from '@gsap/react'
import axios from 'axios'; 
import gsap from 'gsap'
import { useState, useRef, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import LiveTracking from '../components/LiveTracking';


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelRef = useRef(null)

  const [ride , setRide] = useState(null)

  const {socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)
  
  
    useEffect(() => {
      socket.emit("join", {userType: "captain", userId: captain._id})

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("update-location-captain", {
              userId: captain._id,
            location:{lat: position.coords.latitude,
              lng: position.coords.longitude,}
            });
          });
        }
      }

   const localInterval = setInterval(updateLocation, 1000)
    updateLocation()
    return () => clearInterval(localInterval);
    })
   
    socket.on('new-ride', (data)=>{
      // console.log(data)
      setRide(data)
      setRidePopupPanel(true)
    })

    async function confirmRide(){
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
       rideId: ride._id,
       captainId: captain._id,
        
       },{
          headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
       }
       })
        
    }

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
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
       < CaptainDetails />
      </div>
       <div ref={ridePopupPanelRef}  className='fixed z-10 px-3 py-8 pt-12 w-full translate-y-full bg-white bottom-0'>
        <RidePopup
        ride={ride}
         setRidePopupPanel={setRidePopupPanel} 
         confirmRide= {confirmRide}
         setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupPanelRef}  className='fixed h-screen z-10 px-3 py-8 pt-12 w-full translate-y-full bg-white bottom-0'>
        <ConfirmRidePopup
        ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
