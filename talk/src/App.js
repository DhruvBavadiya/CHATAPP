import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import SetAvatar from './Pages/SetAvatar';
import Signup from './Pages/Signup';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/setAvatar' element={<SetAvatar />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
