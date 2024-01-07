import axios from 'axios';
import { BASE_URL, NORMAL_BASE_URL } from '../urls';
import { toast } from 'react-toastify';
import { ORDER_STATUS, TOAST_TYPE } from '../constants';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const onMinimizeString = (text, count) => {
  return text.length > count ? text.substring(1, count) + '...' : text;
};

export const onCleanString = (stringWithHtml) => {
  return stringWithHtml.replace(/<\/?[^>]+(>|$)/g, '');
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const onGetTotalAmount = (list) => {
  const totalAmount = list.reduce(
    (total, item) => total + item.amount * item.quantity,
    0
  );
  return totalAmount;
};

export const API_HANDLER = async (method, endpoint, data) => {
  var config = {
    method: method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',

      authorization: `Bearer ${getLocalStorage('Token')}`,
    },
    data: data,
  };

  const result = await axios(config);

  return {
    data: result?.data,
  };
};

export const API_HANDLER_FORM_DATA = async (method, endpoint, data) => {
  try {
    var config = {
      method: method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${getLocalStorage('Token')}`,
      },
      data: data,
      params: data.params,
    };

    const result = await axios(config);

    return {
      data: result.data,
    };
  } catch (error: any) {
    // console.log(error?.response?.data?.message);
    showToast(error?.response?.data?.message, TOAST_TYPE.error);
  }
};

export const API_HANDLER_FORM_DATA_NORMAL = async (method, endpoint, data) => {
  try {
    var config = {
      method: method,
      url: `${NORMAL_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${getLocalStorage('Token')}`,
      },
      data: data,
      params: data.params,
    };

    const result = await axios(config);

    return {
      data: result.data,
    };
  } catch (error: any) {
    // console.log(error?.response?.data?.message);
    showToast(error?.response?.data?.message, TOAST_TYPE.error);
  }
};


const config = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

export const showToast = (message, type = TOAST_TYPE.info) => {
  switch (type) {
    case TOAST_TYPE.info:
      return toast.info(message, config);

    case TOAST_TYPE.success:
      return toast.success(message, config);

    case TOAST_TYPE.warning:
      return toast.warning(message, config);

    case TOAST_TYPE.error:
      return toast.error(message, config);

    default:
      return toast.info(message, config);
  }
};

export const onGetOrderCurrentStatus = (data, estimatedTime) => {
  const {
    order_status,
    dispensary_approved,
    order_awaiting_pickup,
    driver_assigned,
    order_in_transit,
    order_delivered,
    order_cancellation_date,
    createdAt,
    order_delivered_date,
    order_driver_accept_date,
  } = data;
  console.log(data);

  if (!order_status) {
    return {
      status: ORDER_STATUS.ORDER_CANCELLED,
      dateTime: moment(order_cancellation_date).format('MMM D, YYYY @ h:mm A'),
    };
  }
  if (!dispensary_approved) {
    return {
      status: ORDER_STATUS.ORDER_APPROVAL,
      dateTime: moment(order_cancellation_date).format('MMM D, YYYY @ h:mm A'),
    };
  }
  if (driver_assigned && !order_awaiting_pickup && !order_in_transit) {
    return {
      status: ORDER_STATUS.ORDER_AWAITING_PICKUP,
      dateTime: moment(order_driver_accept_date).format('MMM D, YYYY @ h:mm A'),
    };
  }

  if (!dispensary_approved || (!order_awaiting_pickup && !driver_assigned)) {
    return {
      status: ORDER_STATUS.ORDER_PLACED,
      dateTime: moment(createdAt).format('MMM D, YYYY @ h:mm A'),
    };
  }

  if (order_awaiting_pickup && driver_assigned && !order_in_transit) {
    return {
      status: ORDER_STATUS.ORDER_AWAITING_PICKUP,
      dateTime: estimatedTime,
    };
  }

  if (order_in_transit) {
    return {
      status: ORDER_STATUS.ORDER_IN_TRANSIT,
      dateTime: estimatedTime,
    };
  }

  if (order_delivered) {
    return {
      status: ORDER_STATUS.ORDER_COMPLETED,
      dateTime: moment(order_delivered_date).format('MMM D, YYYY @ h:mm A'),
    };
  }
};

export const calculateQuantity = (data) => {
  let result = data?.products?.reduce(
    (total, item) => total + parseInt(item?.quantity),
    0
  );
  return result;
};

export const calculateAge = (dateOfBirth: any) => {
  const dob = new Date(dateOfBirth) as any;
  const currentDate = new Date() as any;
  const ageDifferenceMs = currentDate - dob;
  const ageInYears = ageDifferenceMs / (1000 * 60 * 60 * 24 * 365.25);
  const age = Math.floor(ageInYears);
  return age;
};

export const calculateMonthlyData = (data: any[]) => {
  // Initialize arrays to store monthly totals
  const tokenAmounts = Array(12).fill(0);
  const remainingAmounts = Array(12).fill(0);
  let totalTokenAmount = 0;
  // Iterate over the data
  for (const item of data) {
    const createdAt = new Date(item.created_at);
    const monthIndex = createdAt.getMonth();

    // Update totals based on the month
    tokenAmounts[monthIndex] += parseInt(item.tokenAmount) || 0;
    remainingAmounts[monthIndex] += parseInt(item.remaingAmount) || 0;

    totalTokenAmount += tokenAmounts[monthIndex];
  }

  return { tokenAmounts, remainingAmounts , totalTokenAmount };
};

// Calculate weekly totals for last 30 days
export const calculateLast30DaysData = (data: any[]) => {
  const currentDate = new Date() as any;
  const weeks = Array.from({ length: 4 }, () => [0, 0]); // Initialize each week with [0, 0]

  data.forEach(item => {
    const createdAtDate = new Date(item.created_at) as any;
    const daysDifference = Math.floor((currentDate - createdAtDate) / (24 * 60 * 60 * 1000));

    if (daysDifference >= 0 && daysDifference < 30) {
      // Calculate the week index
      const weekIndex = Math.floor(daysDifference / 7);

      // If the item is in the last week, adjust the week index
      const lastWeekIndex = Math.floor((currentDate.getDay() + daysDifference) / 7);
      const adjustedWeekIndex = weekIndex === lastWeekIndex ? 3 : weekIndex;

      weeks[adjustedWeekIndex][0] += parseInt(item.tokenAmount) || 0;
      weeks[adjustedWeekIndex][1] += parseInt(item.remaingAmount) || 0;
    }
  });

  const tokenAmounts = weeks.map(week => week[0]);
  const remainingAmounts = weeks.map(week => week[1]);

  const totalTokenAmount = tokenAmounts.reduce((total, amount) => total + amount, 0);


  return { tokenAmounts, remainingAmounts  , totalTokenAmount };
};

export const calculateCurrentWeekData = (data: any[]) => {
  // Get the current date in UTC
  const currentDate = new Date() as any;
  currentDate.setUTCHours(0, 0, 0, 0);

  // Calculate the start date of the current week (assuming Sunday as the first day of the week)
  const startDate = new Date(currentDate) as any;
  startDate.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());

  // Initialize arrays to store daily totals for the current week
  const tokenAmounts = Array(7).fill(0);
  const remainingAmounts = Array(7).fill(0);

  // Iterate over the data
  for (const item of data) {
    const createdAt = new Date(item.created_at) as any;
    createdAt.setUTCHours(0, 0, 0, 0);

    // Check if the creation date is within the current week
    if (createdAt >= startDate && createdAt < currentDate) {
      // Calculate the day index within the week
      const daysDifference = Math.floor((createdAt - startDate) / (24 * 60 * 60 * 1000));

      // Update totals based on the day of the week
      tokenAmounts[daysDifference] += parseInt(item.tokenAmount) || 0;
      remainingAmounts[daysDifference] += parseInt(item.remaingAmount) || 0;
    }
  }

  const totalTokenAmount = tokenAmounts.reduce((total, amount) => total + amount, 0);

  console.log({ tokenAmounts, remainingAmounts, totalTokenAmount }, 'Weekly Totals for Current Week (UTC)');
  return { tokenAmounts, remainingAmounts, totalTokenAmount };
};


export const calculateLast24HoursData = (data: any[]) => {
  // Initialize arrays to store hourly totals for the last 24 hours
  const tokenAmounts = Array(24).fill(0);
  const remainingAmounts = Array(24).fill(0);

  // Iterate over the last 24 hours
  for (let i = 0; i < 24; i++) {
    // Get the time for the current hour
    const currentTime = new Date().getTime() - i * 60 * 60 * 1000;

    // Filter data for the current hour
    const dataForHour = data.filter(item => {
      const createdAt = new Date(item.created_at).getTime();
      return createdAt > currentTime - 60 * 60 * 1000 && createdAt <= currentTime;
    });

    // Update totals based on the hour
    tokenAmounts[i] = dataForHour.reduce((total, item) => total + parseInt(item.tokenAmount) || 0, 0);
    remainingAmounts[i] = dataForHour.reduce((total, item) => total + parseInt(item.remainingAmount) || 0, 0);
  }

  const totalTokenAmount = tokenAmounts.reduce((total, amount) => total + amount, 0);

  console.log({ tokenAmounts, remainingAmounts, totalTokenAmount }, 'Hourly Totals for Last 24 Hours (UTC)');
  return { tokenAmounts, remainingAmounts, totalTokenAmount };
};

