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
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import DefaultLayout from '../../layout/DefaultLayout';
import { BarChart } from '../../components/chart';
import DropdownNotification from '../../components/DropdownNotification';
import { ExportToExcel } from '../../components/export';
import { fetchVendors, onUpdateVendorStatus } from '../../redux/slices/vendors';
import { END_POINTS } from '../../utils/endpoints';
import { CustomSelect } from '../../components/select/index.jsx';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [stats, setStats] = useState<any>('');
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
            src={row?.image?.length > 0 ? row?.image[0] : ASSETS.DUMMY_IMAGE}
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

  const handleSelectOption = (value: any) => {
    if (value.value == 'All products') {
      navigate('/products')
    }
    if (value.value == 'All services') {
      navigate('/services-list')
    }
    if (value.value == 'asda') {
      navigate('/services')
    }
  };
  return (
    <DefaultLayout>
      <div className="space-y-6 pb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-normal font-semibold text-black-primary md:text-lg">
            Dashboard
          </h1>

          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <!-- Notification Menu Area --> */}
              <DropdownNotification />
            </ul>
            <ExportToExcel
              columns={[
                'id',
                'name',
                'city',
                'country',
                'ratings',
                'phoneNumber',
                'email',
                'shopName',
                'age',
                'image',
                'userType',
                'status',
              ]}
              data={vendors}
              fileName="Vendors"
            />
            <div 
            style={{background:'black'}}
            className=' w-48 flex h-9 items-center justify-between px-3 rounded-md'>
              <div>
                <div className='bg-green-base h-2 w-2 rounded-full'></div>
              </div>
            <div className="w-36">
              <CustomSelect
                options={[

                  { value: 'All', label: 'All' },
                  { value: 'All products', label: 'All products' },
                  { value: 'All services', label: 'All services' },
                ]}
                background="black"
                onSelectOption={handleSelectOption}
              />
            </div>
            </div>
          </div>
        </div>
        <div>
          <BarChart />
        </div>
        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
          <div className="space-y-3 rounded-md bg-white p-5 text-black-primary shadow-equal">
            <div className="flex justify-between font-medium">
              <h1>Profit on sales</h1>
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => navigate('/sales')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xl font-semibold">
                  €{stats?.Total || 0}
                </div>
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
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => navigate('/customers')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xl font-semibold">{stats?.Users || 0}</div>
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
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => navigate('/clients')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-xl font-semibold">
                  {stats?.Vendors || 0}
                </div>
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
          goBack={false}
          heading="Registered clients"
          columns={columns}
          data={vendors}
          filterByDays={false}
          showPagination={false}
          showBottomTab={true}
          onViewAllContent={() => navigate('/home-detail')}
          statusFilter={true}
          rateFilter={true}
        />
      </div>
    </DefaultLayout>
  );
};
