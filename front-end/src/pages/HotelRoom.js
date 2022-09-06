import { faArrowLeftRotate, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../hook/useFetch'
import { SearchContext } from '../context/SearchContext'
import Reserve from '../components/Reserve'
import useUser from '../auth/useUser'
import { set } from 'date-fns'


const Hotel = () => {
  const navigate = useNavigate();

  //uselocation will return the path as: {pathname: /hotels/<hotel_id>}.
  const location = useLocation();
  //we want the hotel_id so:
  const id = location.pathname.split('/')[2]   //the split content will be: '', 'hotels', '<hotel_id>'

  //this is to make the img larger on click
  const [slideNumber, setSlideNumber] = useState(0)   //to store the img index for identifying the img uniquely
  const [open, setOpen] = useState(false)             //this is for the div and for actually increasing and decreasing the size of img

  //this is to show the rooms available while clicking the reserve now button
  const [openModal, setOpenModal] = useState(false)

  const {data, loading, error, reFetch} = useFetch(`/hotel/find/${id}`)
  const user = useUser()

  //getting data that the user have specified during search. The dates from another component will be gained by using useContext instead of a props
  const {dates, options} = useContext(SearchContext);
  //subtracting the starting date from ending date
  const MILLISECONDS_PER_DAY = 1000*60*60*24;                      //this is the milliseconds that a day contains
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())  //timeDiff will be in millseconds units
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  //Remember that we have initialized dates above in useContext. Since it contains details of user specified range of dates in the first index of dates array: 
  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const [isNotVerified, setIsNotVerified] = useState(true)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClick = () => {
    if (user && user.isVerified) {
        setIsNotVerified(false)
      setOpenModal(true)
    } else {
      alert("Your account has not been verified to access this feature. Please check the mail to get a link for account verification.")
    }
  }

  return (
    <div>
      <Navbar />
      {loading ? (
        "loading"
      ) : (
          <div className='flex flex-col items-center mt-5'>
            {open && (
              <div className='flex items-center sticky top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-50'>
                <FontAwesomeIcon icon={faCircleXmark} className='absolute top-5 right-5 text-3xl text-gray-300 cursor-pointer' onClick={() => setOpen(false)}/>
                <FontAwesomeIcon icon={faCircleArrowLeft} className='m-5 text-5xl text-gray-300 cursor-pointer' onClick={() => handleMove("l")}/>
                <div className='w-full h-full flex justify-center items-center'>
                  <img src={data.photos[slideNumber]} alt="" className='w-3/5 h-3/5' />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} className='m-5 text-5xl text-gray-300 cursor-pointer' onClick={() => handleMove("r")}/>
              </div>
            )}
            <div className='relative w-full max-w-5xl flex flex-col gap-2'>
              <button onClick={handleClick} className='absolute top-3 right-0 border-none py-3 px-5 bg-blue-800 text-white font-bold cursor-pointer rounded-md'>Reserve or Book Now!</button>
              <h1 className='text-3xl'>{data.name}</h1>
              <div className='text-lg flex items-center gap-2'>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className='font-semibold text-blue-500'>
                Excellent location - {data.distance}
              </span>
              <span className='font-semibold text-green-600'>
                Book a stay over {data.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className='flex flex-wrap justify-between ml-1'>
                {data.photos?.map((photo, i) => (
                  <div key={i} className='w-1/3'>
                    <img onClick={() => handleOpen(i)} src={photo} alt='' className='w-full object-cover' />
                  </div>
                ))}
              </div>
              <div className='flex justify-between gap-5 mt-5'>
                <div className='w-3/4'>
                  <h1 className='text-3xl'>{data.title}</h1>
                  <p className='text-base mt-5'>
                    {data.desc}
                  </p>
                </div>
                <div className='w-1/4 bg-slate-200 p-5 flex flex-col gap-1'>
                  <h1 className='text-xl text-gray-600'>Perfect for a {days}-night stay!</h1>
                  <span className='text-base'>
                    Located in the real heart of Krakow, this property has anexcellent location score of 9.81!
                  </span>
                  <h2 className='font-light'>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                  </h2>
                  <button onClick={handleClick} className='border-none px-5 py-3 bg-blue-700 text-white font-bold cursor-pointer rounded-md'>
                        Reserve or Book Now!
                </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {/* the id below comes from the location that we have used above */}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />} 
    </div>
  )
}

export default Hotel
