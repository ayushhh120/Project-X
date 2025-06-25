import React, { useState, useRef, useEffect ,} from 'react';
import { useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(''); // "pickup" or "destination"
  const [suggestions, setSuggestions] = useState([]);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext)

  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join", {userType: "user", userId: user._id})
  }, [user])

  socket.on('ride-confirmed', ride =>{
    console.log(ride)
    setWaitingForDriver(true)
    setVehicleFound(false)
    setRide(ride)

  })

  socket.on('ride-started', ride =>{
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride: ride } })
  })
  

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // Fetch suggestions for pickup
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField('pickup');
    setPanelOpen(true);
    if (value.length >= 3) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        setSuggestions(res.data);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Fetch suggestions for destination
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField('destination');
    setPanelOpen(true);
    if (value.length >= 3) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        setSuggestions(res.data);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (selected) => {
    if (activeField === 'pickup') {
      setPickup(selected);
    } else if (activeField === 'destination') {
      setDestination(selected);
    }
    setSuggestions([]);
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        paddingLeft: '26px',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [waitingForDriver]);

  async function findTrip(){
    setVehiclePanel(true)
    setPanelOpen(false);

// Fetch fare based on pickup and destination
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
     params:{
        pickup: pickup,
        destination: destination
     }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
     setFare(response.data);

  }

  // this functions creates a ride with the selected vehicle type
   async function createRide() {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
    pickup: pickup,
    destination: destination,  
    vehicleType: vehicleType
  }, {
    headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
  })

  }
    

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <div>
        <img className='w-16 absolute left-5 top-5 mb-10' src='/Images/UberLogo.png' alt="" />
      </div>
      <div className='h-screen w-screen'>
        <LiveTracking />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[35%] relative p-6 bg-white'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false);
            setSuggestions([]);
          }}
            className='absolute opacity-0 top-6 right-6 text-2xl'><i className="ri-arrow-down-wide-line "></i></h5>
          <h4 className='text-2xl mb-2 font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-14 w-1 top-[35%] left-10 bg-gray-900 rounded-3xl"></div>
            <input
              onFocus={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] mb-2 px-12 py-2 rounded-2xl'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onFocus={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 rounded-2xl'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
          <button onClick={findTrip}
          className="mt-4 w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-900 transition">
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          <LocationSearchPanel
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed z-10 px-3 py-8 pt-12 translate-y-full w-full bg-white bottom-0'>
        <VehiclePanel fare={fare} setVehicleType={setVehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed z-10 px-3 py-6 pt-12 translate-y-full w-full bg-white bottom-0'>
        <ConfirmRide 
        fare={fare}
        vehicleType={vehicleType}
        createRide={createRide} 
        pickup={pickup}
        destination={destination}
        setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed z-10 px-3 py-6 pt-12 translate-y-full w-full bg-white bottom-0'>
        <LookingForDriver
        fare={fare}
        vehicleType={vehicleType}
        pickup={pickup}
        destination={destination}
        createRide={createRide} 
        setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 px-3 py-6 pt-12 translate-y-full w-full bg-white bottom-0'>
        <WaitingForDriver 
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver}
        waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
}

export default Home;