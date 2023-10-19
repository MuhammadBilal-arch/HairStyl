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

export const AdminOrderDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB4rhPN6CCk7S80itxLaDM8_EQfHuZprVQ',
  });

  const [directions, setDirections] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  // console.log(location.state)
  const data = location?.state;

  const customerLocation = {
    lat: data?.order_id?.customer_location?.lat,
    lng: data?.order_id?.customer_location?.lng,
  };
  console.log(data.order_id);
  const shopLocation = {
    lat: data?.dispensary_id?.latitude,
    lng: data?.dispensary_id?.longitude,
  };
  // console.log(data.dispensary_id);
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
                Order #{data?.order_id?.order_id}
              </h1>
              <div className="text-xs text-black-base">
                {moment(data?.order_id?.createdAt).format(
                  'MMM D, YYYY @ h:mm A'
                )}
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>Customer</div>
              <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
                <div className="text-black-primary">
                  {data?.customer_id?.fname + ' ' + data?.customer_id?.lname}
                </div>
                <div
                  className="cursor-pointer text-purple-primary"
                  onClick={() =>
                    navigate('/customer-detail', {
                      state: data.customer_id
                    })
                  }
                >
                  View Profile
                </div>
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>Dispensary</div>
              <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
                <div className="text-black-primary">
                  {data?.dispensary_id?.name}
                </div>
                <div
                  className="cursor-pointer text-purple-primary"
                  onClick={() =>
                    navigate('/dispensary-detail', {
                      state: data.dispensary_id
                    })
                  }
                >
                  View Profile
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b border-black-primary border-opacity-20 py-2 text-sm">
              <div>Order Details</div>
              <div className="space-x-1 text-sm font-semibold text-black-primary">
                <span>{calculateQuantity(data?.order_id)}</span>
                <span>Items</span>
              </div>
            </div>
            <div className="space-y-4 overflow-y-auto">
              {data?.order_id?.products.map((item: any, index: any) => (
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
                {onGetOrderCurrentStatus(data?.order_id, estimatedTime)?.status}
              </h1>
              <div className="text-xs text-transparent">
                {moment(data?.order_id?.createdAt).format(
                  'MMM D, YYYY @ h:mm A'
                )}
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>Address</div>
              <div className="border-b border-black-primary border-opacity-20 py-2 font-semibold">
                <div className="text-black-primary">
                  {data?.order_id?.customer_location?.label} 
                  {}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div>Address</div>
              <div className="border-b border-black-primary border-opacity-20 py-2 font-semibold">
                <div className="text-black-primary">
                  {data?.dispensary_id?.location}
                </div>
              </div>
            </div>
          </div>
        </div>
        {data?.order_id?.dispensary_approved &&
          data?.order_id?.driver_assigned && (
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
                        {data?.driver_id?.fname + ' ' + data?.driver_id?.lname}
                      </div>
                      <div
                        className="cursor-pointer text-purple-primary"
                        onClick={() =>
                          navigate('/driver-detail', {
                            state: data?.driver_id
                          })
                        }
                      >
                        View Profile
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2  gap-8">
                <div className="space-y-2">
                  <div className="text-base font-semibold text-black-primary">
                    Order Route
                  </div>

                  {!isLoaded ? (
                    <h1>Loading...</h1>
                  ) : (
                    <GoogleMap
                      mapContainerClassName="w-full h-96"
                      center={customerLocation}
                      zoom={12}
                    >
                      {/* Render directions on the map */}
                      {directions && (
                        <DirectionsRenderer
                          directions={directions}
                          options={{
                            polylineOptions: {
                              strokeColor: 'purple', // Set the route color to purple
                            },
                            suppressMarkers: true,
                          }}
                        />
                      )}

                      {/* Render markers for the customer and the shop */}
                      <MarkerF
                        position={customerLocation}
                        // label="Customer"
                        icon={{
                          url: ASSETS.PIN,
                          scaledSize: new window.google.maps.Size(30, 30), // Size of the icon
                        }}
                      />
                      <MarkerF
                        position={shopLocation}
                        // label="Shop"
                        icon={{
                          url: ASSETS.SHOP, // URL to the custom shop icon image
                          scaledSize: new window.google.maps.Size(30, 30), // Size of the icon
                        }}
                      />
                    </GoogleMap>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="text-base font-semibold text-black-primary">
                    Delivery Logs
                  </div>
                  <ul>
                    <li>
                      {moment(data?.order_id?.createdAt).format('h:mm A')} Order
                      Placed
                    </li>
                    <li>
                      {data?.order_id?.order_driver_accept_date &&
                        moment(data?.order_id?.order_driver_accept_date).format(
                          'h:mm A'
                        ) + " " + 'Driver Accepted Order'}{' '}
                    </li>
                    <li>
                      {data?.order_id?.order?.order_pickup_date &&
                        moment(data?.order_id?.order?.order_pickup_date).format(
                          'h:mm A'
                        ) + 'Order Picked Up Order'}{' '}
                    </li>
                    <li>
                      {data?.order_id?.order?.order_delivered_date &&
                        moment(
                          data?.order_id?.order?.order_delivered_date
                        ).format('h:mm A') + 'Order Delivered'}{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
      </div>
    </DefaultLayout>
  );
};
