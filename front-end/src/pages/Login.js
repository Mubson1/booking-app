import React, {useState} from 'react'
import axios from '../auth/axiosInstance'

import { useNavigate } from 'react-router-dom'
import useToken from '../auth/useToken'

const Login = () => {
  const navigate = useNavigate()

  const [,setToken] = useToken()
  const [userName, setUserName] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const onLogInClicked = async () => {
    try {
      const response = await axios.post('/authentication/login', {
        username: userName,
        password: passwordValue
      })
      const {token} = response.data
      setToken(token)
      // console.log(response)
      navigate('/')
    } catch (error) {
      // setErrMessage('Invalid username or password')
      console.log(error);
    }
  }

  return (
      <div className='flex h-screen items-center justify-center bg-slate-100'>
        <div className='grid grid-cols-2 items-center bg-white rounded-3xl shadow-2xl'>
          <div className='righside'>
            <img src="https://pbs.twimg.com/profile_images/674264309963227136/uqWXnVVG_400x400.png" className='h-full rounded-3xl w-full object-cover'/>
          </div>
          <div className='grid gap-4 justify-evenly'>
            <div className='grid gap-10 grid-cols-2 items-center'>
              <h1>Sign In</h1>
              <button onClick={() => navigate('/signup')} className='border-none bg-white hover:underline hover:text-blue-500'>or create an account</button>
            </div>
            {errMessage && <div className='text-red-500 font-bold text-sm'>{errMessage}</div>}
            <input value={userName} onChange={e => setUserName(e.target.value)} placeholder='Username' className='rounded-full py-3 px-6'/>
            <input value={passwordValue} onChange={e => setPasswordValue(e.target.value)} type='password' placeholder='Password' className='rounded-full py-3 px-6'/>
            <button
              disabled={!userName || !passwordValue}
              onClick = {onLogInClicked}
              className='disabled:bg-blue-300 text-white border-none font-bold rounded-full py-3 px-10 transition ease-in-out delay-150 bg-blue-500 hover:bg-indigo-500 duration-300'>
                LOGIN
              </button>
            <button onClick={() => navigate('/')} className='border-none bg-white hover:underline hover:text-blue-500'>
              Log In as Guest
            </button>
            <button onClick={() => navigate('/forgot-password')} className='border-none bg-white hover:underline hover:text-blue-500'>
                Forgot Your Password
            </button>
          </div>
        </div>
      </div>
  )
}

export default Login
