import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true, // Use the point style for legend items
        padding: 30, // Adjust the padding between legend items
        pointRadius: 2,
      },
    },
    title: {
      display: false,
      text: 'Ct',
    },
  },
  scales: {
    x: {
      display: false, // Hide the X-axis labels
    },
    y: {
      suggestedMin: 0,  // Set the minimum value for the Y-axis
      suggestedMax: 25, // Set the maximum value for the Y-axis
      ticks: {
        stepSize: 5,
        callback: (value: any) => {
          return value === 0 ? value.toFixed(0) : value.toFixed(0) + 'k';
        },
      },
    },
  },
} as any;

export const CurvedLineChart = ({ revenue }: any) => {
  const [chartType, setChartType] = useState('7 Days');
  const [chartDataSet, setChartDataSet] = useState(
    {
      labels:[
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      datasets: [
        {
          label: 'Last 7 Days',
          data: revenue?.last7DaysChart,
          borderColor: 'rgba(255, 99, 132, 0.5)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderDash: [5, 5], // Make the line dashed
          borderWidth: 1, // Adjust the border width
          cubicInterpolationMode: 'monotone',
        },
      ],
    }
  );

  useEffect(() => {

    if (chartType === '7 Days') {
      const labels = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      const data = {
        labels,
        datasets: [
          {
            label: 'Last 7 Days',
            data: revenue?.last7DaysChart,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderDash: [5, 5], // Make the line dashed
            borderWidth: 1, // Adjust the border width
            cubicInterpolationMode: 'monotone',
          },
        ],
      };
      setChartDataSet(data);
    } else {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();

      const labels = Array.from(
        { length: daysInMonth },
        (_, index) => `Day ${index + 1}`
      );

      const data = {
        labels,
        datasets: [
          {
            label: 'This Month',
            data: revenue?.currentMonthChart,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderDash: [5, 5], // Make the line dashed
            borderWidth: 1, // Adjust the border width
            cubicInterpolationMode: 'monotone',
          },
          {
            label: 'last Month',
            data: revenue?.lastMonthChart,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            cubicInterpolationMode: 'monotone',
          },
        ],
      };
      setChartDataSet(data);
    }
  }, [chartType,revenue]);

  return (
    <div className=" space-y-6 bg-white p-5">
      <div className="flex items-center justify-between ">
        <div className="text-xl font-semibold">Analysis</div>
        <div>
          <select onChange={(e) => setChartType(e.target.value)}>
            <option value="7 Days">7 Days</option>
            <option value="Month">Month</option>
          </select>
        </div>
      </div>
      <div className="">
        <Line options={options} data={chartDataSet} className="" />
      </div>
    </div>
  );
};
