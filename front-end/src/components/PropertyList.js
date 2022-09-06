import React from 'react'
import useFetch from '../hook/useFetch'

const PropertyList = () => {
    const {data, loading, error} = useFetch("/hotel/countByType")

    //we are creating an array that would store the link for the images
    const images = [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    ]

  return (
    <div className='flex flex-col items-center pt-28 gap-5'>
        <h1 className='text-4xl'>Browse by property type</h1>
        {loading ? (
            "loading"
        ) : (
            <div className='max-w-screen-xl grid grid-cols-5 gap-4 w-3/4'>
            <>
                {data &&
                    images.map((img, i) => (
                        <div key={i}>
                            <img src={img} alt='' className='w-full rounded-3xl h-full object-cover' />
                            <div className='flex flex-col gap-1 pt-2 pl-4'>
                                <span className='text-lg font-bold capitalize'>{data[i]?.type}</span>
                                {/* explanation for data[i].count is given above the {data &&} */}
                                <span className='text-sm'>{data[i]?.count} {data[i]?.type}</span>    
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

export default PropertyList
