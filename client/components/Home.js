import React from 'react'
import {connect} from 'react-redux'
import {Login, Gallery} from './index'
import {Link} from 'react-router-dom'
import Guest from './Guest'
import {ToastContainer} from 'react-toastify'

function Home(props) {
  return (
    <div>
      {!props.isLoggedIn ? (
        <div id="home">
          <div id="auth-container">
            <Login />

            <Link to="/signup">
              <p className="link-to-signup">New? Sign Up Here</p>
            </Link>

            <div className="login-divider">
              <div className="divider" />
              <div className="or-divider">or</div>
              <div className="divider" />
            </div>

            <Guest />
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

export default connect(mapState)(Home)
