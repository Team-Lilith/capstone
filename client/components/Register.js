import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import GoogleButton from 'react-google-button'
import {signInWithGoogle, registerUser} from '../store'
import {useDispatch} from 'react-redux'
import {showToast} from '../toasty'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setnickName] = useState('')
  const [user, setUser] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!email || !password || !nickname) {
      return showToast('Please enter an email, password and nickname!')
    }
    if (!validateEmail(email)) {
      return showToast('You have entered an invalid email address!')
    }
    if (password.length < 6) {
      return showToast('Password must be 6 characters or more')
    }

    const data = {
      nickname,
      email,
      password
    }
    dispatch(registerUser(data))
  }

  const validateEmail = mail => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true
    }
    return false
  }

  return (
    <div className="column register-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="nickname"
          placeholder="Nickname"
          name="nickname"
          value={nickname}
          onChange={e => setnickName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button className="login-btn" onClick={registerUser} type="submit">
          Sign Up
        </button>
      </form>

      <Link to="/login">
        <div className="link-to-signup">Have an account? Log in Here</div>
      </Link>

      <div className="login-divider">
        <div className="divider" />
        <div className="or-divider">or</div>
        <div className="divider" />
      </div>

      <div className="google-btn">
        <GoogleButton
          type="light"
          onClick={() => dispatch(signInWithGoogle())}
          label="Sign up with Google"
        />
      </div>

      <Link to="/login">
        <div className="link-to-signup">Have an account? Log in Here</div>
      </Link>
      <ToastContainer />
    </div>
  )
}

export default Register
