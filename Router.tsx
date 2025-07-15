import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './src/App'
import BattlePage from './src/components/Battle';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/battle' element={<BattlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
