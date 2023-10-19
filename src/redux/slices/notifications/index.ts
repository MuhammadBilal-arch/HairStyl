import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    onResetCategoryState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.notifications = action.payload.data;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
   
  },
});

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA('GET', END_POINTS.NOTIFICATIONS.GET, {});
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

 

export const { onResetCategoryState } = notificationsSlice.actions;

export default notificationsSlice.reducer;
