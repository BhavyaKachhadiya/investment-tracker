"use client";
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
const InvestmentForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    nameSymbol: '',
    investmentType: 'Stock',
    StockType: 'Large',
    purchasePrice: '',
    quantity: '',
    buyDate: `${new Date().toISOString()}`,
    buySell: 'Buy',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  
    try {
      const response = await axios.post("/api/investments",{formData: formData,user_email: session?.user?.email, username: session.user.name})
      if (!response.ok) {
        throw new Error('Failed to add investment');
      }
  
      console.log('Investment added successfully');
      
    } catch (error) {
      console.error('Error adding investment:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-transparent shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="nameSymbol" className="block text-white font-bold mb-2">Name/Symbol:</label>
        <input
          type="text"
          id="nameSymbol"
          name="nameSymbol"
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.nameSymbol}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="StockType" className="block text-white font-bold mb-2">Type of Stock:</label>
        <select
          id="StockType"
          name="StockType"
          value={formData.StockType}
          onChange={handleChange}
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Large">Large</option>
          <option value="Mid">Mid</option>
          <option value="Small">Small</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="investmentType" className="block text-white font-bold mb-2">Type of Investment:</label>
        <select
          id="investmentType"
          name="investmentType"
          value={formData.investmentType}
          onChange={handleChange}
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Stock">Stock</option>
          <option value="ETF">ETF</option>
          <option value="Bonds">Bonds</option>
          <option value="Mutual Funds">Mutual Funds</option>
          <option value="Cryptocurrency">Cryptocurrency</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="purchasePrice" className="block text-white font-bold mb-2">Purchase Price:</label>
        <input
          type="number"
          id="purchasePrice"
          name="purchasePrice"
          value={formData.purchasePrice}
          onChange={handleChange}
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-white font-bold mb-2">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="buyDate" className="block text-white font-bold mb-2">When Buy:</label>
        <input
          type="date"
          id="buyDate"
          name="buyDate"
          value={formData.buyDate || new Date().toISOString().substr(0, 10)}
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="buySell" className="block text-white font-bold mb-2">Buy or Sell:</label>
        <select
          id="buySell"
          name="buySell"
          value={formData.buySell}
          onChange={handleChange}
          className="w-full p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200">Submit</button>
    </form>
  );
};

export default InvestmentForm;
