import { BrowserRouter as Router, Route, Routes } from 'react-router'
import NavBar from './pages/header/NavBar'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
// import Footer from './pages/footer/Footer'


const App = () => {
  return (
    <>
    <Router>
      <NavBar/>
      {/* <Footer/> */}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/> 
      </Routes>
    </Router>
    
    
    
    </>
  )
}

export default App
