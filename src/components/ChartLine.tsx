import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { BiCloudLightning } from 'react-icons/bi';
import { API_HANDLER, calculateMonthlyData } from '../utils/functions';
import { END_POINTS } from '../utils/endpoints';

export const ChartLine: React.FC = () => {
  const [chartDataObject, setChartDataObject] = useState([]);
  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    const result = await API_HANDLER('GET', END_POINTS.DASHBOARD.CHARTS, {});
    if (result?.data?.status == 'success') {
      setChartDataObject(result?.data?.data || []);
    }
  };
  const [state, setState] = useState({
    series: [
      {
        name: 'Services',
        data: calculateMonthlyData(chartDataObject).tokenAmounts,
        // data: [0, 5000, 10000, 12000, 13000, 12800, 9000, 10000, 13700,  13750, 13800, 13800],
      },
      {
        name: 'Products',
        data: [
          3000, 5000, 8000, 9000, 10000, 10800, 8000, 9000, 10700, 11750, 13800,
          13800,
        ],
      },
    ],
  });

  const options: ApexOptions = {
    stroke: {
      curve: 'smooth',
    },
    colors: ['#4318FF', '#6AD2FF'], // Purple and Aqua colors
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
    },
    yaxis: {
      min: 0,
      max: 20000,
      tickAmount: 5,
      labels: {
        formatter: function (value) {
          return value / 1000 + 'k'; // Divide by 1000 and append 'k' for thousands
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Unbounded',
      fontWeight: 600,
      fontSize: '16px',
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
        <h4 className="text-black text-base font-semibold dark:text-white">
          Sales by products and services
        </h4>

        <BiCloudLightning className="cursor-pointer text-2xl" />
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
