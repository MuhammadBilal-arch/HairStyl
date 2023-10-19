import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_HANDLER,
  API_HANDLER_FORM_DATA,
  showToast,
} from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  drivers: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    onResetDriverList() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.drivers = action.payload.data;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    builder.addCase(onUpdateDriver.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateDriver.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const userIndex = state.drivers.findIndex((item) => item?._id === action?.payload?.data._id);
      if (userIndex !== -1) {
   
        state.drivers[userIndex] = action.payload.data;
      }
    });
    builder.addCase(onUpdateDriver.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'POST',
        END_POINTS.ACCOUNTS.GET,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const onUpdateDriver = createAsyncThunk(
  'drivers/onUpdateDriver',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'PATCH',
        END_POINTS.ACCOUNTS.UPDATE,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { onResetDriverList } = userSlice.actions;

export default userSlice.reducer;
