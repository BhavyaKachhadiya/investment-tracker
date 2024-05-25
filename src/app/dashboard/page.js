import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MainDashboard from '../components/MainDashboard'

const Dashboardpage = () => {
  return (
    <div>
        <Navbar/>
        <div className="main-container w-screen flex gap-10">
            <Sidebar/>
            <MainDashboard/>
            
        </div>
    </div>
  )
}

export default Dashboardpage