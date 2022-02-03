import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'CHANGE_MODE':
      return {...state, mode: action.payload}
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false,
    mode: "light"
  })
  
  const changeMode = (mode) =>{
    dispatch({type: 'CHANGE_MODE', payload: mode})
  }
  // check to know the auth state of the user.
  useEffect(() => {
   const unsub = projectAuth.onAuthStateChanged((user)=>{
      dispatch({type: 'AUTH_IS_READY', payload: user})

      //stop action
      unsub()
    })
  },[])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch, changeMode }}>
      { children }
    </AuthContext.Provider>
  )

}