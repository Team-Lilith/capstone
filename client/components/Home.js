import React, {useState, useEffect} from 'react'
import {Login, Auth} from './index'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div id="home">
      <div id="auth-container">
        {/* <Login /> */}
        <Auth />
      </div>

      <div id="gallery-container">
        <h3>or...</h3>
        <Link to="/gallery">
          <h1>Visit our Gallery</h1>
        </Link>
        <h2>Gallery image here</h2>
      </div>
    </div>
  )
}

export default Home
