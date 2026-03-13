import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
export const AppContext=createContext()
const AppContextProvider = (props) => {
    const [adminToken,setAdminToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [category,setCategory]=useState([])
     const getAllCategory=async()=>{
        try {
          const {data}=await axios.get(`${backendUrl}/api/admin/get-category`,{
            headers:{
              "token":adminToken
            }
          })
          if(data.success){
            setCategory(data.categories)
          }else{
            console.log(data.message)
          }
        } catch (error) {
           console.log(error)
        }
      }

      const [attribute,setAttribute]=useState([])
      const getAllAttribute=async()=>{
        try {
          const {data}=await axios.get(`${backendUrl}/api/admin/get-attribute`,{
            headers:{
              token:adminToken
            }
          });
          if(data.success){
            setAttribute(data.attributes)
          }else{
            console.log(data.message)
          }
        } catch (error) {
          console.log(error)
        }
      }
      const [product,setProduct]=useState([])
      const getAllProduct=async()=>{
        try {
          const {data}=await axios.get(`${backendUrl}/api/admin/get-product`,{
            headers:{
              "token":adminToken
            }
          })
          if(data.success)setProduct(data.products);
          else console.log(data.message)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
        getAllProduct()
      },[product])
      useEffect(()=>{
        getAllCategory()
      },[category])
      useEffect(()=>{
        getAllAttribute()
      },[attribute])

    const value={
        adminToken,
        setAdminToken,
        backendUrl,
        category,
        getAllCategory,
        getAllAttribute,
        attribute,
        getAllProduct,
        product
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider