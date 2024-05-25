import React from 'react'

const InvestmentCard = ({Symbol,TotalInvestment,BuyAtPrice,Quantity,Avg}) => {
  return (
    <>
    <div className="top flex justify-between">
    
    </div>
        <div className="main-container  mb-10 w-[55rem] py-[1rem] px-[1rem]  ">
            <div className="semi-containter border-[.06rem] rounded-[1rem] w-[20rem]  h-[15rem]">
                <h4 className="symobal p-4">{Symbol}</h4>
                <div className="symobal-info px-4 grid grid-cols-2 grid-rows-2 gap-[2rem]">
                    <div className="total-investment">
                        <h4 className='font-semibold'>Total Investment</h4>
                        <p>Rs {TotalInvestment}</p>
                    </div>
                    <div className="Buy-at-price">
                        <h4 className='font-semibold'>Buy at price</h4>
                        <p>Rs {BuyAtPrice}</p>
                    </div>
                    <div className="Quitly">
                        <h4 className='font-semibold'>Quantity</h4>
                        <p>{Quantity}</p>
                    </div>
                    <div className="Avg">
                        <h4 className='font-semibold'>Avg</h4>
                        <p>Rs {Avg}</p>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default InvestmentCard