import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchTopRatedVendors, fetchTopSellingVendors, onUpdateTopSellingStatus, onUpdateVendorStatus } from '../../redux/slices/vendors';

export const TopRated = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { topRated } = useSelector((state: any) => state.Vendors);

  useEffect(() => {
    dispatch(fetchTopRatedVendors({}));
  }, []);

  console.log(topRated,"top")

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
            src={row?.image || ASSETS.DUMMY_IMAGE}
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
      <Table
        goBack={false}
        heading="Top Rated Shops"
        columns={columns}
        data={topRated}
        filterByDays={false}
        showPagination={true}
        showBottomTab={false}
        onViewAllContent={() => navigate('')}
      />
    </DefaultLayout>
  );
};
