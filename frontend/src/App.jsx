import { BrowserRouter as Router, Route, Routes } from 'react-router'
import NavBar from './pages/header/NavBar'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import UserDashboard from './dashboard/user-dashboard/UserDashboard'
import AdminRoute from './route/AdminRoute'
import AdminDashboard from './dashboard/admin-dashboard/pages/AdminDashboard'
import AboutPage from './pages/about/AboutPage'
import ProtectedRoute from './route/ProtectedRoute'
import ShopPage from './pages/shop/ShopPage'
import CartPage from './pages/CartPage'
import ProductPage from './pages/product/ProductPage'
import BikeDetailPage from './pages/bikes/BikeDetailPage'
import TourDetailPage from './pages/tours/TourDetailPage'
import BikePage from './pages/bikes/BikePage'
import TourPage from './pages/tours/TourPage'
import BikeRentalPage from './pages/rentals/BikeRentalPage'

const App = () => {
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/> 
        <Route path='/about' element={<AboutPage/>}/> 
        <Route path='/shop' element={<ShopPage/>}/>
        <Route path='/rentals' element={<BikePage/>}/>
        <Route path='/tours' element={<TourPage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/bikes/:id' element={<BikeDetailPage/>}/>
        <Route path="/rent/:id" element={<BikeRentalPage />} />
        <Route path='/tour/:id' element={<TourDetailPage/>}/>

        {/* ProtectedRoute */}
        <Route path='/' element={<ProtectedRoute/>}>
          <Route path='/user-dashboard' element={<UserDashboard/>}/> 
          <Route path='/cart' element={<CartPage/>}/> 
        </Route>

        {/* Admin Route */}
        <Route path='/admin' element={<AdminRoute/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
        </Route>
      </Routes>
    </Router>
   
    
    
    </>
  )
}

export default App
