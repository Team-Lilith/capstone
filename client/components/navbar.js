import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Tooltip} from '@material-ui/core'
import {toast} from 'react-toastify'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, roomId}) => {
  const copyTextToClipboard = text => {
    var textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      toast('Link copied to clipboard. Share with a friend!')
    } catch (err) {
      toast('Failed to copy link to clipboard, try again!')
    }

    document.body.removeChild(textArea)
  }

  return (
    <div id="nav-container">
      <div id="nav-left">
        <img
          src="https://i.pinimg.com/originals/c9/f1/58/c9f1585926ebc34913646266212c1310.png"
          id="logo"
        />
        <h1 id="title">COLLABALLAGE</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              {/* <Link to="/home">
                <div className="nav-hover-button">
                  <h3>Home</h3>
                </div>
              </Link> */}

              <Link to="/gallery">
                <div className="nav-hover-button">
                  <h3>Gallery</h3>
                </div>
              </Link>

              <Link to="/join">
                <div className="nav-hover-button">
                  <h3>Create</h3>
                </div>
              </Link>

              {/* <Link to="/profile">
                <div className="nav-hover-button">
                  <h3>Profile</h3>
                </div>
              </Link> */}

              <a href="#" onClick={handleClick}>
                <div className="nav-hover-button">
                  <h3>Logout</h3>
                </div>
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}

              <Link to="/">
                <div className="nav-hover-button">
                  <h3>Home</h3>
                </div>
              </Link>

              <Link to="/gallery">
                <div className="nav-hover-button">
                  <h3>Gallery</h3>
                </div>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <div id="nav-right">
        <h2>Current Room:</h2>{' '}
        <div id="nav-room">
          {roomId ? (
            <div id="nav-right-inner">
              <Tooltip title="Go Back to Room" arrow>
                <Link to={`/room/${roomId}`}>
                  <div className="nav-button">
                    <h3>{roomId}</h3>
                  </div>
                </Link>
              </Tooltip>
              <Tooltip title="Copy Room Link to Clipboard" arrow>
                <button
                  className="copy-link-button"
                  onClick={() => copyTextToClipboard(window.location.href)}
                >
                  <img src="/images/clipboard.png" />
                </button>
              </Tooltip>
            </div>
          ) : (
            <h2>None</h2>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.uid,
    roomId: state.room
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
