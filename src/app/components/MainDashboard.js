"use client"
import Link from "next/link";
import InfoMainCard from "./InfoMainCard";
import InvestmentCard from "./InvestmentCard";
import { useEffect, useState } from "react";
import axios from "axios";

const MainDashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [investmentsAll, setInvestmentsAll] = useState([]);
  const [investmentsCaps, setInvestmentsCaps] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/investments');
        setInvestments(response.data.investment); // Update state with investments array
      } catch (error) {
        console.error('Error fetching investment:', error.message);
      }
    };

    fetchInvestments();
  }, []);
  useEffect(() => {
    const fetchInvestmentsAll = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/investments/cal');
        setInvestmentsAll(response.data); // Update state with investments array
      } catch (error) {
        console.error('Error fetching investment:', error.message);
      }
    };

    fetchInvestmentsAll();
  }, []);
  useEffect(() => {
    const fetchInvestmentsCaps = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/investments/caps');
        setInvestmentsCaps(response.data); // Update state with investments array
      } catch (error) {
        console.error('Error fetching investment:', error.message);
      }
    };

    fetchInvestmentsCaps();
  }, []);

 const left_investment= investments.investmentgoal-investmentsAll;

  return (
    <>
      <div className="main-container">
        <div className="flex justify-end">
        <Link href={"/dashboard/addinvestment"} className="font-semibold py-[.5rem] px-[.5rem] bg-[#5C6470] border-0 rounded-xl">Add Investment</Link>

        </div>
        <h3 className="font-semibold mb-[2rem]">Dashboard</h3>
        <InfoMainCard
          firstlabel="Investment Goal"
          firstvalue={investments?.investmentgoal}
          secondlabel="Current Investment"
          secondvalue={investmentsAll}
          thirdlabel="Investment to Acheive Goal"
          thirdvalue={left_investment}
        />
        <InfoMainCard
          firstlabel="Large cap"
          firstvalue={investmentsCaps?.Large?.totalPurchasePriceInTotal}
          secondlabel="Mid cap"
          secondvalue={investmentsCaps?.Mid?.totalPurchasePriceInTotal||0}
          thirdlabel="Small cap"
          thirdvalue={investmentsCaps?.Small?.totalPurchasePriceInTotal||0}
        />
        <div className="flex justify-between">
          <h3 className="investtype font-semibold">Stock</h3>
          <h3 className="see-all">See All</h3>
        </div>
        <InvestmentCard
          InvestType="Stock"
         
        />
      </div>
    </>
  );
};

export default MainDashboard;
