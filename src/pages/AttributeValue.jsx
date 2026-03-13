import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
const AttributeValue = () => {
  const {adminToken,getAllAttribute,attribute,backendUrl}=useContext(AppContext)
  const [value,setValue]=useState('')
  const [attributeName,setAttributeName]=useState("")
  const setAttributeValue=async()=>{
    try {
      console.log(value)
      const {data}=await axios.post(`${backendUrl}/api/admin/set-attributeValue`,{value,attributeName},{
        headers:{
           "token":adminToken
        }
      });
      if(data.success){
        setValue("")
        setAttributeName("")
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
     <div className='w-full flex justify-center items-center'>
        <div className='w-5/6 flex flex-col'>
        <h1 className='font-bold text-2xl ml-4'>Set Attribute Value</h1>
        <div className='w-full m-4 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Attribute Value:</p>
              <input type="text" name="" id="attributeValue" className='border border-gray-300 pl-2 w-70 h-8 rounded' value={value} onChange={(e)=>setValue(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Select Attribute:</p>
             <select name="" id="" value={attributeName} onChange={(e)=>setAttributeName(e.target.value)} className='w-70 h-8 text-gray-700 border border-gray-300 rounded'>
              <option value="">Select attribute</option>
               { attribute.map((atr)=>(
                  <option value={atr._id} key={atr._id}>{atr.name} </option>
                ))
              }
             </select>
            </div>
             <button type='submit'  disabled={!value} onClick={setAttributeValue} className={`bg-blue-600 text-white text-xl rounded w-22 h-9 items-center cursor-pointer  ${!value ? "opacity-50 cursor-not-allowed" : ""}`}>Create</button>
        </div>
        </div>
    </div>
  )
}

export default AttributeValue