import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import SearchItem from "../components/SearchItem"
import { SearchContext } from "../context/SearchContext"
import useFetch from "../hook/useFetch"
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'

const HotelList = () => {
  const location = useLocation()

  //getting the value using location
  //Ternary operator is used for Solving a problem that would occur if the endpoint is directly hit instead of pressing the search button
  const state_destination = location.state ? location.state.destination: "Kathmandu"
  const [destination, setDestination] = useState(state_destination)
  const state_dates = location.state ? location.state.dates: [{startDate: new Date, endDate: new Date(), key:'selection'}]
  const [dates, setDates] = useState(state_dates)
  const state_options = location.state ? location.state.options: {people:1, room:1}
  const [options, setOptions] = useState(state_options)
  const [openDate, setOpenDate] = useState(false)

  //defining a use state for the left side search div that contains prices as well
  const [min, setMin] = useState(null)
  const [max, setMax] = useState(null)

  const {data, loading, error, reFetch} = useFetch(`/hotel?city=${destination}&min=${min || 0}&max=${max || 5000}`)  //here, min and max are the varibale from useState that we will created above
  
  const {dispatch} = useContext(SearchContext)
  const handleClick = () => {
    dispatch({type:"NEW_SEARCH", payload: {destination, dates, options}}) //remember that the SearchReducer accepts action which is an object with properties type and payload
    setOpenDate(false)
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-5xl flex gap-5'>
          <div className='w-2/5 bg-amber-500 p-3 rounded-xl sticky top-10 h-max'>
            <h1 className='text-3xl text-gray-900 mb-3'>Search</h1>
            <div className='flex flex-col gap-2 mb-3'>
              <label className='text-base font-bold'>Destination</label>
              <input onChange={e => setDestination(e.target.value)} type='text' placeholder={destination} className="h-7 border-none p-1"/>
            </div>
            <div className='flex flex-col gap-2 mb-3'>
              <label className='text-base font-bold'>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)} className="h-7 bg-white p-1 flex items-center cursor-pointer">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange 
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div className='flex flex-col gap-2 mb-3'>
              <label className='text-base font-bold'>Options</label>
              <div className='p-2'>
                <div className='flex justify-between mb-3 text-gray-900'>
                  <span className='lsOptiontext text-base'>
                    Min price <small>per night</small>
                  </span>
                  <input onChange={e=>setMin(e.target.value)} type="number" className='w-12'/>
                </div>
                <div className='flex justify-between mb-3 text-gray-900'>
                  <span className='lsOptiontext text-base'>
                    Max price <small>per night</small>
                  </span>
                  <input onChange={e=>setMax(e.target.value)} type="number" className='w-12' />
                </div>
                <div className='flex justify-between mb-3 text-gray-900'>
                  <span className='lsOptiontext text-base'>
                    People
                  </span>
                  <input type="number" className='w-12' min={1} placeholder={options.people}/>
                </div>
                <div className='flex justify-between mb-3 text-gray-900'>
                  <span className='lsOptiontext text-base'>
                    Room
                  </span>
                  <input type="number" className='w-12' min={1} placeholder={options.room}/>
                </div>
                
              </div>
            </div>
            <button onClick={handleClick} className='p-3 bg-blue-900 text-white border-none w-full font-medium cursor-pointer'>Search</button>
          </div>


          <div className='w-full'>
            {loading ? "loading" :
              <>
                {data.map(item => (
                  //This item={item} will set the data about a hotel for each SearchItem
                  <SearchItem item={item} key={item._id} />
                ))}    
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelList
