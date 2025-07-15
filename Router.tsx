import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './src/App'
import BattlePage from './src/components/Battle';
import Start from './src/components/start/index'
import Login from './src/components/login/index'
import SignUp from './src/components/signup/index'
import Charactor from './src/components/charactor/index'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/battle' element={<BattlePage />} />
        <Route path='/start' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/charactor' element={<Charactor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
