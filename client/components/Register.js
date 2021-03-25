import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import firestore from 'firebase'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setnickName] = useState('')
  const [user, setUser] = useState({})

  const registerUser = ({nickname, email, password}) => {
    console.log('email:', email)
    console.log('pas:', password)

    firestore
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
          .catch(function() {
            // An error happened.
            console.log('catch')
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
    <div className="column">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="nickname"
          placeholder="nickname"
          name="nickname"
          value={nickname}
          onChange={e => setnickName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Link to="gallery">
          <button onClick={registerUser} type="submit">
            Sign Up
          </button>
        </Link>
      </form>
    </div>
  )
}

export default Register
