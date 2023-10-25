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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload.data;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    builder.addCase(onUpdateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const userIndex = state.users.findIndex((item) => item?._id === action?.payload?.data._id);
      if (userIndex !== -1) {
   
        state.users[userIndex] = action.payload.data;
      }
    });
    builder.addCase(onUpdateUser.rejected, (state, action) => {
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

export const onUpdateUser = createAsyncThunk(
  'users/onUpdateUser',
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

export const { onResetUsersList } = userSlice.actions;

export default userSlice.reducer;
