import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Login, Register, Gallery} from './index'
import {Link} from 'react-router-dom'

function Home(props) {
  console.log('logged in?', props.isLoggedIn)

  return (
    <div>
      {!props.isLoggedIn ? (
        <div id="home">
          <div id="auth-container">
            <Login />
            <Register />
          </div>

          <div id="gallery-container">
            <h3>or</h3>
            <Link to="/gallery">
              <div className="nav-button">
                <h1>Visit our Gallery</h1>
              </div>
            </Link>
            <h2>-Gallery images here-</h2>
          </div>
        </div>
      ) : (
        <div>
          <Gallery />
        </div>
      )}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.uid
  }
}

export default connect(mapState)(Home)
