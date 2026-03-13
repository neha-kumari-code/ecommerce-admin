import React, { useContext, useState } from 'react'
import CreatableSelect from "react-select/creatable"
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const CreateCategory = () => {
  const  {adminToken,backendUrl,category,getAllCategory}=useContext(AppContext)
  const [categoryName,setCategoryName]=useState("")
  const [parent,setParent]=useState("")
  const [statusValue,setStatusValue]=useState("")
  const createCategory=async()=>{
    try {
      const {data}=await axios.post(`${backendUrl}/api/admin/create-category`,{categoryName,parent,statusValue},{
        headers:{
          "token":adminToken
        }
      })
      if(data.success){
         await getAllCategory()
        setCategoryName("");
        setStatusValue("");
        setParent("");
        return toast.success(data.message)
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
        <h1 className='font-bold text-2xl ml-4'>Create Category</h1>
        <div className='w-full m-4 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Category Name:</p>
              <input type="text" name="" id="category" className='border border-gray-300 pl-2 w-70 h-8 rounded' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)}/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Parent Name(optional):</p>
             <select name="" id="" value={parent} onChange={(e)=>setParent(e.target.value)} className='w-70 h-8 text-gray-700 border border-gray-300 rounded'>
              <option value="">choose parent</option>
               { category.map((cat)=>(
                  <option value={cat._id} key={cat._id}>{cat.name} </option>
                ))
              }
             </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>Category Status:</p>
              <select name="" id="" value={statusValue} onChange={(e)=>setStatusValue(e.target.value)} className='border border-gray-300 w-38 h-8 rounded text-gray-500'>
                <option value="">select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
             <button type='submit'  disabled={!categoryName} onClick={createCategory} className={`bg-blue-600 text-white text-xl rounded w-22 h-9 items-center cursor-pointer  ${!categoryName ? "opacity-50 cursor-not-allowed" : ""}`}>Create</button>
        </div>
        </div>
    </div>
  )
}

export default CreateCategory