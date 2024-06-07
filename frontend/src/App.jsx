import React from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage.jsx'
import SMS from './components/pages/SMS.jsx'
import FogetPassword from './components/pages/FogetPassword.jsx'
import Home from './components/pages/Home.jsx'
const App = () => {
  const navigate = useNavigate()
  // const getPass = sessionStorage.getItem('pass')
  const getUid = sessionStorage.getItem('uid')
  return (
    <>
      <Routes>
        <Route path='/' exact element={<LoginPage />}></Route>
        {getUid ? (
          <Route path='/home' element={<Home />}></Route>
        ) : (
          navigate('/')
        )}
        <Route path='/forget-password' element={<FogetPassword />}></Route>
      </Routes>
    </>
  )
}

export default App