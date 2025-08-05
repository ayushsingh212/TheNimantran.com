import { Outlet } from "react-router-dom";





import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

const Temp = () => {
  return (
    <div>
       <Header/>
       <Outlet/>
       <Footer/>
    </div>
  )
}

export default Temp
