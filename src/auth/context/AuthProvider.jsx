import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './AuthReducer'
import { types } from '../types/types'

const initialState={
    logged:false
}

const init=()=>{
  const user=JSON.parse(localStorage.getItem('user'));

  return{
    logged:!!user,
    user:user,
  }
}

export const AuthProvider = ({children}) => {
    //NT: llamar a init en el provider lee del  localstorage y ya no es necesario el estado inicial sino {}
    const [authState,dispatch]=useReducer(authReducer,{}, init)

    const login=(name='')=>{
      const user={
        id:'ABC',
        name
      }
      const action={type:types.login,payload:user}

      localStorage.setItem('user',JSON.stringify(user))
      dispatch(action)
    }

    const logout=()=>{
      //NT: No clear que se borra todo el localstorage
      localStorage.removeItem('user');
      const action={type:types.logout}
      dispatch(action)
    }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login:login,
      logout:logout,
    }}>
        {children}
    </AuthContext.Provider>
  )
}
