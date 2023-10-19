import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
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
      state.categories = action.payload.data;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    // DELETE ITEM
    builder.addCase(onDeleteCategory?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onDeleteCategory?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
      const FilteredCategories = state.categories.filter(
        (item) => item?._id !== action?.payload?.data?._id
      );
      state.categories = FilteredCategories;
    });
    builder.addCase(onDeleteCategory?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    // ADD ITEM
    builder.addCase(onAddCategory?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onAddCategory?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
      state.categories.push(action?.payload?.data);
    });
    builder.addCase(onAddCategory?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
    // UPDATE
    builder.addCase(onUpdateCategory?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateCategory?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const userIndex = state.categories.findIndex(
        (item) => item?._id === action?.payload?.data._id
      );
      if (userIndex !== -1) {
        state.categories[userIndex] = action.payload.data;
      }
      showToast(action.payload.message || 'Error Occurred.', TOAST_TYPE.info);
    });
    builder.addCase(onUpdateCategory?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async (payload, { rejectWithValue }) => {
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

export const onDeleteCategory = createAsyncThunk(
  'categories/onDeleteCategory',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const result = await API_HANDLER_FORM_DATA(
        'DELETE',
        END_POINTS.CATEGORIES.DELETE,
        payload
      );
      const data = await result?.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const onAddCategory = createAsyncThunk(
  'categories/onAddCategory',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'POST',
        END_POINTS.CATEGORIES.ADD,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const onUpdateCategory = createAsyncThunk(
  'categories/onUpdateCategory',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'PATCH',
        END_POINTS.CATEGORIES.UPDATE,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const { onResetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
