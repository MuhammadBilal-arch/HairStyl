import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table'; 
import DefaultLayout from '../../layout/DefaultLayout';
import { BarChart } from '../../components/chart';
import DropdownNotification from '../../components/DropdownNotification';
import { ChartLine } from '../../components/ChartLine';
import { PieChart } from '../../components/chart/pie';
import { fetchTopSellingVendors, onUpdateTopSellingStatus } from '../../redux/slices/vendors';

export const SalesDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { topSellings } = useSelector((state: any) => state.Vendors);
  console.log(topSellings,"TOP SELLINGS")
  useEffect(() => {
    dispatch(fetchTopSellingVendors({}));
  }, []);

  const onChangeStatus = (user: any) => {
    dispatch(
      onUpdateTopSellingStatus({
        _id: user.id,
        status: user.status == 0 ? 1 : 0,
      })
    );
  };

  const columns = [
    {
      name: 'Sales',
      selector: 'Sales',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div
          className="flex w-full font-semibold cursor-pointer items-center space-x-2 text-purple-primary"
          onClick={() =>
            navigate('/sales-details', {
              state: row,
            })
          }
        >
          <img
            src={row?.image?.length > 0 ? row?.image[0] : ASSETS.DUMMY_IMAGE}
            alt=""
            className="h-7 w-7 rounded-full object-contain"
          />
          <div className=""> {row?.name}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Shop',
      selector: (row: any) => row.shopName,
    },
    {
      name: 'Contact',
      selector: (row: any) => row?.phoneNumber,
    },
    {
      name: 'Status',
      selector: (row: any) =>
        row?.status != 0 ? (
          <div className="rounded-2xl bg-blue-light px-4  py-0.5 font-semibold text-blue-primary">
            <span className="mr-1 text-xl text-green-base">•</span> Active
          </div>
        ) : (
          <div className="rounded-2xl bg-blue-light px-4  py-0.5 font-semibold text-blue-primary">
            <span className="mr-1 text-xl text-red-delete">•</span> Inactive
          </div>
        ),
    },
    {
      name: 'Hide / Unhide',
      selector: (row: any) => (
        <ToggleButton
        onChangeStatus={() => onChangeStatus(row)}
        status={row.status == 0 ? false : true}
        text=""
        id={row._id}
        />
      ),
    },
  ] as any;

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-normal font-semibold text-black-primary md:text-lg">
            Sales
          </h1>

          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <!-- Notification Menu Area --> */}
              <DropdownNotification />
            </ul>
          </div>
        </div>
        <div>
          <BarChart />
        </div>
        <div className="grid lg:grid-cols-5 gap-2">
          <div className="lg:col-span-3">
            <ChartLine />
          </div>
          {/* <div className="lg:col-span-2 overflow-hidden object-contain rounded-sm border border-stroke bg-white py-7.5 px-5 shadow-default">
              <PieChart/>
          </div> */}
        </div>

        <Table
          goBack={false}
          heading="Top Selling Shop"
          columns={columns}
          data={topSellings}
          filterByDays={false}
          showPagination={false}
          showBottomTab={true}
          onViewAllContent={() => navigate('/sales-details')}
          statusFilter={true}
        />
      </div>
    </DefaultLayout>
  );
};
