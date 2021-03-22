// import firebase from 'firebase'
// import 'firebase/firestore'

// export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN_FAILURE";

// export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
// export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
// export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// export const VERIFY_REQUEST = "VERIFY_REQUEST";
// export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

// const requestLogin = () => {
//   return {
//     type: LOGIN_REQUEST
//   };
// };

// const receiveLogin = user => {
//   return {
//     type: LOGIN_SUCCESS,
//     user
//   };
// };

// const loginError = () => {
//   return {
//     type: LOGIN_FAILURE
//   };
// };

// const requestLogout = () => {
//   return {
//     type: LOGOUT_REQUEST
//   };
// };

// const receiveLogout = () => {
//   return {
//     type: LOGOUT_SUCCESS
//   };
// };

// const logoutError = () => {
//   return {
//     type: LOGOUT_FAILURE
//   };
// };

// const verifyRequest = () => {
//   return {
//     type: VERIFY_REQUEST
//   };
// };

// const verifySuccess = () => {
//   return {
//     type: VERIFY_SUCCESS
//   };
// };

// export const loginUser = (email, password) => dispatch => {
//   dispatch(requestLogin());
//   myFirebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(user => {
//       dispatch(receiveLogin(user));
//     })
//     .catch(error => {
//       //Do something with the error if you want!
//       dispatch(loginError());
//     });
// };

// export const logoutUser = () => dispatch => {
//   dispatch(requestLogout());
//   myFirebase
//     .auth()
//     .signOut()
//     .then(() => {
//       dispatch(receiveLogout());
//     })
//     .catch(error => {
//       //Do something with the error if you want!
//       dispatch(logoutError());
//     });
// };

// export const verifyAuth = () => dispatch => {
//   dispatch(verifyRequest());
//   myFirebase
//     .auth()
//     .onAuthStateChanged(user => {
//       if (user !== null) {
//         dispatch(receiveLogin(user));
//       }
//       dispatch(verifySuccess());
//     });
// };

// const initialState = {
//     isLoggingIn: false,
//     isLoggingOut: false,
//     isVerifying: false,
//     loginError: false,
//     logoutError: false,
//     isAuthenticated: false,
//     user: {}
// }

// export default function(state = defaultUser, action) {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//           return {
//             ...state,
//             isLoggingIn: true,
//             loginError: false
//           };
//         case LOGIN_SUCCESS:
//           return {
//             ...state,
//             isLoggingIn: false,
//             isAuthenticated: true,
//             user: action.user
//           };
//         case LOGIN_FAILURE:
//           return {
//             ...state,
//             isLoggingIn: false,
//             isAuthenticated: false,
//             loginError: true
//           };
//         case LOGOUT_REQUEST:
//           return {
//             ...state,
//             isLoggingOut: true,
//             logoutError: false
//           };
//         case LOGOUT_SUCCESS:
//           return {
//             ...state,
//             isLoggingOut: false,
//             isAuthenticated: false,
//             user: {}
//           };
//         case LOGOUT_FAILURE:
//           return {
//             ...state,
//             isLoggingOut: false,
//             logoutError: true
//           };
//         case VERIFY_REQUEST:
//           return {
//             ...state,
//             isVerifying: true,
//             verifyingError: false
//           };
//         case VERIFY_SUCCESS:
//           return {
//             ...state,
//             isVerifying: false
//           };
//         default:
//           return state;
//       }
// }
