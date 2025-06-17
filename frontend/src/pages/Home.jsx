import React from 'react'
import { useState, useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)

  const submitHandler = (e) =>{
    e.preventDefault() 
  }

  useGSAP(() =>{
    if(panelOpen){
      gsap.to(panelRef.current,{
      height: '70%',
      paddingLeft: '26px',
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
    }else{
      gsap.to(panelRef.current,{
      height: '0%',
    }) 
    gsap.to(panelCloseRef.current,{
    opacity:0
    })
    }

  }, [panelOpen])

  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
     })
    }else{
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
     })
    }
  },[vehiclePanel])

    useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
     })
    }else{
      gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
     })
    }
  },[confirmRidePanel])

    useGSAP(()=>{
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
     })
    }else{
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)'
     })
    }
  },[vehicleFound])

  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
      transform:'translateY(0)'
     })
    }else{
      gsap.to(waitingForDriverRef.current,{
      transform:'translateY(100%)'
     })
    }
  },[waitingForDriver])


  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      
      <div><img className='w-16 absolute left-5 top-5 mb-10' src='/Images/UberLogo.png'></img></div>
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="/Images/UberMap.gif" alt="UberMap" />
      </div>
       
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
      <div className='h-[30%] relative p-6 bg-white'>
        <h5 ref={panelCloseRef} onClick={()=>{
          setPanelOpen(false)
        }} 
        className='absolute opacity-0 top-6 right-6 text-2xl'><i className="ri-arrow-down-wide-line "></i></h5>
           <h4 className='text-2xl mb-2 font-semibold'>Find a trip</h4>
          <form onSubmit={(e) =>{
              submitHandler(e)
          }}>
            <div className="line absolute h-14 w-1 top-[38%] left-10 bg-gray-900 rounded-3xl"></div>
            <input 
            onClick={() =>{
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e) =>{
              setPickup(e.target.value)
            }}
            className='bg-[#eee] mb-2 px-12 py-2 rounded-2xl' type="text" placeholder='Add a pick-up location' />
            <input
            onClick={() =>{
              setPanelOpen(true)
            }}             
            value={destination}
            onChange={(e) =>{
              setDestination(e.target.value)
            }}            
            className='bg-[#eee] px-12 py-2 rounded-2xl' type="text" placeholder='Enter your destination' />
          </form>
      </div>
       
        <div ref={panelRef} className=' bg-white h-0'>
        <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
       </div>
      </div>

        <div ref={vehiclePanelRef} className='fixed z-10 px-3 py-8 pt-12 translate-y-full w-full bg-white bottom-0'>
       <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 px-3 py-6 pt-12 translate-y-full w-full bg-white bottom-0'>
      <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

       <div ref={vehicleFoundRef} className='fixed z-10 px-3 py-6 pt-12 translate-y-full w-full bg-white bottom-0'>
         <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 px-3 py-6 pt-12 translate-y-full w-full bg-white bottom-0'>
         <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
      
    </div>
  )
}

export default Home