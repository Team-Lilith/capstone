import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {loginUser, signInWithGoogle} from '../store'
import GoogleButton from 'react-google-button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = e => {
    console.log('submitting')
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please enter your email and password')
    }

    const data = {
      email,
      password
    }
    dispatch(loginUser(data))
  }

  return (
    <div className="column">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>

      <div className="google-btn">
        <GoogleButton
          type="light"
          onClick={() => dispatch(signInWithGoogle())}
          label="Login with Google"
        />
      </div>
    </div>
  )
}

export default Login
