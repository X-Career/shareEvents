import React from 'react'
import Contents from '../../components/Contents/Contents'
import NavBar from '../../components/Navbar/Navbar'
import "./Home.css"

const Home = () => {
  return (
    <div className='home'>
      <div className="left-side"> <NavBar /></div>
      <div className="right-side"> <Contents /></div>
    </div>
  )
}

export default Home