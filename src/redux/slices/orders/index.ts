import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
import { TOAST_TYPE } from '../../../utils/constants';
// import { TOAST_TYPE } from '../../../utils/constants';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    onResetOrderState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // FETCH ORDERS
    builder.addCase(onFetchOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onFetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.data;
    });
    builder.addCase(onFetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload || null;
      // showToast(
      //   action?.payload?.message || 'Error Occurred.',
      //   TOAST_TYPE.error
      // );
    });

    // UPDATE ORDER
    builder.addCase(onUpdateOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const updatedOrderIndex = state.orders.findIndex(
        (item:any) => item?._id === action?.payload.data._id
      );
      if (updatedOrderIndex !== -1) {
        state.orders[updatedOrderIndex] = action.payload.data;
      }
      showToast(action?.payload?.message, TOAST_TYPE.success);
    });
    builder.addCase(onUpdateOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      showToast(
        action?.payload?.message || 'Error Occurred.',
        TOAST_TYPE.error
      );
    });
  },
});

export const onFetchOrders = createAsyncThunk(
  'orders/onFetchOrders',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'GET',
        `${END_POINTS.ORDER.GET_ID}?id=${payload?.id}`,
        {}
      );
      const data = await result?.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const onUpdateOrder = createAsyncThunk(
  'orders/onUpdateOrder',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'PATCH',
        END_POINTS.ORDER.UPDATE,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { onResetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
