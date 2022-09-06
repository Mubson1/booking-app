import React from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordResetSuccess = () => {
    const navigate = useNavigate()

    return (
        <div className='flex h-screen items-center justify-center bg-slate-100'>
            <div className='flex flex-col items-center bg-white rounded-3xl shadow-2xl p-5'>
                    <h1>Success!</h1>
                    <p>Your password has been reset. Now please login with your new password</p>
                    <button onClick={() => navigate('/login')} className='border-none text-white rounded-full py-3 px-10 font-bold bg-blue-500'>Login</button>
            </div>
        </div>
    )
}

export default PasswordResetSuccess
