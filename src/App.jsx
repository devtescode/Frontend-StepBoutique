import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/landingpage/Landing'
import Notfound from './components/Notfound-page/Notfound'
import Signup from './components/Signup-page/Signup'
import Login from './components/Login-page/Login'
import Dashboard from './components/Dashboard-page/Dashboard'
import Navbar from './components/Navbar-page/Navbar'
import Adminlogin from './components/Admin-folder/adminlogin'
import Admindashboard from './components/Admin-folder/Admindashboard'
import Adminupload from './components/Admin-folder/Adminupload'
import Userproduct from './components/Product-page/Userproduct'
import Adminprotected from './components/Admin-folder/AdminProtectedpage/Adminprotected'
import Adminviewupload from './components/Admin-folder/Adminviewuploadpage/Adminviewupload'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/db' element={<Dashboard />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/adminlogin' element={<Adminlogin />} />
        <Route element={<Adminprotected/>}>
          <Route path='/admindb' element={<Admindashboard />} />
          <Route path='/adupload' element={<Adminupload />} />
          <Route path='/adviewupload' element={<Adminviewupload/>}/>
        </Route>

        <Route path='/userproduct' element={<Userproduct />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
