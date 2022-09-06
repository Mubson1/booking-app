import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmailVerificationSuccess = () => {
    const navigate = useNavigate()

    return (
        <div className='flex h-screen items-center justify-center bg-slate-100'>
            <div className='flex flex-col items-center bg-white rounded-3xl shadow-2xl p-5'>
                    <h1>Success!</h1>
                    <p>Thanks for verifying your email. Now you can use all the app's features.</p>
                    <button onClick={() => navigate('/')} className='border-none text-white rounded-full py-3 px-10 font-bold bg-blue-500'>Access HYP</button>
            </div>
        </div>
    )
}

export default EmailVerificationSuccess
