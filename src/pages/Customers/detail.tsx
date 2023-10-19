import { useEffect, useCallback, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CustomerInfo } from './customerInfo';
import { TransactionsList } from './customerTransactions';

export const CustomerDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { users } = useSelector((state: any) => state.Users);
  const [tab, setTab] = useState(1);

  const [customer, setCustomer] = useState<any>();
  const data = location?.state;

  useEffect(() => {
    const foundCustomer = users.find((item: any) => item._id === data._id);
    if (foundCustomer) {
      setCustomer(foundCustomer);
    }
  }, [users]);



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
                    {customer?.fname + ' ' + customer?.lname}&nbsp;{' '}
                    <span className="text-gray-base">
                      (ID&nbsp;#{customer?._id})
                    </span>
                  </h1>
                </h1>
                {customer?.status ? (
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
                  Customer Information
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

                <CustomerInfo customer={customer}/>
              ) : (
                <TransactionsList customer={customer} />
              )}

            </div>
 
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
