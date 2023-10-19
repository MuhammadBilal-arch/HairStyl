import axios from "axios";
import { BASE_URL } from "../urls";
import { toast } from "react-toastify";
import { ORDER_STATUS, TOAST_TYPE } from "../constants";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const onMinimizeString = (text, count) => {
  return text.length > count ? text.substring(1, count) + "..." : text;
};

export const onCleanString = (stringWithHtml) => {
  return stringWithHtml.replace(/<\/?[^>]+(>|$)/g, "");
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
        "Content-Type": "application/json",

        authorization: `Bearer ${getLocalStorage("Token")}`,
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
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${getLocalStorage("Token")}`,
      },
      data: data,
      params: data.params,
    };

    const result = await axios(config);

    return {
      data: result.data,
    };
  } catch (error:any) {
    // console.log(error?.response?.data?.message);
    showToast(error?.response?.data?.message, TOAST_TYPE.error);
  }
};

const config = {
  position: "top-center",
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
  console.log(data)

  if (!order_status) {
    return {
      status: ORDER_STATUS.ORDER_CANCELLED,
      dateTime: moment(order_cancellation_date).format("MMM D, YYYY @ h:mm A"),
    };
  }
  if (!dispensary_approved) {
    return {
      status: ORDER_STATUS.ORDER_APPROVAL,
      dateTime: moment(order_cancellation_date).format("MMM D, YYYY @ h:mm A"),
    };
  }
  if (driver_assigned && !order_awaiting_pickup && !order_in_transit) {
    return {
      status: ORDER_STATUS.ORDER_AWAITING_PICKUP,
      dateTime: moment(order_driver_accept_date).format("MMM D, YYYY @ h:mm A"),
    };
  }

  if (!dispensary_approved || (!order_awaiting_pickup && !driver_assigned)) {
    return {
      status: ORDER_STATUS.ORDER_PLACED,
      dateTime: moment(createdAt).format("MMM D, YYYY @ h:mm A"),
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
      dateTime: moment(order_delivered_date).format("MMM D, YYYY @ h:mm A"),
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
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();   
  const ageDifferenceMs = currentDate - dob; 
  const ageInYears = ageDifferenceMs / (1000 * 60 * 60 * 24 * 365.25);
  const age = Math.floor(ageInYears);
  return age;
}