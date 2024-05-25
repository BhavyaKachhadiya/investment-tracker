import React from 'react'
import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import HistoryCard from '@/app/components/HistoryCard'

const Dashboardpage = () => {
  return (
    <div>
        <Navbar/>
        <div className="main-container w-screen flex gap-10">
            <Sidebar/>
            <HistoryCard/>
            
        </div>
    </div>
  )
}

export default Dashboardpage