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
import { fetchStaff } from '../../redux/slices/vendors';

export const Staff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { staff } = useSelector((state: any) => state.Vendors);
  console.log(staff)
  const [status, setStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchStaff({}));
  }, []);

  const onChangeStatus = () => {
    setStatus(!status);
  };

  const columns = [
    {
      name: 'Staff',
      selector: 'Staff',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold text-black-primary">
          <img
            src={row?.profilePicture != null ? JSON.parse(row?.profilePicture) : ASSETS.AUTH.SIGN_IN_COVER}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <div className=""> {row.name}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Shop',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row?.shopName || 'N/A'}{' '}
        </div>
      ),
    },
    {
      name: 'Contact',
      selector: (row: any) => (
        <span className="font-semibold text-black-primary">{row?.phoneNumber || 'N/A'}</span>
      ),
    },
    {
      name: 'Sales',
      selector: (row: any) => (
        <span className="font-semibold text-black-primary">{row?.sales || "N/A"}</span>
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
  ] as any

  return (
    <DefaultLayout>
      <Table
        goBack={false}
        heading="Staff"
        columns={columns}
        data={staff}
        filterByDays={false}
        statusFilter={true}
      />
    </DefaultLayout>
  );
};
