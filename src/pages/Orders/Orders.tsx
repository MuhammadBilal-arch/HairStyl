import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { OrdersCards } from '../../components/Orders/Cards';
import DefaultLayout from '../../layout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { onFetchOrders } from '../../redux/slices/orders';

export const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state?.Orders);
  const { user } = useSelector((state) => state?.User);
  console.log(orders)
  useEffect(() => {
    const payload = {
      id: user?.dispensary?._id,
    };
    dispatch(onFetchOrders(payload));
  }, []);

  // Initialize separate arrays for each status
  const awaitingApprovalOrders = [];
  const awaitingPickupOrders = [];
  const inTransitOrders = [];
  const completedOrders = [];

  // Categorize orders into separate arrays
  orders.forEach((item:any) => {
    if (item.order_delivered || !item.order_status) {
      completedOrders.push(item);
    } else if (!item.dispensary_approved) {
      awaitingApprovalOrders.push(item);
    } else if (item.order_awaiting_pickup || item.dispensary_approved) {
      awaitingPickupOrders.push(item);
    } else if (item.order_in_transit) {
      inTransitOrders.push(item);
    }
  });

  return (
    <DefaultLayout>
      <div>
        {/* ORDERS AWAITING */}
        <div>
          <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
            <span>Incoming Orders</span>
            <span>({awaitingApprovalOrders.length})</span>
          </h1>
          <div
            className={`max-h-96 space-y-4 py-5 ${
              awaitingApprovalOrders.length < 5 ? '' : 'overflow-y-scroll'
            }`}
          >
            {awaitingApprovalOrders.map((item, index) => (
              <OrdersCards
                key={index}
                data={item}
                onClick={() =>
                  navigate('/order-detail', {
                    state: {
                      item: item,
                      status: 'Awaiting Approval',
                    },
                  })
                }
                status="Awaiting Approval"
              />
            ))}
          </div>
        </div>
        {/* ORDERS IN PROGRESS */}
        <div>
          <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
            <span>Orders In Progress</span>
            <span>
              ({awaitingPickupOrders.length + inTransitOrders.length})
            </span>
          </h1>
          <div
            className={`max-h-96 space-y-4 py-5 ${
              awaitingPickupOrders.length + inTransitOrders.length < 5
                ? ''
                : 'overflow-y-scroll'
            }`}
          >
            {awaitingPickupOrders.map((item, index) => (
              <OrdersCards
                key={index}
                data={item}
                onClick={() =>
                  navigate('/order-detail', {
                    state: {
                      item: item,
                      status: 'Awaiting Pickup',
                    },
                  })
                }
                status="Awaiting Pickup"
              />
            ))}
            {inTransitOrders.map((item, index) => (
              <OrdersCards
                key={index}
                data={item}
                onClick={() =>
                  navigate('/order-detail', {
                    state: {
                      item: item,
                      status: 'In Transit',
                    },
                  })
                }
                status="In Transit"
              />
            ))}
          </div>
        </div>
        {/* COMPLETED ORDERS */}
        <div>
          <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
            <span>Completed Orders</span>
            <span>({completedOrders.length})</span>
          </h1>
          <div
            className={`max-h-96 space-y-4 py-5 ${
              completedOrders.length < 5 ? '' : 'overflow-y-scroll'
            }`}
          >
            {completedOrders.map((item, index) => (
              <OrdersCards
                key={index}
                data={item}
                onClick={() =>
                  navigate('/order-detail', {
                    state: {
                      item: item,
                      status: 'Completed',
                    },
                  })
                }
                status="Completed"
              />
            ))}
          </div>
        </div>
        {/* PREVIOUS ORDERS  */}
        <div>
          <h1
            onClick={() =>
              navigate('/past-orders', {
                state: completedOrders,
              })
            }
            className="cursor-pointer text-sm font-semibold text-purple-primary"
          >
            View All Past Orders
          </h1>
        </div>
      </div>
    </DefaultLayout>
  );
};
