import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {getUser} from '../store'
import {useSelector, useDispatch} from 'react-redux'
import {google} from '../../server/db/firebase'
import GoogleButton from 'react-google-button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState({})
  // const [isUserLoggedIn, setUserAuthStatus] = useState(false)
  const dispatch = useDispatch()

  const loginUser = ({email, password}) => {
    console.log('logging in user')
    console.log(email, password)
    firestore
      .auth()
      .signInWithEmailAndPassword(email, password)
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

  const signInWithGoogle = () => {
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
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please enter your email and password')
    }

    const data = {
      email,
      password
    }
    loginUser(data)
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
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="login-btn" type="submit">
          Login
        </button>

        {/* <h3>or...</h3> */}
        {/* <button className="login-input" type="button" onClick={signInWithGoogle}>
          Sign in With Google
        </button> */}
      </form>
      <div className="google-btn">
        <GoogleButton
          type="light"
          onClick={signInWithGoogle}
          label="Login with Google"
        />
      </div>
      <Link to="/signup">
        <p className="link-to-signup">New? Sign Up Here</p>
      </Link>
    </div>
  )
}

export default Login

// onClick={() => {
//     auth
//       .signInWithPopup(provider)
//       .then(res => {
//         const { , email } = res.user;
//         const userInfo = {x
//           email,
//           displayName
//         };
//         setUser(userInfo);
//         setUserAuthStatus(true);

//         return res;
//       })
//       .catch(err => err);
//   }
