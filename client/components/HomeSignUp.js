import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Login, Register, Gallery} from './index'
import {Link} from 'react-router-dom'
import {signInWithGoogle} from '../../server/db/firebase'
import GoogleButton from 'react-google-button'

function HomeSignUp(props) {
  return (
    <div>
      {!props.isLoggedIn ? (
        <div id="home">
          <div id="auth-container">
            <Register />
          </div>

          <div id="gallery-container">
            <h3>Feeling Artsy?</h3>
            <Link to="/gallery">
              <div className="nav-button">
                <h1>Visit our Gallery</h1>
              </div>
            </Link>
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

export default connect(mapState)(HomeSignUp)
