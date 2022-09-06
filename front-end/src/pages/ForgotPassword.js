import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from '../auth/axiosInstance'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const onSubmitClicked = async () => {
    try {
      await axios.put(`/authentication/forgot-password/${email}`)
      setSuccess(true)
    } catch (error) {
      setError('Email address not found')
      setSuccess(false)
    }
  }

  return success ? (
    // <div className='flex h-screen items-center justify-center bg-slate-100'>
    //   <div className='items-center bg-white rounded-3xl shadow-2xl'>
    //     <h1>Success</h1>
    //     <p>A mail has been sent to your email address.</p>
    //     <b>Check your mail for a reset link</b>
    //   </div>
    // </div>
    <div className='flex h-screen items-center justify-center bg-slate-100'>
      <div className='flex flex-col items-center bg-white rounded-3xl shadow-2xl p-5'>
        <h1>Successful</h1>
        <p>
          A verification email has been sent to your email address.
        </p>
        <b>Check your mail for a reset link.</b>
      </div>
    </div>
  ) : (
    <div className='flex h-screen items-center justify-center bg-slate-100'>
      <div className='grid grid-cols-2 items-center bg-white rounded-3xl shadow-2xl'>
        <div>
          <img src="https://pbs.twimg.com/profile_images/674264309963227136/uqWXnVVG_400x400.png" className='h-full rounded-3xl w-full object-cover' />
        </div>
        <div className='grid gap-9 justify-evenly'>
          <div>
          <h1>Forgot Password</h1>
          <p>Enter your email and we'll send you a reset link</p>
          </div>
          <div>
            {error && <div className='ml-6 text-red-500 font-bold text-sm'>{error}</div>}
            <div className='flex flex-col gap-4'>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your email address" className='rounded-full py-3 px-6'/>
              <button disabled={!email} onClick={onSubmitClicked} className='disabled:bg-blue-300 text-white border-none font-bold rounded-full py-3 px-10 transition ease-in-out delay-150 bg-blue-500 hover:bg-indigo-500 duration-300'>Send Reset Link</button>
              <button onClick={() => navigate('/login')} className='border-none bg-white hover:underline hover:text-blue-500'>
                  Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
