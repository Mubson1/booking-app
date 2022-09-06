import React from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordResetFail = () => {
    const navigate = useNavigate()

  return (
    <div className='flex h-screen items-center justify-center bg-slate-100'>
        <div className='flex flex-col gap-1 items-center bg-white rounded-3xl shadow-2xl p-5'>
            <h1>Oops!</h1>
            <p>Something went wrong while trying to reset your password.</p>
            <b>Make sure you have opened your latest mail</b>
            <button onClick={() => navigate('/login')} className='border-none text-white rounded-full py-3 px-10 font-bold bg-red-500'>Back to Login</button>
        </div>
    </div>
  )
}

export default PasswordResetFail