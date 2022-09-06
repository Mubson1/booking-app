import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { useState } from 'react'
import axios from 'axios'

const New = ({inputs, title}) => {
  //if file is added, then the value of this state will be an object that contains the details of the file
  const [file, setFile] = useState('')

  //Info will have all the input field's information except the image because we cannot have a url for our images from local machine
  const [info, setInfo] = useState({})

  const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    //this is for saving the data that have been received in the form in the data variable
    const data = new FormData()
    data.append("file", file)

    //We are using cloudinary: We are providing the upload preset. The second argument is the folder in cloud where we are going to store our images and all. Look at the notes
    data.append("upload_preset", "upload")
    console.log(data)
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dcywvzzu3/image/upload", data)
      //uploadRes.data will give object that contains the url of the image that we have inserted from our local machine
      const {url} = uploadRes.data
      //making api request to our api
      const newUser = {
        ...info,
        img: url
      }
      await axios.post('http://localhost:8800/api/authentication/signup', newUser)
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
          <h1>{title}</h1> 
        </div>

        <div className='bottom'>
          <div className='left'>
            {/* we are creating a url of our local file */}
            <img src={file ? URL.createObjectURL(file):'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='} alt='' />
          </div>
          <div className='right'>
            <form>
               <div className='formInput'>
                <label htmlFor='file'>Image: <DriveFolderUploadOutlined className='icon'/></label>
                {/* Out of different images that user might put, we are taking the first image, i.e., 0th index */}
                <input onChange={e=>setFile(e.target.files[0])} type='file' id='file' style={{display:"none"}}/>
              </div>

              {inputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id}/>
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default New
