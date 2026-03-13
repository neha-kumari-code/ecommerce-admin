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
  
  useEffect(()=>{
    getAllItem()
  })
  return (
    <div>
      <h2>All Product List</h2>
      {/*------all product----- */}
      <div>
      {
        allItem.map(it=>(
          <div key={it._id}>
            {it.variants[0].images[0]}
            <img src={it.variants[0].images[0]} alt="" />
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default ListItem