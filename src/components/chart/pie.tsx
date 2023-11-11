import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


export const PieChart: React.FC = () => {
  const [state, setState] = useState<any>({
    series: [65, 34],
  });

  useEffect(() => {
    // Calculate percentages when the component mounts or when the data changes
    const total = state.series.reduce((acc, value) => acc + value, 0);
    const malePercentage = (state.series[0] / total) * 100;
    const femalePercentage = (state.series[1] / total) * 100;

    // Update the component state with the calculated percentages
    setState((prev) => ({
      ...prev,
      malePercentage,
      femalePercentage,
    }));
  }, [state.series]);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      width: "100%",
    },
    colors: ['#7F56D9', '#F4EBFF'],
    labels: ['Male', 'Female'],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontFamily: 'Unbounded',
      fontWeight: 600,
      fontSize: '14px', 
      markers: {
        radius: 99,
      },
    },
  
    plotOptions: {
      pie: {
        offsetY:40,
        dataLabels: {
          offset: -30,
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px',
        fontWeight: 'medium', 
        colors: ['#7F56D9', '#F4EBFF'],      
      },
      
      textAnchor: 'middle',
      formatter: function (val, { seriesIndex }) {
        return seriesIndex === 0 ? `$${state?.series[0]}` : `$${state?.series[1]}`;
      },
    },
  
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 330,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  return (
    <div id="chartThree" className="mx-auto flex flex-col items-center justify-center relative h-full">
      <h4 className="absolute left-0 top-0 text-black text-base font-semibold dark:text-white">
        Sales by gender
      </h4>

      <ReactApexChart className="h-full"  options={options} series={state.series} type="pie" >

      </ReactApexChart>
      <div className='absolute bottom-0 left-0'>
        <h4 className="text-black text-sm font-medium text-gray-base">
          Male: {state?.malePercentage?.toFixed(0)} Percent
        </h4>
        <h4 className="text-black text-sm font-medium text-gray-base">
          Female: {state?.femalePercentage?.toFixed(0)} Percent
        </h4>
      </div>
    </div>
  );
};
