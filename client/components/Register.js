import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {google} from '../../server/db/firebase'
import GoogleButton from 'react-google-button'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setnickName] = useState('')
  const [user, setUser] = useState({})

  const registerUser = async ({nickname, email, password}) => {
    console.log('email:', email)
    console.log('pas:', password)

    await firestore
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //.then((data) => data.json())
      .then(res => {
        res.user
          .updateProfile({
            displayName: nickname
          })
          .then(function() {
            // Update successful.
            console.log('then')
          })
          .catch(function(error) {
            // An error happened.
            console.log(error)
          })

        setUser(res.user)
        console.log('setting user')
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          return toast.warning(
            'This email is already in use, Please login or continue with another email'
          )
        } else {
          return toast.error('Something went wrong')
        }
      })
  }

  const registerWithGoogle = () => {
    firestore
      .auth()
      .signInWithPopup(google)
      .then(res => {
        console.log(res.user)
        dispatch(getUser(res.user))
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          return toast.error('Email or password is incorrect')
        } else if (err.code === 'auth/user-not-found') {
          return toast.error('Email or password is invalid')
        } else {
          return toast.error('Something went wrong')
        }
      })
  }

  const handleSubmit = e => {
    console.log('handling submit')
    console.log(e.target)
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
    registerUser(data)
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
          onClick={registerWithGoogle}
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
