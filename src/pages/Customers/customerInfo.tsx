import { useDispatch } from 'react-redux';
import { calculateAge } from '../../utils/functions';
import { onUpdateUser } from '../../redux/slices/customers';
import { useNavigate } from 'react-router-dom';
import { ToggleButton } from '../../components/toggle';

export const CustomerInfo = ({ customer }) => {
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const onChangeStatus = () => {
    const payload = {
      email: customer.email,
      status: !customer.status,
    };
    dispatch(onUpdateUser(payload));
  };
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-y-4 gap-x-12">
        <div className="flex flex-col text-sm">
          <div>Customer</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">
              {customer?.fname + ' ' + customer?.lname}
            </div>
            <div
              className="cursor-pointer text-purple-primary"
              // onClick={() =>
              //   navigate('/chat', {
              //     // state: { ...order, estimatedTime },
              //   })
              // }
            >
              Chat
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Address</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">
              {customer?.fname + ' ' + customer?.lname}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Email</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">{customer?.email}</div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Phone</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">{customer?.phone}</div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Age</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">
              {calculateAge(customer?.dob)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-normal flex flex-col font-semibold text-black-primary md:text-xl">
          <div>Identity</div>
          <span className="text-sm">ID Verified Drivers License</span>
        </h1>
        <h1 className="text-normal flex flex-col font-semibold text-black-primary md:text-xl">
          <div>Payment</div>
          <span className="text-sm">Canpay</span>
        </h1>

        <div className="mb-14 flex flex-col space-y-2 pt-4">
          <ToggleButton
            onChangeStatus={onChangeStatus}
            status={customer?.status}
          />
        </div>
      </div>
    </>
  );
};
