import React from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hook/useFetch'

const Featured = () => {
    const navigate = useNavigate()
    const {data, loading, error} = useFetch("/hotel?featured=true&limit=4")
  return (
    <div className='flex flex-col items-center pt-28 gap-5'>
        <h1 className='text-4xl'>Our featured properties that you would love</h1>
        {loading ? (
            "loading"
        ) : (
            <div className='max-w-screen-xl grid grid-cols-4 gap-4 w-3/4'>
            <>
                {data.map(item => (
                        <div onClick={() => navigate(`/hotels/${item._id}`)} key={item._id} className='cursor-pointer'>
                            <img src={item.photos[0]} alt='' className='w-full rounded-3xl h-full object-cover' />
                            <div className='flex flex-col gap-2 pt-2 pl-4'>
                                <span className='text-lg font-bold capitalize'>{item.name}</span>
                                <span className='text-sm'>{item.city}</span>
                                <span className='text-sm font-bold'>Starting from Rs.{item.cheapestPrice}</span>
                                {item.rating &&
                                    <div>
                                        <button className='bg-blue-800 text-white border-none px-2 py-1 mr-2 font-bold'>{item.rating}</button>
                                        <span>Excellent</span>
                                    </div>
                                }    
                            </div>
                        </div>
                    ))
                }
            </>
        </div>
        )}
    </div>
  )
}

export default Featured
