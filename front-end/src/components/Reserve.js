import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { SearchContext } from '../context/SearchContext'
import useFetch from '../hook/useFetch'
// import axios from '../auth/axiosInstance'
import axios from 'axios'

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([])

    //useFetch will return us something from the back-end and will be stored in data
    const {data, loading, error} = useFetch(`/hotel/room/${hotelId}`)

    const {dates} = useContext(SearchContext)
    //Since the above dates will be in range from start date to end date, we want each of those dates that falls under that range. So,
    const getDatesInRange = (start, end) => {
        //we will first take the start date of range as below and increase it by 1 day until it is equal to the last day. And during that we will add each dates to the list
        const date = new Date(start.getTime());

        //So, we are creating an empty list which will store all those dates that falls under the range user has specified
        let list=[]
        while(date <= end){
            //.getTime will give the timestamps will make it much easier to compare the dates
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return list
    }
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    //creating a function to check if the unavailableDates in the database of the rooms contains the dates where user has specified the range of date to stay
    const isAvailable = (roomNumber)  => {
        const isFound = roomNumber.unavailableDates.some(date =>    //some method checks if it includes some of them or not
            alldates.includes(new Date(date).getTime()))

        return !isFound             //since finding room in those dates means that the room in not available. i.e., if isFound is true, isAvailable should be false
    }

    const handleSelect = (e) => {
        //To know if the room has been selected or not
        const checked = e.target.checked
        //value will be the id of room
        const value = e.target.value

        //what we are basically doing here is that when the checkbox is selected, we will set the hotelId n selectedRooms and if again unSelected, we will remove it from there
        setSelectedRooms(checked ?
            //yadi checked xa bhane selectedRooms ma naya room add garyo
            [...selectedRooms, value] :
            //yadi selected xaina bhane teslai selectedRooms bata filter garera nikalde
            selectedRooms.filter((item) => item !== value))
    }

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/room/availability/${roomId}`, {dates: alldates})
                return res.data     //this doesn't matter if this loc is even missing
            }))
            setOpen(false)
        } catch (error) {
            
        }
    }

  return (
    <div className='w-screen h-screen bg-black bg-opacity-70 fixed top-0 lef-0 flex items-center justify-center'>
      <div className='bg-white p-5 relative'>
        <FontAwesomeIcon icon={faCircleXmark} onClick={()=>setOpen(false)} className='absolute top-0 right-0 cursor-pointer'/>
        <span className='text-2xl'>Select your rooms:</span>
        {data.map(item => (
            <div key={item._id} className='flex items-center gap-12 p-5'>
                <div className='flex flex-col gap-1'>
                    {/* Here, item will be an object of each rooms of the hotel. */}
                    <div className='font-semibold'>{item.title}</div>
                    <div className='font-medium'>{item.desc}</div>
                    <div className='text-sm'>
                        Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className='font-semibold'>{item.price}</div>
                </div>
                <div className='flex flex-wrap text-xs text-gray-400'>
                    {/* our data in this file woould contain all rooms(flats) of a hotel. Then we are using map so item would contain details of each room(flat)*/}
                    {/* So, item.roomNumbers would be an array of rooms of a flat in the hotel */}
                    {item.roomNumbers.map(roomNumber => (
                        <div key={roomNumber._id} className='flex flex-col'>
                            <label>{roomNumber.number}</label>
                            <input
                                type='checkbox'
                                value={roomNumber._id}
                                onChange={handleSelect}
                                disabled={!isAvailable(roomNumber)}/>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        <button onClick={handleClick} className='border-none px-5 py-3 bg-blue-700 text-white font-bold cursor-pointer rounded-md w-full mt-5'>Reserve Now!</button>
      </div>
    </div>
  )
}

export default Reserve
