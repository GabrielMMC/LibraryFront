import React from 'react'
import Navbar from './Navbar'

const Container = ({ children }) => {
 return (
  <div className="vh-100 bg-light">
   <Navbar />
   {children}
  </div>
 )
}

export default Container