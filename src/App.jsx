import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/landingpage/Landing'
import Notfound from './components/Notfound-page/Notfound'
import Signup from './components/Signup-page/Signup'
import Login from './components/Login-page/Login'
import Dashboard from './components/Dashboard-page/Dashboard'
import Loader from './components/Loader-page/Loader'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/db' element={<Dashboard/>}/>
        <Route path='/load' element={<Loader/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </>
  )
}

export default App
