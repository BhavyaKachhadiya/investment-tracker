"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryCard = () => {
  const [investments, setInvestments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/investments');
        setInvestments(response.data.investment.investments.reverse()); // Update state with investments array
        console.log('Investment fetched successfully');
      } catch (error) {
        console.error('Error fetching investment:', error.message);
        setError('Failed to fetch investments');
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div>
      <h3 className="font-semibold mb-5">History</h3>

      {investments.map((investment, index) => (
        <div key={index} className="main-container h-[3.5rem] w-[50rem] border-[.06rem] rounded-[.63rem] grid grid-cols-5 place-items-center items-center py-[1rem] px-[2rem] mb-[2rem]">
          <div className="symobal font-bold">{investment.symbol}</div>
          <div className="buy-at-price flex gap-2">
            <div className="buy-at-price-label">
              <h4 className="font-semibold">Buy at price: </h4>
            </div>
            <div>
              <p>{investment.purchasePrice}</p>
            </div>
          </div>
          <div className="buy-at-price flex gap-2">
            <div className="buy-at-price-label">
              <h4 className="font-semibold">Quantity: </h4>
            </div>
            <div>
              <p>{investment.quantity}</p>
            </div>
          </div>
          <div className="buy-at-price flex gap-2">
            <div className="buy-at-price-label">
              <h4 className="font-semibold">On:</h4>
            </div>
            <div>
              <p>{investment.dateAcquired.substring(0, 10)}</p>
            </div>
          </div>
          <div className="buy-at-price flex">
            <div className="buy-at-price-label">
              <h4 className="font-semibold">Buy</h4>
            </div>
            {/* Add button or action for Buy */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
