import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { API_HANDLER } from '../../utils/functions';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table';

import DefaultLayout from '../../layout/DefaultLayout';
import { fetchVendors, onUpdateVendorStatus } from '../../redux/slices/vendors';
import { END_POINTS } from '../../utils/endpoints';

export const HomeDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [stats, setStats] = useState('');
  const { vendors } = useSelector((state: any) => state.Vendors);

  useEffect(() => {
    dispatch(fetchVendors({}));
    onGetDashboardStats();
  }, []);

  const onGetDashboardStats = async () => {
    const result = await API_HANDLER('GET', END_POINTS.DASHBOARD.GET, {});
    console.log(result);
    if (result?.data?.status == 'success') {
      setStats(result?.data?.data);
    }
  };

  const onChangeStatus = (user: any) => {
    // setStatus(!status);

    dispatch(
      onUpdateVendorStatus({
        _id: user.id,
        status: user.status == 0 ? 1 : 0,
      })
    );
  };

  const columns = [
    {
      name: 'Clients',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div
          className="flex w-full cursor-pointer items-center space-x-2 text-purple-primary"
          onClick={() =>
            navigate('/client-detail', {
              state: row,
            })
          }
        >
          <img
            src={ASSETS.AUTH.SIGN_IN_COVER}
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
      selector: (row: any) => <div>{row.city || 'N/A'}</div>,
    },
    {
      name: 'Ratings',
      selector: (row: any) => (
        <span className="flex items-center space-x-2">
          <FaStar className="text-yellow-primary" />{' '}
          <span>{row?.ratings || '5.0'}</span>
        </span>
      ),
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
          id={row.id}
        />
      ),
    },
  ] as any;

  return (
    <DefaultLayout>
      <div className="space-y-6 pb-10">
        <Table
          goBack={false}
          heading="Registered clients"
          columns={columns}
          data={vendors}
          filterByDays={false}
          showPagination={true}
          showBottomTab={false}
          onViewAllContent={()=>{}}
          rateFilter={true}
          statusFilter={true}
        />
      </div>
    </DefaultLayout>
  );
};
