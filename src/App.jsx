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
import SearchBar from "./components/SearchBar/SearchBar"
import Footer from "./components/Footer/Footer"
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
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
