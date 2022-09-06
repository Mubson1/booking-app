import axios from '../../auth/axiosInstance'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PasswordResetFail from './PasswordResetFail'
import PasswordResetSuccess from './PasswordResetSuccess'

const PasswordResetLanding = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)

  const {passwordResetCode} = useParams()

  const onSubmitClicked = async () => {
    try {
      await axios.put(`/authentication/${passwordResetCode}/reset-password`, {newPassword: password})
      setIsSuccess(true)
    } catch (error) {
      setIsFailure(true)
    }
  }

  if (isSuccess) return <PasswordResetSuccess />
  if (isFailure) return <PasswordResetFail />

  return (
    <div className='flex h-screen items-center justify-center bg-slate-100'>
      <div className='grid grid-cols-2 items-center bg-white rounded-3xl shadow-2xl'>
        <div>
          <img src="https://pbs.twimg.com/profile_images/674264309963227136/uqWXnVVG_400x400.png" className='h-full rounded-3xl w-full object-cover' />
        </div>
        <div className='grid gap-9 justify-evenly'>
          <div>
          <h1>Reset Password</h1>
          <p>Please enter a new passowrd</p>
          </div>
          <div>
            <div className='flex flex-col gap-4'>
              <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className='rounded-full py-3 px-6'/>
              <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className='rounded-full py-3 px-6'/>
              <button disabled={!password || !confirmPassword || password !== confirmPassword} onClick={onSubmitClicked} className='disabled:bg-blue-300 text-white border-none font-bold rounded-full py-3 px-10 transition ease-in-out delay-150 bg-blue-500 hover:bg-indigo-500 duration-300'>Send Reset Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordResetLanding
