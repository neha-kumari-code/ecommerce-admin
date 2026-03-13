import React from 'react'
import { assests } from '../assets/asset'
import {NavLink,Outlet} from 'react-router-dom'
import NavBar from './NavBar'
const AdminLayout = () => {
  return (
    <>
    <NavBar/>
    <div className=' flex h-[calc(100vh-48px)] gap-5 border-r-gray-300  w-screen'>
        {/*------side bar------ */}
        <div className='flex  border-r border-r-gray-200 w-60 justify-end'>
            <div className='w-45 flex flex-col gap-3'>
        <div className='flex gap-2 border  border-gray-300 h-7 items-center  w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.plusCircle} alt="" />
            <NavLink to='/admin/create-category'>Create Category</NavLink>
        </div>
        <div className='flex gap-2 border  border-gray-300 h-7 items-center  w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.plusCircle} alt="" />
            <NavLink to='/admin/create-attribute'>Create Attribute</NavLink>
        </div>
        <div className='flex gap-2 border  border-gray-300 h-7 items-center  w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.plusCircle} alt="" />
            <NavLink to='/admin/create-attributeValue'>set Attribute Value</NavLink>
        </div>
        <div className='flex gap-2 border  border-gray-300 h-7 items-center  w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.plusCircle} alt="" />
            <NavLink to='/admin/create-attributeCategoryLink'> Category-Attribute</NavLink>
        </div>
        <div className='flex gap-2 border  border-gray-300 h-7 items-center  w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.plusCircle} alt="" />
            <NavLink to='/admin/addItem'>Add Items</NavLink>
        </div>
        <div className='flex gap-2 border border-gray-300 h-7 items-center w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.listIcon} alt="" />
            <NavLink to='/admin/listItem'>List Items</NavLink>
        </div> 
        <div className='flex gap-2 border border-gray-300 h-7 items-center w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.listIcon} alt="" />
            <NavLink to='/admin/add-product'>Add Product</NavLink>
        </div> 
        <div className='flex gap-2 border border-gray-300 h-7 items-center w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.orderIcon} alt="" />
            <NavLink to='/admin/order'>Orders</NavLink>
        </div>
            </div>
        </div>
        {/*-------right side content----- */}
        <div className='flex-1 p-2'>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default AdminLayout