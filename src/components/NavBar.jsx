import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const NavBar = () => {
    const {setAdminToken}=useContext(AppContext)
    const navigate=useNavigate()
    const logoutHandler=()=>{
        localStorage.removeItem('aToken')
        setAdminToken(false)
        navigate('/')
    }
  return (
    <div className='w-screen flex justify-center items-center bg-gray-50 h-12'>
        <div className='w-5/6 flex justify-between'>
            <h1 className='border border-gray-400 rounded w-27 text-center'>Admin Panel</h1>
            <button onClick={logoutHandler} className='bg-blue-600 text-white text-xl rounded w-22 h-9 items-center cursor-pointer'>Logout</button>
        </div>
    </div>
  )
}

export default NavBar