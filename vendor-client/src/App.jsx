import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './assets/components/signup'
import LogIn from './assets/components/login'
import HomePage from './assets/components/homepage'
import Update from './assets/components/update'
import Vendors from './assets/components/vendors'
import Create from './assets/components/create'
import Delete from './assets/components/delete'

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage/>
  },
  {
    path:'login',
    element:<LogIn/>
  },
  {
    path:'signup',
    element:<SignUp/>
  },
  {
    path:'vendor/:id/update',
    element: <Update/>
  },
  {
    path:'vendors',
    element:<Vendors/>
  },
  {
    path:'vendor/create',
    element:<Create/>
  },
  {
    path:'vendor/:id/delete',
    element: <Delete/>
  }
])

export default router
