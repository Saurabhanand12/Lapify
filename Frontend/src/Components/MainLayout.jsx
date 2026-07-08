import React from 'react'
import Navbar from '../Pages/Navbar.jsx'
import Home from '../Pages/Home.jsx'
import Footer from '../Pages/Footer.jsx'
import { Toaster } from 'sonner'

const MainLayout = () => {
  return (
    <div >
      <Toaster position="top-right" richColors />
        <Navbar/>
        <Home />
        <Footer/>
    </div>
  )
}

export default MainLayout
