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

export const Home = () => {
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
    <DefaultLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-normal font-semibold text-black-primary md:text-lg">
            Dashboard
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
        <div className="grid grid-cols-3 gap-4 ">
          <div className="space-y-3 rounded-md bg-white p-5 text-black-primary shadow-equal">
            <div className="flex justify-between font-medium">
              <h1>Profit on sales</h1>
              <BsThreeDotsVertical />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xl font-semibold">€10,000</div>
                <div className="flex items-center space-x-2 text-xs font-medium xl:text-sm">
                  <span className="flex items-center space-x-2 text-green-base">
                    <AiOutlineArrowUp /> <div>10%</div>
                  </span>{' '}
                  <div className="text-gray-base">vs last month</div>
                </div>
              </div>
              <img src={ASSETS.GRAPHS.PROFIT} alt="" className="h-12" />
            </div>
          </div>
          <div className="space-y-3 rounded-md bg-white p-5 text-black-primary shadow-equal">
            <div className="flex justify-between font-medium">
              <h1>Total customers</h1>
              <BsThreeDotsVertical />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xl font-semibold">3664</div>
                <div className="flex items-center space-x-2 text-xs font-medium xl:text-sm">
                  <span className="flex items-center space-x-2 text-red-delete">
                    <AiOutlineArrowDown /> <div>10%</div>
                  </span>
                  <div className="text-gray-base">vs last month</div>
                </div>
              </div>
              <img src={ASSETS.GRAPHS.LOSS} alt="" className="h-12" />
            </div>
          </div>
          <div className="space-y-3 rounded-md bg-white p-5 text-black-primary shadow-equal">
            <div className="flex justify-between font-medium">
              <h1>Total clients</h1>
              <BsThreeDotsVertical />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xl font-semibold">750</div>
                <div className="flex items-center space-x-2 text-xs font-medium xl:text-sm">
                  <span className="flex items-center space-x-2 text-green-base">
                    <AiOutlineArrowUp /> <div>10%</div>
                  </span>{' '}
                  <div className="text-gray-base">vs last month</div>
                </div>
              </div>
              <img src={ASSETS.GRAPHS.PROFIT} alt="" className="h-12" />
            </div>
          </div>
        </div>
        <Table
          heading="Registered clients"
          columns={columns}
          data={users}
          filterByDays={false}
        />
      </div>
    </DefaultLayout>
  );
};
