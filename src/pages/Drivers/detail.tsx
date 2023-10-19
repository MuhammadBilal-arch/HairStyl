import { useEffect, useCallback, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { DriverInfo } from './driverInfo';
import { TransactionsList } from './driverTransactions';

export const DriversDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { drivers } = useSelector((state: any) => state.Drivers);
  const [tab, setTab] = useState(1);

  const [driver, setDriver] = useState<any>();
  const data = location?.state;

  useEffect(() => {
    const foundDriver = drivers.find((item: any) => item._id === data._id);
    if (foundDriver) {
      setDriver(foundDriver);
    }
  }, [drivers]);



  return (
    <DefaultLayout>
      <div className="space-y-4 px-4">
        <div
          className="flex cursor-pointer items-center space-x-2 text-black-primary"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft /> <span>Back</span>
        </div>
        <div className="">
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
                  <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
                    {driver?.fname + ' ' + driver?.lname}&nbsp;{' '}
                    <span className="text-gray-base">
                      (ID&nbsp;#{driver?._id})
                    </span>
                  </h1>
                </h1>
                {driver?.status ? (
                  <div className="rounded-sm bg-green-light px-2 py-1 text-xs font-semibold text-green-base">
                    • Active
                  </div>
                ) : (
                  <div className="rounded-sm bg-gray-disabled px-2 py-1 text-xs font-semibold text-gray-text">
                    • Inactive
                  </div>
                )}
              </div>
              <div className="flex space-x-6 border-b border-black-primary border-opacity-20 pt-2 text-base font-semibold  text-black-primary">
                <div
                  onClick={() => setTab(1)}
                  className={`${
                    tab === 1
                      ? 'cursor-pointer border-b-2 border-gray-base py-0.5'
                      : 'cursor-pointer py-0.5'
                  }`}
                >
                  Drivers Information
                </div>
                <div
                  onClick={() => setTab(2)}
                  className={`${
                    tab === 2
                      ? 'cursor-pointer border-b-2 border-gray-base py-0.5'
                      : 'cursor-pointer py-0.5'
                  }`}
                >
                  Transactions
                </div>
              </div>
              {tab === 1 ? (
                <DriverInfo driver={driver} />
              ) : (
                <TransactionsList driver={driver} />
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
