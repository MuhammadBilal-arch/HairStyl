import moment from 'moment';
import { calculateQuantity } from '../../utils/functions';


export const OrdersCards = ({ data, status, onClick }: any) => {

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col space-y-2 rounded-md bg-white p-2.5 shadow-equal"
    >
      <div className="flex items-center justify-between font-semibold">
        <div className="text-black-primary">
          {data?.customer?.fname + ' ' + data?.customer?.lname ||
            'Customer Name'}
        </div>
        <div className="flex items-center space-x-1">
          <div>Status:</div>
          <div className="text-purple-primary">{status}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-black-base">
        <div>{moment(data?.createdAt).format('MMM D, YYYY @ h:mm A')}</div>
        <div>{calculateQuantity(data)} items</div>
      </div>
    </div>
  );
};
