import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PleaseVerify = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  })
    
  return (
    <div className='flex h-screen items-center justify-center bg-slate-100'>
      <div className='flex flex-col items-center bg-white rounded-3xl shadow-2xl p-5'>
        <h1>Thanks for Signing Up!</h1>
        <p>
          A verification email has been sent to your email address.
        </p>
        <b>Please verify to access full features of HYP.</b>
      </div>
    </div>
  )
}

export default PleaseVerify
