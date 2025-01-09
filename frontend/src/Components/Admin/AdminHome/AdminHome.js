import React from 'react'
import Navbar from './Navbar/Navbar'
import Adminbody from './AdminBody/Adminbody'
import './AdminHome.css'
import Footer from './Footer/Footer'


function AdminHome() {
  
  
  return (
    <div>
      <div className=''>
        <Navbar/>
        </div>
        <div>
          <Adminbody/>
          </div>
        <div>
          <Footer/>
        </div>
    </div>
  )


}

export default AdminHome
