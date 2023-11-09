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

export const Services = () => {
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
      name: 'Services',
      selector: 'Services',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div className="font-semibold text-black-primary">Deep Massage</div>
      ),
      sortable: true,
    },
    {
      name: 'No. of shops offering this service',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.no_of_shops || '162 Shops'}
        </div>
      ),
    },
    {
      name: 'Price',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.price || '€40'}
        </div>
      ),
    },
    {
      name: 'Sales',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.sales || '€1340'}
        </div>
      ),
    },
  ] as any;

  return (
    <DefaultLayout>
      <Table
        heading="Services"
        columns={columns}
        data={users}
        filterByDays={false}
      />
    </DefaultLayout>
  );
};
