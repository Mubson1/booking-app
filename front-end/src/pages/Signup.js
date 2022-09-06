import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from '../auth/useToken'
import axios from '../auth/axiosInstance'
import PleaseVerify from './PleaseVerify'

const Signup = () => {
  const navigate = useNavigate()

  const [token, setToken] = useToken();

  const [emailValue, setEmailValue] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('')
  const [img, setImg] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const onSignUpClicked = async () => {
    try {
      const response = await axios.post('/authentication/signup', {
        username:username,
        email:emailValue,
        password: password,
        country: country,
        city: city,
        phone:phone
      })
      console.log(response)
      const {token} = response.data;
      setToken(token);
      navigate('/please-verify')
    } catch (error) {
      setErrMessage("An account with your email or username already exists")
    }
  }
  
  return (
      <div className='flex h-screen items-center justify-center bg-slate-100'>
        <div className='grid grid-cols-2 items-center bg-white rounded-3xl shadow-2xl'>
          <div className='righside'>
            <img src="https://pbs.twimg.com/profile_images/674264309963227136/uqWXnVVG_400x400.png" alt='HYP logo' className='h-full w-full rounded-3xl object-cover' />
          </div>
          <div className='grid gap-2 justify-start'>
            <div className='grid gap-10 grid-cols-2 items-center'>
              <h1>Sign Up</h1>
              <button onClick={() => navigate('/login')} className='border-none bg-white hover:underline hover:text-blue-500'>already have an account</button>
            </div>
            {errMessage && <div className='text-red-500 font-bold text-sm'>{errMessage}</div>}
            <input type='email' placeholder='Email' onChange={e => {setEmailValue(e.target.value);setErrMessage('')}} className='rounded-full py-3 px-6' />
            <input placeholder='Username' onChange={e => {setUsername(e.target.value); setErrMessage()}} className='rounded-full py-3 px-6' />
            <input placeholder='Phone No.' onChange={e => {setPhone(e.target.value); setErrMessage()}} className='rounded-full py-3 px-6' />
            <input placeholder='Country' onChange={e => {setCountry(e.target.value); setErrMessage()}} className='rounded-full py-3 px-6' />
            <input placeholder='City' onChange={e => {setCity(e.target.value); setErrMessage()}} className='rounded-full py-3 px-6' />
            <input type='password' onChange={e => setPassword(e.target.value)} placeholder='Password' className='rounded-full py-3 px-6'/>
            <input type='password' onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='rounded-full py-3 px-6'/>
            <button 
              disabled={!username || !emailValue || !password || password !== confirmPassword}
              onClick={onSignUpClicked}
              className={'disabled:bg-blue-300 border-none font-bold text-white rounded-full py-3 px-10 transition ease-in-out delay-150 bg-blue-500 hover:bg-indigo-500 duration-300'}>
                SIGNUP
            </button>
          </div>
        </div>
      </div>
  )
}

export default Signup
