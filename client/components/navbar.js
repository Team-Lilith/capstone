import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div id="nav-container">
      <img
        src="https://i.pinimg.com/originals/c9/f1/58/c9f1585926ebc34913646266212c1310.png"
        id="logo"
      />
      <h1 id="title">COLLABALLAGE</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <div className="nav-button">
                <h3>Home</h3>
              </div>
            </Link>

            <Link to="/join">
              <div className="nav-button">
                <h3>Create/Join a Room</h3>
              </div>
            </Link>

            <Link to="/gallery">
              <div className="nav-button">
                <h3>Gallery</h3>
              </div>
            </Link>

            <Link to="/profile">
              <div className="nav-button">
                <h3>Profile</h3>
              </div>
            </Link>

            <a href="#" onClick={handleClick}>
              <div className="nav-button">
                <h3>Logout</h3>
              </div>
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}

            <Link to="/">
              <div className="nav-button">
                <h3>Home</h3>
              </div>
            </Link>

            <Link to="/login">
              <div className="nav-button">
                <h3>Login</h3>
              </div>
            </Link>

            <Link to="/signup">
              <div className="nav-button">
                <h3>Sign Up</h3>
              </div>
            </Link>

            <Link to="/join">
              <div className="nav-button">
                <h3>Create/Join a Room</h3>
              </div>
            </Link>

            <Link to="/gallery">
              <div className="nav-button">
                <h3>Gallery</h3>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </div>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.uid
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
