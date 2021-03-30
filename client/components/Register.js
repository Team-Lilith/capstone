import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {google} from '../../server/db/firebase'
import GoogleButton from 'react-google-button'
import {registerWithGoogle, registerUser} from '../store'
import {useDispatch} from 'react-redux'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setnickName] = useState('')
  const [user, setUser] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please enter your email and password')
    }
    if (password.length < 6) {
      return toast.error('Password must be 6 characters or more')
    }

    const data = {
      nickname,
      email,
      password
    }
    dispatch(registerUser(data))
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
      <div className="login-divider">
        <div className="divider" />
        <div className="or-divider">or</div>
        <div className="divider" />
      </div>

      <div className="google-btn">
        <GoogleButton
          type="light"
          onClick={() => dispatch(registerWithGoogle())}
          label="Sign up with Google"
        />
      </div>

      <Link to="/login">
        <div className="link-to-signup">Have an account? Log in Here</div>
      </Link>
    </div>
  )
}

export default Register
