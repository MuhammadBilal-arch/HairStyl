import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  updateDoc,
} from 'firebase/firestore';
import moment from 'moment';
import { ASSETS } from '../images/path';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(0);
  const navigate = useNavigate();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get a Firestore instance
        const firestore = getFirestore();

        // Reference the "notifications" collection
        const collectionRef = collection(firestore, 'notifications');

        // Fetch all documents in the collection
        const querySnapshot = await getDocs(collectionRef);

        // Initialize an array to store the notifications
        const notifications = [];

        // Loop through each document in the collection
        querySnapshot.forEach((documentSnapshot) => {
          // Access the document data
          const documentData = documentSnapshot.data();
          notifications.push(documentData);
        });

        console.log(notifications);
        setNotifications(notifications);

        const hasStatusOne = notifications.some(
          (notification) => notification.status === 1
        );

        // Set the notification status based on the condition
        setNotificationStatus(hasStatusOne ? 1 : 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const onOpenNotification = async (item) => {
    try {
      // Get a Firestore instance
      const firestore = getFirestore();

      // Reference the document you want to update
      const documentRef = doc(firestore, 'notifications', item?.id);

      // Update the document
      await updateDoc(documentRef, { status: 1 });
      item.user_type === 'vendor'
        ? navigate(`/vendor/${item.user_id}`)
        : navigate(`/user/${item.user_id}`);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center  hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {notificationStatus == 0 && (
          <span className="absolute top-0.5 right-1 z-1 h-2 w-2 rounded-full bg-meta-1">
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
        )}

        <svg
          className="fill-current duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
            fill=""
          />
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-whiten text-black-primary shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-100 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-black-primary">
            Notification
          </h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notifications?.map((item: any, index: number) => (
            <li key={index}>
              <div className="flex flex-col gap-2.5 border-t border-stroke py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                <div className="flex justify-between border-b border-grey-primary border-opacity-20 px-4 pb-2 text-xs">
                  <div className=" flex w-[70%] flex-col space-y-3">
                    <div className="flex space-x-2">
                      <img
                        src={item?.image ? item?.image : ASSETS.DUMMY_IMAGE}
                        alt=""
                        className="h-7 w-7 rounded-full object-contain"
                      />
                      <div className="font-regular text-black-primary dark:text-white ">
                        A new{' '}
                        {item.user_type === 'vendor' ? 'shop' : 'customer'} is
                        registered with name{' '}
                        <div className="font-semibold">"{item.name}"</div>
                      </div>
                    </div>
                    <div className="text-xs text-grey-primary">
                      {moment(item?.createdAt).fromNow()}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenNotification(item)}
                    className="h-7 bg-yellow-primary px-2 py-1 text-xs text-black-primary"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
