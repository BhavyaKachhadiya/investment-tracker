import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import Charts from '@/app/components/Charts'
import React from 'react'

const dataInvestType = {

  labels: ['Stock','ETF','Bonds','Mutual Fund','Crytocurrency','Real estate','Other'],
  datasets: [
    {
     
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

const optionsInvestType = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Doughnut Chart Example',
    },
  },
};
const dataCaps = {

  labels: ['Large','Mid','Small'],
  datasets: [
    {
      
      data: [12, 19,34],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

const optionsCaps = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Doughnut Chart Example',
    },
  },
};

const Chartspage = () => {
  return (
    <>
      <Navbar/>
      <div className="main-container grid grid-cols-4 ">
            <Sidebar/>
    
            <div className="semi-container row-span-3 grid grid-cols-2  gap-x-[30rem]">
            <Charts chartType="Invest Type" data={dataInvestType} options={optionsInvestType}  height={40} width={40} />
            <Charts chartType="Caps" data={dataCaps} options={optionsCaps}  height={40} width={40} />
            <Charts chartType="Invest Type" data={dataInvestType} options={optionsInvestType}  height={40} width={40} />
            <Charts chartType="Caps" data={dataCaps} options={optionsCaps}  height={40} width={40} />

            </div>
        </div>
    </>
  )
}

export default Chartspage