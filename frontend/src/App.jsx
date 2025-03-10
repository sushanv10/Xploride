import { BrowserRouter as Router, Route, Routes } from 'react-router'
import NavBar from './pages/header/NavBar'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import UserDahboard from './dashboard/user-dashboard/UserDahboard'

const App = () => {
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/> 
        <Route path='/profile' element={<UserDahboard/>}/> 
      </Routes>
    </Router>
   
    
    
    </>
  )
}

export default App
