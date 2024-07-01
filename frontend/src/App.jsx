import React from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const App = () => {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/signup' exact element={<Signup />} />


        </Routes>

     
    </BrowserRouter>
  )
}

export default App
