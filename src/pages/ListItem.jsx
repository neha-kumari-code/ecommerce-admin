import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
const ListItem = () => {
  const {backendUrl,adminToken}=useContext(AppContext)
  const [allItem,setAllItem]=useState([])
  const getAllItem=async()=>{
    try {
      const {data}=await axios.get(`${backendUrl}/api/admin/list-item`,{
        headers:{
          token:adminToken
        }
      })
      if(data.success){
        setAllItem(data.allProducts)
      }else{
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(allItem)
  useEffect(()=>{
    getAllItem()
  },[])
  return (
    <div className="p-4">
       <h2 className="text-2xl font-bold mb-4">All Product List</h2>
      {/*------all product----- */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        allItem.map(it=>(
          <div key={it._id} className="border rounded-xl shadow-md p-4 bg-white">
            <div className="mb-3">
              <p className="text-lg font-semibold">Name:{it.name}</p>
              <p className="text-gray-500 text-sm">Category:{it.category?.name}</p>
            </div>
            {/*---variants--- */}
            <div className="space-y-4">
            {
              it.variants?.map((v,i)=>(
              <div key={v._id} className="border rounded-lg p-3 flex flex-col sm:flex-row gap-3">
              <img src={v.images[0]} alt="" className="w-full sm:w-28 h-28 object-cover rounded-md" />
              {/*----details--- */}
              <div className="flex-1">
              {/*----attributes---- */}
              <div className="flex flex-wrap gap-2 mb-2">
              {
                v.attributes?.map((a,id)=>(
                  <span key={a._id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {a.attribute?.name}:{a.value?.value}
                  </span>
                ))
              }
              </div>
              {/*---price stock status */}
              <p className="font-semibold text-green-600">₹{v.price}</p>
              <p className="text-sm text-gray-500">stock:{v.stock}</p>
              <p className={`text-xs mt-1 ${v.status === "active"? "text-green-500": "text-red-500"}`}>{v.status}</p>
              </div>
              </div>
              ))
            }
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default ListItem