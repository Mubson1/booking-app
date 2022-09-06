import React from 'react'
import Featured from '../components/Featured'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import PopularDestination from '../components/PopularDestination'
import PropertyList from '../components/PropertyList'

const Home = () => {
  const myStyle = {
    backgroundImage: `url('https://media.istockphoto.com/vectors/abstract-white-background-vector-id1143662580?k=20&m=1143662580&s=612x612&w=0&h=crRMwRL1ekQZ9nMeaIFnehGBOdmT0KwIdAJiLU0n9CY=')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%'
  }
  return (
    <div>
      <Navbar/>
      <div style={myStyle} >
        <Header />
        <PopularDestination />
        <PropertyList />
        <Featured />
      </div>
    </div>
  )
}

export default Home
