import React, { useContext, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faLocationDot, faArrowRightToBracket, faArrowRightFromBracket, faPerson, faHotel} from '@fortawesome/free-solid-svg-icons'
import {format} from 'date-fns'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useNavigate } from 'react-router-dom'
import useToken from '../auth/useToken'
import { SearchContext } from '../context/SearchContext'

const Header = () => {
    const navigate = useNavigate()

    const {token} = useToken()

    const [destination, setDestination] = useState('')
    const [options, setOptions] = useState({
        people: 1,
        room:1
    })

    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return{
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const {dispatch} = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload: {destination, dates, options}})
        navigate('/hotels', {state: {destination, dates, options}})
    }

  return (
    <div className='2xl:m-auto flex justify-center max-w-screen-2xl relative'>
      <div className='grid grid-cols-5 w-11/12 gap-28 pt-4'>
      <div className='pl-36 pr-10 col-span-3 max-w-min min-w-fit'>
            <h1 className='text-6xl'>Our world is your playground.</h1>
            <p className='text-gray-500 text-xl pr-40'>We give you more of what you want and less of what you don't need</p>
            {!token && 
                <div>
                    <input type='text' placeholder='Start Your Search' className='py-2 rounded-lg border-gray-300 border-solid'/>
                    <button className='text-white border-none font-bold rounded-lg py-2 px-4 transition ease-in-out delay-150 bg-blue-500 hover:bg-indigo-500 duration-300 ml-3'>Login</button>
                </div>
            }
      </div>
      <div className='col-span-2 px-14 py-8 bg-white/80 shadow-2xl rounded-3xl w-2/3 max-w-min min-w-max'>
        <div>
            <p className='text-xl font-bold'>
                <FontAwesomeIcon icon={faHotel}/> Start Booking Hotel <br/>
                <span className='font-normal text-sm text-gray-500'>Find a place that suits for your need, It's easy</span>
            </p><hr />
        </div>
        
        <div className='grid gap-4'>
            <div>
                <div className='flex items-center gap-2 text-gray-500 -mb-3 text-sm'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>Place Name</p>
                </div>
                <input type='text' onChange={(e) => setDestination(e.target.value)} className="border rounded-3xl w-4/5 px-6 py-1 text-base"/>
            </div>
            <div>
                <div onClick={() => setOpenDate(!openDate)} className='flex gap-8 cursor-pointer'>
                    <div className='border-solid border-2 pr-8 border-r-neutral-200 border-white'>
                        <p className='text-gray-500 text-sm'> <FontAwesomeIcon icon={faArrowRightToBracket} /> Check In</p>
                        <b className='text-base'>{`${format(dates[0].startDate, "MM/dd/yyyy")}`}</b>
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm'> <FontAwesomeIcon icon={faArrowRightFromBracket} /> Check Out</p>
                        <b className='text-base'>{`${format(dates[0].endDate, "MM/dd/yyyy")}`}</b>
                    </div>
                </div>
                {openDate && 
                    <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                    className="absolute -ml-10 z-20"
                    />
                }
            </div>
            <div>
                <div className='flex gap-8'>
                    <div className='border-solid border-2 pr-16 border-r-neutral-200 border-white'>
                        <p className='text-gray-500 text-sm'> <FontAwesomeIcon icon={faPerson} /> People</p>
                        <div className='flex justify-center items-center gap-3'>
                            <span className='text-3xl font-semibold'>{options.people}</span>
                            <div className='flex flex-col gap-2'>
                                <button onClick={()=>handleOption("people", "i")} className='flex w-4 h-4 items-center justify-center cursor-pointer'>
                                    +
                                </button>
                                <button disabled={options.people <= 1} onClick={()=>handleOption("people", "d")} className='flex w-4 h-4 items-center justify-center cursor-pointer'>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm'> <FontAwesomeIcon icon={faBed} /> Room</p>
                        <div className='flex justify-center items-center gap-3'>
                            <span className='text-3xl font-semibold'>{options.room}</span>
                            <div className='flex flex-col gap-2'>
                                <button onClick={()=>handleOption("room", "i")} className='flex w-4 h-4 items-center justify-center cursor-pointer'>
                                    +
                                </button>
                                <button disabled={options.room <= 1} onClick={()=>handleOption("room", "d")} className='flex w-4 h-4 items-center justify-center cursor-pointer'>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button disabled={!destination} onClick={handleSearch} className='disabled:bg-blue-300 text-white border-none font-bold rounded-full py-3 px-10 transition ease-in-out delay-150 bg-blue-500 hover:bg-indigo-500 duration-300'>Search</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Header
