import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'
import useFetch from '../hook/useFetch'

const PopularDestination = () => {
  const navigate = useNavigate()

  const {data, loading, error} = useFetch("/hotel/count?cities=Kathmandu,Pokhara,Jhapa,Lalitpur,Bhaktapur")
  
  const [destination, setDestination] = useState('dasf')
  const [dates, setDates] = useState([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
  ])
  const [options, setOptions] = useState({
    people: 1,
    room:1
  })

  const {dispatch} = useContext(SearchContext)
  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload: {destination, dates, options}})
    navigate('/hotels', {state: {destination, dates, options}})
  }

  return (
    <div className='flex justify-center'>
    <div className='max-w-screen-2xl grid grid-cols-5 w-11/12 gap-20 pt-28'>
    {loading?(
        "Loading Please Wait"
      ):(
        <div className='pl-36 pr-10 grid grid-rows-5 gap-3 col-span-3'>
          <div className='relative row-span-4 cursor-pointer' onMouseEnter={() => {setDestination('Kathmandu')}} onClick={() => {handleSearch()}}>
            <img src='https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60' alt='' className='w-full rounded-3xl h-full object-cover' />
            <div className='absolute bottom-4 left-5 space-y-0 text-white'>
                <h1>Kathmandu</h1>
                <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className='grid grid-col-4 gap-3 grid-flow-col row-span-1'>
            <div className='relative cursor-pointer' onMouseEnter={() => {setDestination('Pokhara')}} onClick={() => {handleSearch()}}>
              <img src='https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60' alt='' className='w-full rounded-3xl h-full object-cover' />
              <div className='absolute -bottom-1 left-2 text-white'>
                  <p className='font-bold -mb-3'>Pokhara</p>
                  <p className='text-xs'>{data[1]} properties</p>
              </div>
            </div>
            <div className='relative cursor-pointer' onMouseEnter={() => {setDestination('Jhapa')}} onClick={() => {handleSearch()}}>
              <img src='https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60' alt='' className='w-full rounded-3xl h-full object-cover' />
              <div className='absolute -bottom-1 left-2 text-white'>
                  <p className='font-bold -mb-3'>Jhapa</p>
                  <p className='text-xs'>{data[2]} properties</p>
              </div>
            </div>
            <div className='relative cursor-pointer' onMouseEnter={() => {setDestination('Lalitpur')}} onClick={() => {handleSearch()}}>
              <img src='https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60' alt='' className='w-full rounded-3xl h-full object-cover' />
              <div className='absolute -bottom-1 left-2 text-white'>
                  <p className='font-bold -mb-3'>Lalitpur</p>
                  <p className='text-xs'>{data[3]} properties</p>
              </div>
            </div>
            <div className='relative cursor-pointer' onMouseEnter={() => {setDestination('Bhaktapur')}} onClick={() => {handleSearch()}}>
              <img src='https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60' alt='' className='w-full rounded-3xl h-full object-cover' />
              <div className='absolute -bottom-1 left-2 text-white'>
                  <p className='font-bold -mb-3'>Bhaktapur</p>
                  <p className='text-xs'>{data[4]} properties</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='col-span-2 items-center flex'>
        <div className='grid grid-rows-4 gap-4'>
          <div className='row-span-3 max-w-min min-w-fit'>
            <h1 className='text-6xl'>Popular Destination</h1>
            <p className='text-gray-500 text-xl'>Hello world Hello world Hello world Hello world v Hello world Hello world Hello world</p>
          </div>
          <div className='row-span-1'>
            <button className='py-2 px-5 rounded-lg border-gray-300 border-solid bg-white hover:border-black cursor-pointer'>Start Your Search</button>  
          </div>
        </div>
      </div> 
    </div>
    </div>
  )

}

export default PopularDestination
