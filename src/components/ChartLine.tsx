import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const ChartLine: React.FC = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Purple Line',
        data: [44, 55, 41, 67, 22, 43, 65, 9, 22, 1, 99, 9],
        strokeWidth: 3,
      },
      {
        name: 'Aqua Line',
        data: [13, 23, 20, 8, 13, 27, 15, 44, 55, 41, 67,12],
        strokeWidth: 3,
      },
    ],
  });

  const options: ApexOptions = {
    colors: ['#800080', '#00FFFF'], // Purple and Aqua colors
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'line',
      height: 335,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      // axisBorder: {
      //   color: '#333', // Color of the x-axis line
      //   width: 2,      // Width of the x-axis line
      // },
    },
    // axisBorder: {
    //   color: '#333', // Color of the y-axis line
    //   width: 2,      // Width of the y-axis line
    // },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-black text-xl font-semibold dark:text-white">
            Profit this week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            {/* Dropdown and icon */}
          </div>
        </div>
      </div>
    
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};
