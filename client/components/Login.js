import React, {useState} from 'react'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {signInWithGoogle} from '../../server/db/firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})
  const [isUserLoggedIn, setUserAuthStatus] = useState(false)

  const loginUser = ({email, password}) => {
    console.log('logging in user')
    console.log(email, password)
    firestore
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user)
        setUser(res.user)
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
    auth.signInWithPopup(provider)
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
        <h1>Login</h1>
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
        <button type="submit">Login</button>
        <button type="button" onClick={signInWithGoogle}>
          Sign in With Google
        </button>
      </form>
    </div>
  )
}

export default Login

// onClick={() => {
//     auth
//       .signInWithPopup(provider)
//       .then(res => {
//         const { displayName, email } = res.user;
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
