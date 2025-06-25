import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
}


const LIBRARIES = ["marker"]

const LiveTracking = () => {
  const [position, setPosition] = useState(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null) // Add marker ref

  useEffect(() => {
    let intervalId
    if (navigator.geolocation) {
      const getPosition = () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            })
          },
          (err) => {
            console.error('Geolocation error:', err)
          },
          { enableHighAccuracy: true }
        )
      }
      getPosition()
      intervalId = setInterval(getPosition, 10000)
    } else {
      alert('Geolocation is not supported by this browser.')
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && position && window.google?.maps?.Marker) {
      if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
          map: mapRef.current,
          position,
          title: "Your Location"
        })
      } else {
        markerRef.current.setPosition(position)
      }
    }
  }, [position])

  return (
    <div style={{height: '100%', width: '100%'}}> {/* Ensure parent has 100% height */}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={LIBRARIES} 
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position || defaultCenter}
          zoom={15}
          onLoad={(map) => (mapRef.current = map)}
          // mapId removed
        />
      </LoadScript>
    </div>
  )
}

export default LiveTracking
