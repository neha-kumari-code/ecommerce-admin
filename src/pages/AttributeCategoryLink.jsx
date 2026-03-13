import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const AttributeCategoryLink = () => {
  const {adminToken,backendUrl,attribute,category}=useContext(AppContext)
  const [attributeName,setAttributeName]=useState("")
   const [categoryName,setCategoryName]=useState("")
   const categoryAttributeLink=async()=>{
     try {
      const {data}=await axios.post(`${backendUrl}/api/admin/category-attribute-link`,{attributeName,categoryName},{
        headers:{
           "token":adminToken
        }
      })
      if(data.success){
        setAttributeName("")
        setCategoryName("")
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
        <h1 className='font-bold text-2xl ml-4'>Attribute Category Link</h1>
        <div className='w-full m-4 flex flex-col gap-5'>
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
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Select Category:</p>
             <select name="" id="" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} className='w-70 h-8 text-gray-700 border border-gray-300 rounded'>
              <option value="">Select category</option>
               { category.map((cat)=>(
                  <option value={cat._id} key={cat._id}>{cat.name} </option>
                ))
              }
             </select>
            </div>
             <button type='submit' onClick={categoryAttributeLink} className={`bg-blue-600 text-white text-xl rounded w-22 h-9 items-center cursor-pointer`}>Create</button>
        </div>
        </div>
    </div>
  )
}

export default AttributeCategoryLink