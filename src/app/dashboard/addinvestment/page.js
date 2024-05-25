import InvestmentForm from '@/app/components/InvestmentForm'
import Navbar from '@/app/components/Navbar'

import React from 'react'


const AddInvestmentPage = () => {
  return (
    <>
      <Navbar/>
      <div className="add-investment">
        <h3 className='font-semibold text-[2rem]'>Add Investment</h3>
      </div>
      <InvestmentForm/>
        
    </>
  )
}

export default AddInvestmentPage