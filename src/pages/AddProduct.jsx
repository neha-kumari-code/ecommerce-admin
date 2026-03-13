import React from 'react'
import { AppContext } from '../context/AppContext'
import { useState,useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddProduct = () => {
    const {adminToken,backendUrl,category,getAllProduct}=useContext(AppContext)
    const [productName,setProductName]=useState("")
    const [categoryName,setCategoryName]=useState("")
    const [description,setDescription]=useState("")
    const addProduct=async()=>{
        try {
      const {data}=await axios.post(`${backendUrl}/api/admin/add-product`,{name:productName,category:categoryName,description},{
        headers:{
           "token":adminToken
        }
      })
      if(data.success){
        getAllProduct()
        setProductName("")
        setCategoryName("")
        setDescription("")
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
        <div className=' flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Product Name:</p>
            <input type="text" name="" id="product" value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='write name here' className='border border-gray-400 w-90 h-8 p-2 rounded' />
        </div>
       <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Product Description</p>
            <textarea className='w-90 h-16 border border-gray-400 rounded p-2' name="" id="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='write description here'></textarea>
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
         <button type='submit' onClick={addProduct} className={`bg-blue-600 text-white text-xl rounded w-30 h-10 items-center cursor-pointer`}>Add Product</button>

    </div>
  )
}

export default AddProduct