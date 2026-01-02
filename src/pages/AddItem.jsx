import React from 'react'
import CreatableSelect from "react-select/creatable"
const AddItem = () => {
  return (
    <div className=' flex flex-col gap-4'>
        {/*-----upload images---- */}
        <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Upload Images</p>
            <div className='flex gap-2'>
                <input type="image" src="" alt="" className='border w-25 h-18'/>
                <input type="image" src="" alt="" className='border w-25 h-18'/>
                <input type="image" src="" alt="" className='border w-25 h-18'/>
                <input type="image" src="" alt="" className='border w-25 h-18'/>
            </div>
        </div>
        {/*----- */}
        <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Product Name</p>
            <input type="text" name="" id="" placeholder='write name here' className='border border-gray-400 w-90 h-8 p-2 rounded' />
        </div>
       <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Product Description</p>
            <textarea className='w-90 h-16 border border-gray-400 rounded p-2' name="" id="" placeholder='write description here'></textarea>
        </div>
        {/*----category and size---- */}
        <div className='flex flex-col gap-3'>
            <div className='flex gap-6  items-center'>
                <p className='font-semibold'>Product Category:</p>
                 <CreatableSelect  placeholder="Select or create category..."/>
            </div>
            <div className='flex gap-6  items-center'>
                <p className='font-semibold'>Product subCategory:</p>
                <CreatableSelect  placeholder="Select or create category..."/>
            </div>
            <div className='flex gap-6  items-center'>
                <p className='font-semibold'>Product type:</p>
                <CreatableSelect  placeholder="Select or create subCategory..."/>
            </div>
        </div>
        {/*----product price--- */}
        <div className='flex gap-3'>
            <p className='font-semibold'>Product Price:</p>
            <input type="number" name="price" id="" className='border border-gray-400 w-30 h-8 p-2 rounded' />
        </div>
        {/*-----product size available--- */}
        <div></div>
        <div></div>
    </div>
  )
}

export default AddItem