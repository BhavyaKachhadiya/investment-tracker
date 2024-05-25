"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ chartType,data, options, height, width }) => {
  return (
    <>
      <div>
       
        <div className="h-[20rem] w-[25rem] border-[.06rem] flex-col rounded-[3rem] flex justify-center items-center py-[3rem] px-[2rem]">
          <h2 className="title font-semibold">{chartType}</h2>
          <Pie data={data} options={options} height={height} width={width} />
        </div>
      </div>
    </>
  );
};

export default Charts;
