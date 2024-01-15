import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchUsers, onUpdateUserStatus } from '../../redux/slices/customers';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table';
import DefaultLayout from '../../layout/DefaultLayout';

export const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { users } = useSelector((state: any) => state.Users);

  useEffect(() => {
    
    dispatch(fetchUsers({}));
  }, []);

  const onChangeStatus = (user: any) => {
    dispatch(
      onUpdateUserStatus({
        _id: user.id,
        status: user.status == 0 ? 1 : 0,
      })
    );
  };

  const columns = [
    {
      name: 'Customers',
      selector: 'Customers',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold text-black-primary">
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
      name: 'City',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.city || 'Lahore'}{' '}
        </div>
      ),
    },
    {
      name: 'Gender',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.gender || 'Male'}{' '}
        </div>
      ),
    },
    {
      name: 'Contact',
      selector: (row: any) => (
        <span className="font-semibold text-black-primary">
          {row?.phoneNumber}
        </span>
      ),
    },
    {
      name: 'Spending',
      selector: (row: any) => (
        <span className="font-semibold text-black-primary">
          {row?.spending || 'N/A'}
        </span>
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
        heading="Customers"
        columns={columns}
        data={users}
        filterByDays={true}
        statusFilter={true}
      />
    </DefaultLayout>
  );
};
