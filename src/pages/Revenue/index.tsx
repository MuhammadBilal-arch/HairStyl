import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { CurvedLineChart } from './chart';
import { API_HANDLER_FORM_DATA, showToast } from '../../utils/functions';
import { END_POINTS } from '../../utils/endpoints';
import { useSelector } from 'react-redux';
import { TOAST_TYPE } from '../../utils/constants';

export const Revenue = () => {
  const { user } = useSelector((state) => state?.User);
  const [revenue, setRevenue] = useState();
  const [totalSales, setTotalSales] = useState('7 Days');
  const [totalSalesVolume, setTotalSalesVolume] = useState('7 Days');
  const [totalProfit, settotalProfit] = useState('7 Days');

  useEffect(() => {
    onGetTransactions();
  }, []);

  const onGetTransactions = async () => {
    const formData = new FormData();
    formData.append('dispensary_id', user?.dispensary?._id);
    const result = await API_HANDLER_FORM_DATA(
      'POST',
      END_POINTS.TRANSACTIONS.GET,
      formData
    );
    console.log(result?.data?.data);
    setRevenue(result?.data?.data);
    showToast(result.data.data.message, TOAST_TYPE.success);
  };

  return (
    <DefaultLayout>
      <div className="space-y-6 text-black-2">
        <div className="grid grid-cols-3 gap-4 ">
          <div className="flex h-44 flex-col space-y-4 rounded-md bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between ">
              <div className="text-xl font-semibold">Total Sales</div>
              <div>
                <select onChange={(e) => setTotalSales(e.target.value)}>
                  <option value="7 Days">7 Days</option>
                  <option value="Current Month">Current Month</option>
                  <option value="Last Month">Last Month</option>
                </select>
              </div>
            </div>
            <div className="text-4xl font-bold text-black-2">
              $
              {totalSales === '7 Days'
                ? revenue?.last7DaysRevenue
                : totalSales === 'Current Month'
                ? revenue?.currentMonthRevenue
                : revenue?.lastMonthRevenue}
            </div>
          </div>
          <div className="flex h-44 flex-col space-y-4 rounded-md bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between ">
              <div className="text-xl font-semibold">Sales Volume</div>
              <div>
                <select onChange={(e) => setTotalSalesVolume(e.target.value)}>
                  <option value="7 Days">7 Days</option>
                  <option value="Current Month">Current Month</option>
                  <option value="Last Month">Last Month</option>
                </select>
              </div>
            </div>
            <div className="text-4xl font-bold text-black-2">
              {totalSalesVolume === '7 Days'
                ? revenue?.last7DaysSalesVolume
                : totalSales === 'Current Month'
                ? revenue?.currentMonthSalesVolume
                : revenue?.lastMonthSalesVolume}
            </div>
          </div>
          <div className="flex h-44 flex-col space-y-4 rounded-md bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between ">
              <div className="text-xl font-semibold">Total Profit</div>
              <div>
                <select onChange={(e) => setTotalProfit(e.target.value)}>
                  <option value="7 Days">7 Days</option>
                  <option value="Current Month">Current Month</option>
                  <option value="Last Month">Last Month</option>
                </select>
              </div>
            </div>
            <div className="text-4xl font-bold text-black-2">
              ${' '}
              {totalProfit === '7 Days'
                ? revenue?.last7DaysRevenue
                : totalSales === 'Current Month'
                ? revenue?.currentMonthRevenue
                : revenue?.lastMonthRevenue}
            </div>
          </div>
        </div>
        <CurvedLineChart revenue={revenue} />
      </div>
    </DefaultLayout>
  );
};
