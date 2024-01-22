import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { createBrowserRouter } from 'react-router-dom'
import SignUp from './assets/components/signup'
import LogIn from './assets/components/login'
import HomePage from './assets/components/homepage'
import Update from './assets/components/update'
import Vendors from './assets/components/vendors'
import Create from './assets/components/create'
import Delete from './assets/components/delete'

function App() {
  const apiUrl = import.meta.env.VITE_URL;
  const [user, setUser]= useState(null);

  const getUser = async() => {
    try {
      const url = `${apiUrl}auth/login/success`;
      const {data} = await axios.get(url, {withCredentials:true})
      console.log(data.user)
      setUser(data.user)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUser();
  },[]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path='/' 
            element={user ? <HomePage user={user}/> : <Navigate to='/login'/> }       
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LogIn />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route path="/vendor/:id/update" element={<Update />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendor/create" element={<Create />} />
          <Route path="/vendor/:id/delete" element={<Delete />} />
        </Routes>
      </div>
      </BrowserRouter>
  )
}

export default App;
