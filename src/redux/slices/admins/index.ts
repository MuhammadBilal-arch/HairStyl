import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_HANDLER,
} from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';


const initialState = {
  admins: [],
  isLoading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    onResetUsersList() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdmins.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload, 'action.payload');
      state.admins = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    builder.addCase(onUpdateAdminStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateAdminStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const userIndex = state.admins.findIndex((item) => item?.id === action?.payload?._id);
      if (userIndex !== -1) {
        state.admins[userIndex].status = action.payload.status;
      }
    });
    builder.addCase(onUpdateAdminStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        END_POINTS.ADMINS.GET_ALL,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const onUpdateAdminStatus = createAsyncThunk(
  'users/onUpdateAdminStatus',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        `${END_POINTS.ACCOUNTS.UPDATE}/${payload?._id}/${payload?.status}`,
        {}
      );
      // const data = await result.data;
      return payload;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const { onResetUsersList } = adminSlice.actions;

export default adminSlice.reducer;
