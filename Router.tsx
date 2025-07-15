import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './src/components/main/index'
import BattlePage from './src/components/Battle';
import Start from './src/components/start/index'
import Login from './src/components/login/index'
import SignUp from './src/components/signup/index'
import Charactor from './src/components/charactor/index'
import Collection from './src/components/Collection/index'
import Ai from './src/page/ai/TrashAIPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/battle' element={<BattlePage />} />
        <Route path='/camera' element={<Ai />} />
        <Route path='/start' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/charactor' element={<Charactor />} />
        <Route path='/collection' element={<Collection />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router
