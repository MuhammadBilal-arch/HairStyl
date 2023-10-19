import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { PurpleOutlineBtn } from '../../components/button';
import { AddressModal } from './modals/address';
import { UpdateProfile } from './modals/profile';
import { useSelector } from 'react-redux';
import { UpdatePassword } from './modals/password';
import { TaxProfile } from './modals/tax';
import { useDispatch } from 'react-redux';
import { fetchTaxes } from '../../redux/slices/taxes';

export const Settings = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state:any) => state.User);
  const { taxes } = useSelector((state:any) => state.Taxes);

  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showEditTaxes, setShowEditTaxes] = useState(false);

  useEffect(() => {
    dispatch(fetchTaxes());
  }, []);
  return (
    <DefaultLayout>
      <TaxProfile
        updateProfileModal={showEditTaxes}
        onUpdateProfileModal={() => setShowEditTaxes(!showEditTaxes)}
        defaultValue={taxes.length > 0 ? taxes[0] : {}}
      />
      <UpdatePassword
        updateProfileModal={showEditPassword}
        onUpdateProfileModal={() => setShowEditPassword(!showEditPassword)}
        defaultValue={user}
      />
      <UpdateProfile
        updateProfileModal={showEditItemModal}
        onUpdateProfileModal={() => setShowEditItemModal(!showEditItemModal)}
        defaultValue={user}
      />

      <AddressModal
        setModalNewAddress={() => setShowEditAddress(!showEditAddress)}
        modalNewAddress={showEditAddress}
        defaultValue={user}
        edit={true}
      />

      <div className="space-y-2 md:space-y-5">
        {user.accountType === 'DISPENSARY' && (
          <>
            <div className="flex flex-col space-y-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base ">
                Dispensary Information
              </h1>
              <div className="flex flex-col space-y-1 text-sm font-semibold text-black-primary">
                <div>{user?.dispensary?.name}</div>
                <div>{user?.email}</div>
                <div>{user?.dispensary?.phone}</div>
              </div>
              <div className="w-1/3">
                <PurpleOutlineBtn
                  text="Update Information"
                  icon={false}
                  onClick={() => setShowEditItemModal(!showEditItemModal)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base ">
                Location
              </h1>
              <div className="flex flex-col space-y-1 text-sm font-semibold text-black-primary">
                <div>
                  {user?.dispensary?.unit} {user?.dispensary?.street},{' '}
                  {user?.dispensary?.city}, {user?.dispensary?.zipCode}
                </div>
              </div>
              <div className="w-1/3">
                <PurpleOutlineBtn
                  text="Update Address"
                  icon={false}
                  onClick={() => setShowEditAddress(!showEditAddress)}
                />
              </div>
            </div>
          </>
        )}
        {user.accountType === 'SUPER_ADMIN' && (
          <div className="flex flex-col space-y-2">
            <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base ">
              Charges Information
            </h1>
            <div className="flex flex-col space-y-1 text-sm font-semibold text-black-primary">
              <div className="flex">
                <span className="w-32">Tax </span> <span>{taxes[0]?.tax}$</span>
              </div>
              <div className="flex">
                <span className="w-32">Delivery Charges</span>{' '}
                <span>{taxes[0]?.delivery_charges}$</span>
              </div>
              <div>{user?.dispensary?.phone}</div>
            </div>
            <div className="w-1/3">
              <PurpleOutlineBtn
                text="Update Information"
                icon={false}
                onClick={() => setShowEditTaxes(!showEditTaxes)}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base ">
            Password
          </h1>

          <div className="w-1/3">
            <PurpleOutlineBtn
              text="Change Password"
              icon={false}
              onClick={() => setShowEditPassword(!showEditPassword)}
            />
          </div>
        </div>
        {user.accountType === 'DISPENSARY' && (
          <div className="flex flex-col space-y-2">
            <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base ">
              Contact Support
            </h1>

            <div className="w-1/3">
              <button className="rounded-md bg-purple-primary py-2 px-5 text-white">
                Email GanjaGo
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};
