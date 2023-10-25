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

export const Products = () => {
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
      name: 'Products',
      selector: 'Products',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div
          className="flex w-full cursor-pointer items-center space-x-2 text-purple-primary"
          onClick={() =>
            navigate('/customer-detail', {
              state: row,
            })
          }
        >
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
      name: 'Shop',
      selector: (row: any) => calculateAge(row.city),
    },
    {
      name: 'Contact',
      selector: (row: any) => row?.phone,
    },
    {
      name: 'Status',
      selector: (row: any) =>
        row?.status ? (
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
      name: 'Hide/Block',
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
    <Table
      heading="Products"
      columns={columns}
      data={users}
      filterByDays={false}
    />
  );
};
