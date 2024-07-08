import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile'
import { ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer /> {/* Toastify container */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
      <footer className="bg-gray-200 text-center py-4 absolute  w-full">
        <Footer />
      </footer>


    </BrowserRouter>

  )
}

export default App
