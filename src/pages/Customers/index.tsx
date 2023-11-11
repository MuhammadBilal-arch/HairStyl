import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../../redux/slices/customers';
import { calculateAge } from '../../utils/functions';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table';
import DefaultLayout from '../../layout/DefaultLayout';

export const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { users } = useSelector((state: any) => state.Users);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    const payload = {
      accountType: 'CLIENT',
    };
    dispatch(fetchUsers(payload));
  }, []);

  const onChangeStatus = () => {
    setStatus(!status);
  };

  const onGetName = (name) => {
    return name;
  };

  const columns = [
    {
      name: 'Customers',
      selector: 'Customers',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold text-black-primary">
          <img
            src={ASSETS.AUTH.SIGN_IN_COVER}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <div className=""> {onGetName(row?.fname + ' ' + row?.lname)}</div>
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
        <span className="font-semibold text-black-primary">{row?.phone}</span>
      ),
    },
    {
      name: 'Spending',
      selector: (row: any) => (
        <span className="font-semibold text-black-primary">{row?.spending || "€560"}</span>
      ),
    },

    {
      name: 'Hide / Unhide',
      selector: (row: any) => (
        <ToggleButton
          onChangeStatus={onChangeStatus}
          status={status}
          text=""
          id={row._id}
        />
      ),
    },
  ] as any;

  return (
    <DefaultLayout>
      <Table
        heading="Customers"
        columns={columns}
        data={users}
        filterByDays={true}
      />
    </DefaultLayout>
  );
};
