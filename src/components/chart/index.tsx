import { useRef, useEffect, useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Days, Months, Weeks, Hours } from './data';
import { ASSETS } from '../../images/path';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const [durations, setDurations] = useState(Days);
  const [filterActive, setFilterActive] = useState('12 months');

  useEffect(() => {
    filterActive == '7 Days' && setDurations(Days);

    filterActive == '1 Month' && setDurations(Weeks);

    filterActive == '24 Hours' && setDurations(Hours);

    filterActive == '1 Year' && setDurations(Months);
  }, [filterActive]);

  const [chartData, setChartData] = useState<any>({ datasets: [] });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: durations.map((data: any) => data),
      datasets: [
        {
          borderRadius: 0,
          barPercentage: 0,
          barThickness: 20,
          maxBarThickness: 20,
          minBarLength: 10,
          backgroundColor: '#D1E50C',
          borderColor: 'rgba(0,0,0,0.2)',
          data:
            filterActive === '1 Year'
              ? [15, 20, 25, 40, 23, 60, 70, 64, 20, 30, 40, 50]
              : filterActive === '7 Days'
              ? [15, 20, 25, 40, 23, 60, 70]
              : filterActive === '1 Month'
              ? [
                  15, 20, 25, 40, 23, 60, 70, 64, 20, 30, 40, 50, 15, 20, 25,
                  40, 23, 60, 70, 64, 20, 30, 40, 50, 70, 64, 20, 30, 40, 50,
                ]
              : [
                  15, 20, 25, 40, 23, 60, 70, 64, 20, 30, 40, 50, 15, 20, 25,
                  40, 23, 60, 70, 64, 20, 30, 40, 50,
                ],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return ''; // Return an empty string to hide the default label
            },
            afterLabel: function (context) {
              const datasetIndex = context.datasetIndex;
              const sales =
                chartData.datasets[datasetIndex].data[context.dataIndex];
              // const profits = getProfitsForIndex(context.dataIndex); // Replace this with your logic to get profits for the index
              
              const salesLabel = `Sales: ${sales}`;
              const profitsLabel = `Profits: 5`; // Replace this with your actual profits value
        
              return salesLabel + '\n' + profitsLabel;
            },
          },
          displayColors: false, // Hide the color box next to the label
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Set background color for the tooltip
          titleFontColor: '#BF360C', // Set font color for the title (if you have one)
          bodyFontColor: '#333', // Set font color for the body of the tooltip
          bodyAlign: 'left', // Align the text to the left
          padding: 10, // Add padding to the tooltip content
          cornerRadius: 5, // Optional: Add border radius to the tooltip
        },
        
        
        grouped: true,
        legend: {
          display: false,
          // position: 'bottom',
        },
        title: {
          display: false,
          text: 'Activity',
          // style: {
          //     textDecorationStyle: 'wavy',
          // },
        },
      },

      scales: {
        x: {
          position: 'bottom',
          grid: {
            drawBorder: false,
            offset: false,
            color: '#49494E',
            display: false,
            // display: false,
            // drawOnChartArea: true
          },
          //     labels: ['Great', 'Good', 'OK', 'Poor', 'Bad'],
        },
        y: {
          display: false,
          grid: {
            drawBorder: false,
            display: false,
            offset: false,
          },
          // max: 100,
          // labels: ['Great', 'Good', 'OK', 'Poor', 'Bad'],
        },
      },
    });
  }, [durations]);

  const ref = useRef();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h1 className="text-normal font-semibold text-black-primary md:text-xl lg:text-2xl xl:text-4xl">
          $28,078.50
        </h1>

        <div className="flex h-8 items-center space-x-6  border-b border-gray-normal text-xs font-medium md:text-sm">
          <div
            onClick={() => setFilterActive('1 Year')}
            className={`cursor-pointer ${
              filterActive === '1 Year'
                ? 'mt-0.5 h-full border-b-2 border-black-primary font-semibold'
                : 'mt-0.5 h-full border-b-2 border-transparent'
            }`}
          >
            12 months
          </div>
          <div
            onClick={() => setFilterActive('1 Month')}
            className={`cursor-pointer ${
              filterActive === '1 Month'
                ? 'mt-0.5 h-full border-b-2 border-black-primary'
                : 'mt-0.5 h-full border-b-2 border-transparent'
            }`}
          >
            30 days
          </div>
          <div
            onClick={() => setFilterActive('7 Days')}
            className={`cursor-pointer ${
              filterActive === '7 Days'
                ? 'mt-0.5 h-full border-b-2 border-black-primary'
                : 'mt-0.5 h-full border-b-2 border-transparent'
            }`}
          >
            7 days
          </div>
          <div
            onClick={() => setFilterActive('24 Hours')}
            className={`cursor-pointer ${
              filterActive === '24 Hours'
                ? 'mt-0.5 h-full border-b-2 border-black-primary'
                : 'mt-0.5 h-full border-b-2 border-transparent'
            }`}
          >
            24 hours
          </div>
          <div
            className={`${
              filterActive === 'filter'
                ? 'mt-2 h-full border-b-2 border-black-primary'
                : 'mt-2 h-full border-b-2 border-transparent'
            }`}
          >
            <img src={ASSETS.ICONS.FILTER} alt="" />
          </div>
        </div>
      </div>
      <div className="h-[400px] w-full bg-gray-light pt-5">
        <Bar options={chartOptions} ref={ref} data={chartData} />
      </div>
    </div>
  );
};
