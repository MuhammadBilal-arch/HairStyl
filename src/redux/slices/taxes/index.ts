import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  taxes: [],
  isLoading: false,
  error: null,
};

export const taxesSlice = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    onResetCategoryState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaxes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTaxes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.taxes = action.payload.data;
    });
    builder.addCase(fetchTaxes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
    // UPDATE
    builder.addCase(updateTaxes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTaxes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const updatedOrderIndex = state.taxes.findIndex(
        (item: any) => item?._id === action?.payload.data._id
      );
      if (updatedOrderIndex !== -1) {
        state.taxes[updatedOrderIndex] = action.payload.data;
      }
    });
    builder.addCase(updateTaxes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchTaxes = createAsyncThunk(
  'taxes/fetchTaxes',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA('GET', END_POINTS.TAX.GET, {});
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateTaxes = createAsyncThunk(
  'taxes/updateTaxes',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'PATCH',
        END_POINTS.TAX.UPDATE,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { onResetCategoryState } = taxesSlice.actions;

export default taxesSlice.reducer;
