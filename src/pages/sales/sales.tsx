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
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import DefaultLayout from '../../layout/DefaultLayout';
import { BarChart } from '../../components/chart';
import DropdownNotification from '../../components/DropdownNotification';
import { ChartLine } from '../../components/ChartLine';
import { PieChart } from '../../components/chart/pie';
import ChartThree from '../../components/ChartThree';

export const SalesDetail = () => {
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
      name: 'Clients',
      selector: 'clients',
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
          <div className=""> {onGetName(row?.fname + ' ' + row?.lname)}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'City',
      selector: (row: any) => calculateAge(row.city),
    },
    {
      name: 'Ratings',
      selector: (row: any) => (
        <span>
          <FaStar className="text-yellow-primary" /> {row?.ratings}
        </span>
      ),
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
          <div className="lg:col-span-2 overflow-hidden object-contain rounded-sm border border-stroke bg-white py-7.5 px-5 shadow-default">
              <PieChart/>
          </div>
        </div>

        <Table
          goBack={false}
          heading="Registered clients"
          columns={columns}
          data={users}
          filterByDays={false}
        />
      </div>
    </DefaultLayout>
  );
};
