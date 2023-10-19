import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_HANDLER,
  API_HANDLER_FORM_DATA,
  showToast,
} from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
import { TOAST_TYPE } from '../../../utils/constants';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  dispensaries: [],
  isLoading: false,
  error: null,
};

export const dispensarySlice = createSlice({
  name: 'dispensaries',
  initialState,
  reducers: {
    onResetDispensaryList() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDispensariesList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDispensariesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.dispensaries = action.payload.data;
    });
    builder.addCase(fetchDispensariesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    // ADD DISPENSARY
    builder.addCase(onRegisterDispensary?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onRegisterDispensary?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
      state.dispensaries.push(action?.payload?.data);
      showToast(action?.payload?.message || 'Error Occurred.', TOAST_TYPE.info);
    });
    builder.addCase(onRegisterDispensary?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      showToast(action.payload || 'Error Occurred.', TOAST_TYPE.error);
    });

    //  ON UPDATE
    builder.addCase(onUpdateDispensaryInfo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateDispensaryInfo.fulfilled, (state, action) => {
      const updatedDispensary = action.payload.data; // Assuming the payload contains the updated dispensary data
      
      const index = state.dispensaries.findIndex(
        (item) => item?.dispensary?._id === updatedDispensary._id
      );

      if (index !== -1) {
        state.dispensaries[index].dispensary = updatedDispensary;
        console.log(state.dispensaries[index].dispensary,"UPDATED")
      }
      
      showToast(action.payload?.message, TOAST_TYPE.info);
    });
    builder.addCase(onUpdateDispensaryInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      showToast(action?.payload || 'Error Occurred.', TOAST_TYPE.error);
    });
  },
});

export const fetchDispensariesList = createAsyncThunk(
  'dispensaries/fetchDispensariesList',
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
  'user/onUpdateUser',
  async (payload:any, { rejectWithValue }) => {
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

export const onRegisterDispensary = createAsyncThunk(
  'dispensaries/onRegisterDispensary',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'POST',
        END_POINTS.DISPENSARIES.ADD,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

export const onUpdateDispensaryInfo = createAsyncThunk(
  'dispensaries/onUpdateUserDispensaryInfo',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'PATCH',
        END_POINTS.DISPENSARIES.UPDATE,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { onResetDispensaryList } = dispensarySlice.actions;

export default dispensarySlice.reducer;
