import { useRef, useEffect, useState } from "react";


import { Pie } from "react-chartjs-2";
import { Chart, Title, Tooltip, Legend } from "chart.js/auto";

Chart.register(Title, Tooltip, Legend);

export const PieChart = ({ title, labels, data, background }) => {

  const [chartData, setChartData] = useState({ datasets: [] });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: background,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            font: {
              size: 12, // Adjust the legend font size here
            },
            boxWidth: 20, // Adjust the size of the legend boxes here
            padding: 10, // Adjust the padding of the legend boxes here
          },
        },
        title: {
        //   display: false,
          text: "Sales by gender",
        },
      },
    });
  }, []);

  const ref = useRef();

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white p-5">
      {/* <div className="text-lg font-semibold">{title}</div> */}
      <Pie options={chartOptions} ref={ref} data={chartData} />
    </div>
  );
};
