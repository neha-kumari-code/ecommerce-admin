import React, { useState } from 'react'
import { createContext } from 'react'

export const AppContext=createContext()
const AppContextProvider = (props) => {
    const [Admintoken,setAdminToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const value={
        Admintoken,
        setAdminToken,
        backendUrl
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider