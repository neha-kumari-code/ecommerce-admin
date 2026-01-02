import React from 'react'
import { assests } from '../assets/asset'
import {NavLink,Outlet} from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div className=' flex h-screen gap-5 border-r-gray-300  w-screen'>
        {/*------side bar------ */}
        <div className='flex  border-r border-r-gray-200 w-60 justify-end'>
            <div className='w-45 flex flex-col gap-3'>

        <div className='flex gap-2 border  border-gray-300 h-7 items-center  w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.plusCircle} alt="" />
            <NavLink to='/admin/addItem'>Add Items</NavLink>
        </div>
        <div className='flex gap-2 border border-gray-300 h-7 items-center w-full p-1 cursor-pointer'>
            <img className='w-4' src={assests.listIcon} alt="" />
            <NavLink to='/admin/listItem'>List Items</NavLink>
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
  )
}

export default AdminLayout