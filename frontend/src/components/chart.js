// ./components/BarChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    const labels = ["R21212", "R0015121", "R512005", "R65151"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Grade 1",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [71, 41, 65, 98],
        },
        {
            label: "Grade 2",
            backgroundColor: "blue",
            borderColor: "rgb(255, 99, 132)",
            data: [82, 52, 68, 68],
          },
      ],
    };
  return (
    <div>
      <Bar data={data} options={{ maintainAspectRatio: false }}/>
    </div>
  );
};

export default BarChart;