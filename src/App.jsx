import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Navbar from "./components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import { Routes, Route } from 'react-router-dom'
import Collections from "./Pages/Collections/Collections"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import Product from "./Pages/Product/Product"
import Cart from "./Pages/Cart/Cart"
import Login from "./Pages/Login/Login"
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder"
import Orders from "./Pages/Orders/Orders"
import VerifyPayment from "./Pages/VerifyPayment/VerifyPayment"
import SearchBar from "./components/SearchBar/SearchBar"
import Footer from "./components/Footer/Footer"
import ProtectedRoutes from './components/ProtectedRoutes'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"


function App() {

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/verify" element={<VerifyPayment />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
