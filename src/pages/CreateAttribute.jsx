import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const CreateAttribute = () => {
  const {backendUrl,adminToken,getAllAttribute}=useContext(AppContext)
  const inputType=["Sellable","Visual"]
  const [attributeName,setAttributeName]=useState("")
  const [attributeType,setAttributeType]=useState("")
  const createAttribute=async()=>{
    try {
      const {data}=await axios.post(`${backendUrl}/api/admin/create-attribute`,{attributeName,attributeType},{
        headers:{
           "token":adminToken
        }
      })
      if(data.success){
        await getAllAttribute()
        setAttributeName("")
        setAttributeType("")
        toast.success(data.message)
      }else{
          return toast.error(data.message)
        }
       } catch (error) {
            console.log(error)
            return toast.error(error.message)
          }
  }
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-5/6 flex flex-col'>
        <h1 className='font-bold text-2xl ml-4'>Create Attribute</h1>
        <div className='w-full m-4 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Attribute Name:</p>
              <input type="text" name="" id="attribute" className='border border-gray-300 pl-2 w-70 h-8 rounded' value={attributeName} onChange={(e)=>setAttributeName(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Input Type:</p>
             <select name="" id="" value={attributeType} onChange={(e)=>setAttributeType(e.target.value)} className='w-70 h-8 text-gray-700 border border-gray-300 rounded'>
              <option value="">Select Type</option>
               { inputType.map((item,idx)=>(
                  <option value={item.toUpperCase()} key={idx}>{item} </option>
                ))
              }
             </select>
            </div>
             <button type='submit'  disabled={!attributeName} onClick={createAttribute} className={`bg-blue-600 text-white text-xl rounded w-22 h-9 items-center cursor-pointer  ${!attributeName ? "opacity-50 cursor-not-allowed" : ""}`}>Create</button>
        </div>
        </div>
    </div>
  )
}

export default CreateAttribute