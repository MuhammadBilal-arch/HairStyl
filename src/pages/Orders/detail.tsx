import { useEffect, useCallback, useState } from 'react';
import moment from 'moment';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  calculateQuantity,
  onGetOrderCurrentStatus,
} from '../../utils/functions';
import { useDispatch } from 'react-redux';
import { ASSETS } from '../../images/path';
import { onUpdateOrder } from '../../redux/slices/orders';
import { useSelector } from 'react-redux';

export const OrderDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { orders } = useSelector((state:any) => state.Orders);
  const [order, setOrder] = useState<any>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB4rhPN6CCk7S80itxLaDM8_EQfHuZprVQ',
  });

  const [directions, setDirections] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const data = location?.state?.item;

  useEffect(() => {
    const result = orders.filter((item: any) => item?._id === data?._id);
    setOrder(result[0]);
  }, [orders,data]);

  const customerLocation = {
    lat: order?.customer_location?.lat,
    lng: order?.customer_location?.lng,
  };
  const shopLocation = {
    lat: order?.dispensary?.latitude,
    lng: order?.dispensary?.longitude,
  };

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: customerLocation,
          destination: shopLocation,
          travelMode: 'DRIVING', // You can change this to 'WALKING', 'BICYCLING', or 'TRANSIT'
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
            const duration = result?.routes[0]?.legs[0]?.duration?.text;
            setEstimatedTime(duration);
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    }
  }, [isLoaded]);

  const onCancelOrder = useCallback(() => {
    console.log(order)
    const formData = new FormData();
    formData.append('id', order?._id);
    formData.append('order_status', false);
    formData.append('order_cancellation_date', Date());
    dispatch(onUpdateOrder(formData));
  }, [order]);

  const onApproveOrder = useCallback(() => {
    const formData = new FormData();
    formData.append('id', order?._id);
    formData.append('order_status', true);
    formData.append('dispensary_approved', true);
    dispatch(onUpdateOrder(formData));
  }, [order]);

  return (
    <DefaultLayout>
      <div className="space-y-4 px-4">
        <div
          className="flex cursor-pointer items-center space-x-2 text-black-primary"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft /> <span>Back</span>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col">
              <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
                Order #{order?.order_id}
              </h1>
              <div className="text-xs text-black-base">
                {moment(order?.createdAt).format('MMM D, YYYY @ h:mm A')}
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>Customer</div>
              <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
                <div className="text-black-primary">
                  {order?.customer?.fname + ' ' + order?.customer?.lname}
                </div>
                <div
                  className="cursor-pointer text-purple-primary"
                  onClick={() =>
                    navigate('/chat', {
                      state: { ...order, estimatedTime },
                    })
                  }
                >
                  Contact
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b border-black-primary border-opacity-20 py-2 text-sm">
              <div>Order Details</div>
              <div className="space-x-1 text-sm font-semibold text-black-primary">
                <span>{calculateQuantity(data)}</span>
                <span>Items</span>
              </div>
            </div>
            <div className="space-y-4 overflow-y-auto">
              {order?.products.map((item:any, index:any) => (
                <div
                  key={index}
                  className="flex justify-between py-0.5 text-xs font-semibold text-black-primary"
                >
                  <div className="">
                    {item?.quantity}x {item?.name}
                  </div>
                  <div className="">${item.amount}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
                Status:{' '}
                {order
                  ? onGetOrderCurrentStatus(order, estimatedTime)?.status
                  : location?.state?.status}
              </h1>
              <div className="text-xs text-transparent">
                {moment(order?.createdAt).format('MMM D, YYYY @ h:mm A')}
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>Address</div>
              <div className="border-b border-black-primary border-opacity-20 py-2 font-semibold">
                <div className="text-black-primary">
                  {order?.customer_location?.label}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!order?.dispensary_approved && (
          <hr className="text-black-primary text-opacity-20" />
        )}
        <div className="flex items-center justify-between">
          <div className="text-normal font-semibold text-black-primary"></div>
          {order?.dispensary_approved && order.order_status ? (
            <button
              onClick={onCancelOrder}
              className="h-full w-32 text-danger underline underline-offset-4"
            >
              Cancel Order
            </button>
          ) : (
            <div className="h-8 space-x-2 text-sm ">
              <button
                onClick={onCancelOrder}
                className="h-full w-32 text-danger underline underline-offset-4"
              >
                Reject Order
              </button>
              <button
                onClick={onApproveOrder}
                className="h-full w-32 rounded-md bg-purple-primary font-medium text-white sm:font-semibold"
              >
                Approve Order
              </button>
            </div>
          )}
        </div>
        {order?.dispensary_approved && order?.driver_assigned && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-base font-semibold text-black-primary">
                Driver Information
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col text-sm">
                  <div>Driver</div>
                  <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
                    <div className="text-black-primary">
                      {order?.driver?.fname + ' ' + order?.driver?.lname}
                    </div>
                    <div
                      className="cursor-pointer text-purple-primary"
                      onClick={() =>
                        navigate('/chat', {
                          state: { ...order, estimatedTime },
                        })
                      }
                    >
                      Contact
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-sm">
                  <div>Estimated Arrival Time</div>
                  <div className="border-b border-black-primary border-opacity-20 py-2 font-semibold">
                    <div className="text-black-primary">{estimatedTime}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName="w-full h-screen"
                  center={customerLocation}
                  zoom={10}
                >
                  {/* Render directions on the map */}
                  {directions && (
                    <DirectionsRenderer
                      directions={directions}
                      options={{
                        polylineOptions: {
                          strokeColor: 'purple', // Set the route color to purple
                        },
                      }}
                    />
                  )}

                  {/* Render markers for the customer and the shop */}
                  <MarkerF
                    position={customerLocation}
                    label="Customer"
                    icon={{
                      url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', // URL to the custom customer icon image
                      scaledSize: new window.google.maps.Size(30, 30), // Size of the icon
                    }}
                  />
                  <MarkerF
                    position={shopLocation}
                    label="Shop"
                    icon={{
                      url: ASSETS.LOGO, // URL to the custom shop icon image
                      scaledSize: new window.google.maps.Size(30, 30), // Size of the icon
                    }}
                  />
                </GoogleMap>
              )}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};
