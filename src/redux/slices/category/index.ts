import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER, API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
import { TOAST_TYPE } from '../../../utils/constants';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    onResetCategoryState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    builder.addCase(onUpdateCategoryStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateCategoryStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const userIndex = state.categories.findIndex((item) => item?.id === action?.payload?._id);
      if (userIndex !== -1) {
        state.categories[userIndex].status = action.payload.status;
      }
    });
    builder.addCase(onUpdateCategoryStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  }
});

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async (payload:any, { rejectWithValue }) => {
    try {
      console.log(payload);
      const result = await API_HANDLER_FORM_DATA(
        'GET',
        END_POINTS.CATEGORIES.GET_ALL,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const onUpdateCategoryStatus = createAsyncThunk(
  'users/onUpdateUserStatus',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER(
        'GET',
        `${END_POINTS.CATEGORIES.UPDATE}/${payload?._id}`,
        {}
      );
      // const data = await result.data;
      return payload;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { onResetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
