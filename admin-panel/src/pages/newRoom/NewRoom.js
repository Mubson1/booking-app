import './newRoom.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { useState } from 'react'
import {roomInputs} from '../../formSource'
import useFetch from '../../hook/useFetch'
import axios from '../../auth/axiosInstance'

const NewRoom = () => {
  //if file is added, then the value of this state will be an object that contains the details of the file
  const [info, setInfo] = useState({})

  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])

  const {data, loading, error} = useFetch('/hotel')

  const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    //remember that the room in rooms model is an array containing objects of number and type. So, to make the array of strings into the required array of object:
    const roomNumbers = rooms.split(",").map(room => ({number:room}))
    try {
      await axios.post(`/room/${hotelId}`, {...info, roomNumbers})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>Add New Room</h1> 
        </div>

        <div className='bottom'>
          <div className='right' >
            <form>
              {roomInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className='formInput'>
                <label>Rooms</label>
                <textarea onChange={e=>setRooms(e.target.value)} placeholder='give comma between room numbers'></textarea>
              </div>
              <div className='formInput'>
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                  {loading ? "loading" : data && data.map(hotel => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewRoom
