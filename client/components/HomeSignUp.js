import React from 'react'
import {connect} from 'react-redux'
import {Register, Gallery} from './index'
import {Link} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

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
          <ToastContainer />
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
