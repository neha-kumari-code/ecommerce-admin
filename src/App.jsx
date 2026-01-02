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
const router=createBrowserRouter([
  {
    path:'/',
    element:<div>
      <Login/>
    </div>
  },
   {
    path:'/admin/home',
    element:<div>
      <NavBar/>
      <AdminLayout/>
    </div>
  },
   {
    path:'/admin',
    element:<div>
      <NavBar/>
      <AdminLayout/>
    </div>,
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
      }
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
