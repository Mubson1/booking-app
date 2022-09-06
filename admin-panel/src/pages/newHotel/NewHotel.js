import './newHotel.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import {hotelInputs} from "../../formSource"
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { useState } from 'react'
import useFetch from "../../hook/useFetch"
import axios from 'axios'
import axiosInstance from '../../auth/axiosInstance'

const NewHotel = () => {
  //if file is added, then the value of this state will be an object that contains the details of the file
  const [files, setFiles] = useState('')
  //Info will have all the input field's information except the image because we cannot have a url for our images from local machine
  const [info, setInfo] = useState({})

  const [rooms, setRooms] = useState([])

  const {data, loading, error} = useFetch('/room')

  const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value}))
  }

  //Remember these rooms are actually flat but not a room
  const handleSelect = e => {
    //console.log(e.target.selectedOptions);    this will return an HTMLCollection which looks like an array but not an actual array (HTMLCollection contains objects(named as options) as elements). So to transform it:
    const value = Array.from(e.target.selectedOptions, option => option.value)  //Since the HTMLCollection contains objects with lots of data but, we only want the value of the selected, so we are doign options.value
    setRooms(value)
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      //files are in datatype of object. So, to use map we need files to be in array. To do that we have used Object.values()
      const list = await Promise.all(   //we are using axios within a map function, so we are using Promise.all
        Object.values(files).map(async (file) => {
          //this is for saving the data that have been received in the form in the data variable
          const data = new FormData()
          data.append("file", file)

          //We are using cloudinary: We are providing the upload preset. The second argument is the folder in cloud where we are going to store our images and all. Look at the notes
          data.append("upload_preset", "upload")

          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dcywvzzu3/image/upload", data)
          //uploadRes.data will give object that contains the url of the image that we have inserted from our local machine
          const {url} = uploadRes.data
          return url
      }))

      const newHotel = {
        ...info,
        rooms,
        photos:list
      }

      await axiosInstance.post("/hotel", newHotel)
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
          <h1>Add New Product</h1> 
        </div>

        <div className='bottom'>
          <div className='left'>
            {/* we are creating a url of our local file */}
            <img src={files ? URL.createObjectURL(files[0]):'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='} alt='' />
          </div>
          <div className='right'>
            <form>
               <div className='formInput'>
                <label htmlFor='file'>Image: <DriveFolderUploadOutlined className='icon'/></label>
                {/* Out of different images that user might put, we are taking the first image, i.e., 0th index */}
                <input multiple onChange={e=>setFiles(e.target.files)} type='file' id='file' style={{display:"none"}}/>
              </div>

              {hotelInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}

              <div className='formInput'>
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className='selectRooms'>
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "loading" : data && data.map(room => (
                    <option value={room._id} key={room._id}>{room.title}</option>
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

export default NewHotel
