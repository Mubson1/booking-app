import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'

const SearchItem = ({item}) => {
    const navigate = useNavigate()
  return (
    <div className='border border-solid rounded-md p-2 flex justify-between items-center gap-5 mb-5'>
        <img src={item.photos[0]}
            alt='' 
            className='w-48 h-48 object-cover' 
        />
        <div className='flex w-2/3 flex-col gap-1'>
            <span className='text-xl text-blue-900 font-bold capitalize'>{item.name}</span>
            <span className='text-blue-900 text-xs font-bold capitalize'>{item.city}</span>
            <span className='text-sm mb-3'>{item.distance}</span>
            <span className='text-base font-bold'>Studio Apartment with Air conditioning</span>
            <span className='text-base'>{item.desc}</span>
            <span className='text-base font-bold text-green-700'>Free cancellation</span>
            <span className='text-base text-green-700'>You can cancel later, so lock in this great price today!</span>
        </div>
        <div className='flex flex-col justify-between w-1/4 mt-4'>
            {item.rating &&
                <div className='flex justify-between'>
                    <span className='font-medium'>Excellent</span>
                    <button className='bg-blue-900 text-white p-1 font-bold border-none'>{item.rating}</button>
                </div>
            }
            <div className='text-right flex flex-col gap-2'>
                <span className='text-2xl'>${item.cheapestPrice}</span>
                <span className='text-xs text-gray-400'>Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                    <button className='bg-blue-800 text-white font-bold py-2 px-1 border-none rounded-md cursor-pointer'>See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem
