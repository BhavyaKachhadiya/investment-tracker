"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvestmentCard = () => {
  const [investments, setInvestments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/investments/stocks');
        console.log('API response:', response.data);

        // Check if response.data is an object and transform it into an array
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
          const transformedData = Object.keys(response.data).map(key => ({
            symbol: key,
            ...response.data[key]
          }));
          console.log('Transformed data:', transformedData);
          setInvestments(transformedData);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching investment:', error.message);
        setError('Error fetching investment');
      }
    };

    fetchInvestments();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="top flex justify-between"></div>
      <div className="main-container mb-10 w-[55rem] py-[1rem] grid grid-cols-2 px-[1rem]">
        {Array.isArray(investments) && investments.length > 0 ? investments.slice(0,2).map((investment, index) => (
          <div key={index} className="semi-containter border-[.06rem] rounded-[1rem] w-[20rem] h-[15rem] mb-4">
            <h4 className="symbol p-4">{investment.symbol}</h4>
            <div className="symbol-info px-4 grid grid-cols-2 grid-rows-2 gap-[2rem]">
              <div className="total-investment">
                <h4 className='font-semibold'>Total Investment</h4>
                <p>Rs {investment.totalPurchasePriceInTotal}</p>
              </div>
              <div className="buy-at-price">
                <h4 className='font-semibold'>Buy at price</h4>
                <p>Rs {investment.totalPurchasePrice}</p>
              </div>
              <div className="quantity">
                <h4 className='font-semibold'>Quantity</h4>
                <p>{investment.totalQuantity}</p>
              </div>
              <div className="avg">
                <h4 className='font-semibold'>Avg</h4>
                <p>Rs {(investment.totalPurchasePriceInTotal / investment.totalQuantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )) : (
          <p>No investments found</p>
        )}
      </div>
    </>
  );
};

export default InvestmentCard;
