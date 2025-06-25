
import React, {UseContext, useState, useEffect} from 'react'
import  {UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const UserProtectedWrapper = ({ children}) => {
  const token = localStorage.getItem('token')
  const { user, setUser } = React.useContext(UserDataContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

 useEffect(()=>{
   if(!token) {
    navigate('/login')
   }

   axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
       }).then((response) => {
          if (response.status === 200) {
              setUser(response.data)
              setIsLoading(false)
          }
      })
      .catch((error) => {
          console.error(error)
          localStorage.removeItem('token')
          navigate('/login')
      })
      
   }, [token] )

  if (isLoading) {
   return <div>Loading...</div>    
  }
 
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper