import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchVendors, onUpdateVendorStatus } from '../../redux/slices/vendors';
import { calculateAge } from '../../utils/functions';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table';
import DefaultLayout from '../../layout/DefaultLayout';

export const Clients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { vendors } = useSelector((state: any) => state.Vendors);

  useEffect(() => {
    dispatch(fetchVendors({}));
  }, []);

  const onChangeStatus = (user:any) => {
    // setStatus(!status); 
    
    dispatch(onUpdateVendorStatus({
      _id:user.id,
      status: user.status == 0 ? 1 : 0
    }));
  };



  const columns = [
    {
      name: 'Clients',
      selector: 'name',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div
          className="flex w-full cursor-pointer items-center space-x-2 font-semibold text-black-primary"
          onClick={() =>
            navigate('/client-detail', {
              state: row,
            })
          }
        >
          <img
            src={row?.image.length > 0 ? row?.image[0] : ASSETS.DUMMY_IMAGE}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <div className=""> {row.name}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'City',
      selector: (row: any) => (
        <div className="font-medium text-black-primary">
          {row.city || 'Lahore'}{' '}
        </div>
      ),
    },
    {
      name: 'Ratings',
      selector: (row: any) => (
        <span className="flex space-x-1 font-medium text-black-primary">
          <FaStar className="text-yellow-primary" />{' '}
          <span>{row?.rating || 'NA'}</span>
        </span>
      ),
    },
    {
      name: 'Contact',
      selector: (row: any) => (
        <span className="font-medium text-black-primary">{row?.phoneNumber}</span>
      ),
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
          id={row.id}
        />
      ),
    },
  ] as any;

  return (
    <DefaultLayout>
      <Table
        goBack={true}
        heading="Clients"
        columns={columns}
        data={vendors}
        filterByDays={true}
        showBottomTab={false}
        showPagination={true}
        onViewAllContent={()=> {}}
        statusFilter={true}
        rateFilter={false}
      />
    </DefaultLayout>
  );
};
