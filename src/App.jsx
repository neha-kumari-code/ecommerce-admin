import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar'
import AdminLayout from './components/AdminLayout'
import AddItem from './pages/AddItem'
import ListItem from './pages/ListItem'
import Orders from './pages/Orders'
import CreateCategory from './pages/CreateCategory'
import CreateAttribute from './pages/CreateAttribute'
import AttributeValue from './pages/AttributeValue'
import AttributeCategoryLink from './pages/AttributeCategoryLink'
import AddProduct from './pages/AddProduct'
const router=createBrowserRouter([
  {
    path:'/',
    element:<div>
      <Login/>
    </div>
  },
  
   {
    path:'/admin',
    element:<AdminLayout/>,
    children:[
      {
        path:"addItem",
        element:<AddItem/>
      },
      {
        path:"listItem",
        element:<ListItem/>
      },
      {
        path:"order",
        element:<Orders/>
      },
      {
        path:"create-category",
        element:<CreateCategory/>
      },
       {
        path:"create-attribute",
        element:<CreateAttribute/>
      },
       {
        path:"create-attributeValue",
        element:<AttributeValue/>
      },
       {
        path:"create-attributeCategoryLink",
        element:<AttributeCategoryLink/>
      },
       {
        path:"add-product",
        element:<AddProduct/>
      },
    ]
  }
])
function App() {

  return (
   <div>
    <ToastContainer/>
    <RouterProvider router={router}/>
   </div>
  )
}

export default App
