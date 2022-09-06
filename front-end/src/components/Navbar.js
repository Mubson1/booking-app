import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import useUser from '../auth/useUser';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Navbar = () => {
    const user = useUser()
    const state = {
        id: "",
        username: "",
        email: ""
    }
    if(user){
        const {id, username, email} = user
        Object.assign(state, {id:id})
        Object.assign(state, {username:username})
        Object.assign(state, {email:email})
    }

    const [click, setClick] = useState('')

    const navigate = useNavigate()

    const onLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const [openDetails, setOpenDetails] = useState(false)

  return (
        <div className='min-w-max max-w-full flex h-24 justify-center border-solid border-4 border-b-neutral-400 border-white'>
            <div className='relative flex items-center mx-32 gap-28'>
                <div className='flex gap-12 items-center'>
                    <div onClick={() => navigate('/')} className='h-12 flex cursor-pointer items-center border-solid border-white border-r-neutral-200 pr-4 min-w-fit'>
                        <img src='https://pbs.twimg.com/profile_images/674264309963227136/uqWXnVVG_400x400.png' alt='hyp logo' className='h-20'/>
                        <Link to='/' className='no-underline'>
                            <h2 className='font-sans'>Hunt Your Place</h2>
                        </Link>
                    </div>
                    <h4 onClick={() => navigate('/')} onMouseEnter={()=>setClick('booking')} onMouseLeave={() => setClick('')} className={click === 'booking' ? 'min-w-max border-solid px-4 py-2 border-2 border-neutral-400 cursor-pointer': 'border-none cursor-pointer min-w-max'}>Booking</h4>
                    <h4 onClick={() => navigate('/allProperties')} onMouseEnter={()=>setClick('property')} onMouseLeave={() => setClick('')} className={click === 'property' ? 'min-w-max border-solid px-4 py-2 border-2 border-neutral-400 cursor-pointer': 'border-none cursor-pointer min-w-max'}>List property</h4>
                    <h4 onMouseEnter={()=>setClick('about')} onMouseLeave={() => setClick('')} className={click === 'about' ? 'min-w-max border-solid px-4 py-2 border-2 border-neutral-400 cursor-pointer': 'border-none cursor-pointer min-w-max'}>About us</h4>
                    <h4 onMouseEnter={()=>setClick('contact')} onMouseLeave={() => setClick('')} className={click === 'contact' ? 'min-w-max border-solid px-4 py-2 border-2 border-neutral-400 cursor-pointer': 'border-none cursor-pointer min-w-max'}>Contact</h4>
                </div>

                {state.id === "" ? (
                    <div className='min-w-max'>
                        <button onClick={() => navigate('/signup')} className='hover:border-black border-solid border-gray-400 text-base ml-5 py-3 px-8 cursor-pointer text-gray-600 font-bold bg-white rounded-lg'>Register</button>
                        <button onClick={() => navigate('/login')} className='hover:border-solid hover:border-4 hover:border-indigo-700 border-none text-base font-bold ml-5 py-3 px-6 cursor-pointer text-white bg-indigo-700 rounded-lg'>Login</button>
                    </div>
                ) : (
                    <div>
                    <FontAwesomeIcon onClick={() => setOpenDetails(!openDetails)} className='cursor-pointer text-gray-500 p-3 rounded-full border-solid border-2 border-gray-400' icon={faUserLarge} />
                    {openDetails && 
                        <div className='absolute z-50 -right-28 top-20 flex flex-col items-center gap-1 p-3 bg-white rounded-xl border-solid  border-2 border-gray-400 w-fit'>
                            <span>{state.username}</span>
                            <span>{state.email}</span>
                            <span>ID: {state.id}</span>
                            <button onClick={onLogOut} className='hover:border-solid hover:border-4 hover:border-red-500 mt-1 w-full border-none font-bold py-1 cursor-pointer text-white bg-red-500 rounded-lg'>Log Out</button>
                        </div>}
                    </div>
                )
                    
                }
                
            </div>
        </div>
  )
}

export default Navbar
