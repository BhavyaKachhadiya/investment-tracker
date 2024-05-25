import React from "react";

const HistoryCard = () => {
  return (
    <div>
      <h3 className="font-semibold mb-5">History</h3>

      <div className="main-container h-[3.5rem] w-[50rem] border-[.06rem] rounded-[.63rem] flex justify-between items-center py-[1rem] px-[2rem] ">
        <div className="symobal font-bold">Tata Steel</div>
        <div className="buy-at-price flex gap-2">
          <div className="buy-at-price-label">
            <h4 className="font-semibold">Buy at price: </h4>
          </div>
          <div>
            <p>Rs 50</p>
          </div>
        </div>
        <div className="buy-at-price flex gap-2">
          <div className="buy-at-price-label">
            <h4 className="font-semibold">Quantity: </h4>
          </div>
          <div>
            <p>50</p>
          </div>
        </div>
        <div className="buy-at-price flex gap-2">
          <div className="buy-at-price-label">
            <h4 className="font-semibold">On:</h4>
          </div>
          <div>
            <p>22 05 2024</p>
          </div>
        </div>
        <div className="buy-at-price flex">
          <div className="buy-at-price-label">
            <h4 className="font-semibold">Buy</h4>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
