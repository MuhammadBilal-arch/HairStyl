import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_HANDLER,
  API_HANDLER_FORM_DATA,
  showToast,
} from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  vendors: [],
  topRated: [],
  topSellings: [],
  staff: [],
  isLoadingVendorsData: false,
  error: null,
};

export const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendors.pending, (state) => {
      state.isLoadingVendorsData = true;
      state.error = null;
    });
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = null;
      state.vendors = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchVendors.rejected, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
    builder.addCase(fetchTopRatedVendors.pending, (state) => {
      state.isLoadingVendorsData = true;
      state.error = null;
    });
    builder.addCase(fetchTopRatedVendors.fulfilled, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = null;
      state.topRated = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchTopRatedVendors.rejected, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
    builder.addCase(fetchTopSellingVendors.pending, (state) => {
      state.isLoadingVendorsData = true;
      state.error = null;
    });
    builder.addCase(fetchTopSellingVendors.fulfilled, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = null;
      state.topSellings = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchTopSellingVendors.rejected, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
    // FETCH VENDOR STAFF
    builder.addCase(fetchStaff.pending, (state) => {
      state.isLoadingVendorsData = true;
      state.error = null;
    });
    builder.addCase(fetchStaff.fulfilled, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = null;
      state.staff =
        action.payload.data != null
          ? action?.payload?.data.flatMap((item) =>
              item.employees ? item.employees : []
            )
          : [];
    });
    builder.addCase(fetchStaff.rejected, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    builder.addCase(onUpdateVendorStatus.pending, (state) => {
      state.isLoadingVendorsData = true;
      state.error = null;
    });
    builder.addCase(onUpdateVendorStatus.fulfilled, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = null;
      const userIndex = state.vendors.findIndex(
        (item) => item?.id === action?.payload?._id
      );
      if (userIndex !== -1) {
        state.vendors[userIndex].status = action.payload.status;
      }
    });
    builder.addCase(onUpdateVendorStatus.rejected, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
    builder.addCase(onUpdateTopSellingStatus.pending, (state) => {
      state.isLoadingVendorsData = true;
      state.error = null;
    });
    builder.addCase(onUpdateTopSellingStatus.fulfilled, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = null;
      const userIndex = state.topSellings.findIndex(
        (item) => item?.id === action?.payload?._id
      );
      if (userIndex !== -1) {
        state.topSellings[userIndex].status = action.payload.status;
      }
    });
    builder.addCase(onUpdateTopSellingStatus.rejected, (state, action) => {
      state.isLoadingVendorsData = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchVendors = createAsyncThunk(
  'vendors/fetchVendors',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        END_POINTS.VENDORS.GET_ALL,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const fetchTopRatedVendors = createAsyncThunk(
  'vendors/fetchTopRatedVendors',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        END_POINTS.VENDORS.TOP_RATED,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const fetchTopSellingVendors = createAsyncThunk(
  'vendors/fetchTopSellingVendors',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        END_POINTS.VENDORS.TOP_RATED,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const fetchStaff = createAsyncThunk(
  'vendors/fetchStaff',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        END_POINTS.VENDORS.GET_ALL,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const onUpdateVendorStatus = createAsyncThunk(
  'vendors/onUpdateVendorStatus',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        `${END_POINTS.ACCOUNTS.UPDATE}/${payload?._id}/${payload?.status}`,
        {}
      );
      // const data = await result.data;
      return payload;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const onUpdateTopSellingStatus = createAsyncThunk(
  'vendors/onUpdateTopSellingStatus',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        `${END_POINTS.ACCOUNTS.UPDATE}/${payload?._id}/${payload?.status}`,
        {}
      );
      // const data = await result.data;
      return payload;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const {} = vendorSlice.actions;

export default vendorSlice.reducer;
