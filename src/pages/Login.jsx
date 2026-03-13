import React, { useContext, useState, useEffect } from 'react'
import { assests } from '../assets/asset'
import { AppContext } from '../context/AppContext'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const navigate=useNavigate()
    const [showPass,setShowPass]=useState(true)
    const {adminToken,setAdminToken,backendUrl}=useContext(AppContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post(`${backendUrl}/api/admin/login`,{email,password})
            if(data.success){
                localStorage.setItem('aToken',data.adminToken)
                setAdminToken(data.adminToken)
                return toast.success('successfully Logged in')
            }else{
                return toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            return toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(adminToken){
            navigate('/admin')
        }
    },[adminToken,navigate])
  return (
    <form  onSubmit={submitHandler}>
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-1/3 h-1/2 border-2 border-gray-600 rounded bg-gray-50 flex flex-col  items-center p-2'>
        <div className='w-2/3 h-full  flex flex-col  gap-3'>
            <div className='w-full -amber-300 text-center mb-3'>
                <h1 className='font-semibold text-2xl text-blue-700 underline decoration-blue-600'>Admin Login</h1>
            </div>
            <div className='w-full'>
                <p className='text-xl'>Email</p>
                <input className='border border-zinc-300 pl-2 w-full h-8 rounded' onChange={(e)=>setEmail(e.target.value)} type="text" value={email} name="" id="email" />
            </div>
             <div className='w-full'>
                <p className='text-xl'>Password</p>
                <div className='border border-zinc-300 pl-2 w-full h-8 focus-within:border-gray-500 focus-within:ring-1  rounded flex'>
                <input className=' w-full outline-none focus:outline-none focus:ring-0' onChange={(e)=>setPassword(e.target.value)} type={showPass?"password":"text"} value={password} name="" id="password" />
                <button type='button' onClick={()=>setShowPass(prev=>!prev)}> <img className='w-4 cursor-pointer' src={assests.eyeIcon} alt="" /></button>
                
                </div>
            </div>
            <button type='submit' className='bg-blue-600 text-white text-xl font-semibold h-9 rounded mt-2 w-full cursor-pointer'>Login</button>
        </div>
        </div>
    </div>
    </form>
  )
}

export default Login