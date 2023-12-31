import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_HANDLER,
  API_HANDLER_FORM_DATA,
  showToast,
} from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    onResetUsersList() {
      return initialState;
    },

    // onUpdateUserStatus: (state, action) => {
    //   console.log(action.payload)
    //   const userIndex = state.users.findIndex((item) => item?.id == action?.payload?._id);
    //   if (userIndex !== -1) { 
    //     state.users[userIndex].status = action.payload.status
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    builder.addCase(onUpdateUserStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateUserStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const userIndex = state.users.findIndex((item) => item?.id === action?.payload?._id);
      if (userIndex !== -1) {
   
        state.users[userIndex].status = action.payload.status;
      }
    });
    builder.addCase(onUpdateUserStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        END_POINTS.USERS.GET_ALL,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const onUpdateUserStatus = createAsyncThunk(
  'users/onUpdateUserStatus',
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

export const { onResetUsersList } = userSlice.actions;

export default userSlice.reducer;
