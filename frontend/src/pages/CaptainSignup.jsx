import { Link } from "react-router-dom"
import { useState } from "react"

const CaptainSignup = () => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
  
    const submitHandler = (e)=>{
      e.preventDefault();
      setUserData({
        fullname:{
          firstName: firstName,
          lastName: lastName,
        },
          email: email,
          password: password
      })
      
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  
  return (
    <div className='p-4 h-screen flex flex-col justify-between'>
      <div>
         <img className='w-15 mb-7 h-16' src='/Images/UberDriverLogo.png'></img>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-4 mb-4'>
        <input 
        required 
          value={firstName}
          onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        className='bg-[#eeeeee] w-1/2 mb-4 rounded px-2 py-2 text-base placeholder:text-sm'
        type='text' 
        placeholder='First name'/>

        <input 
        required 
          value={lastName}
          onChange={(e)=>{
          setLastName(e.target.value)
        }}
        className='bg-[#eeeeee] w-1/2 mb-4 rounded px-2 py-2 text-base placeholder:text-sm'
        type='text' 
        placeholder='Last name'/>
        </div>


        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input 
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)  
        }}
        required 
        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 w-full text-base placeholder:text-sm'
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2'>Create New Password</h3>
        <input 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)  
          
        }}

        required
        className='bg-[#eeeeee] mb-8 rounded px-2 py-2 w-full text-base placeholder:text-sm'
        type='password' 
        placeholder='password'/>
        <button className='bg-[#111] text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-sm'>Register your account</button>

      </form>
       <p className='text-center'>Already have an account?<Link to={'/captain-login'} className='text-blue-500'>Login</Link></p>
      </div>
      <div>
           <p className="font-light text-[12px]">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup