import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
// import { TOAST_TYPE } from "../../../utils/constants";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    onResetProductState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
 
  },
});

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (payload:any, { rejectWithValue }) => {
    try {
 
      const result = await API_HANDLER_FORM_DATA(
        'GET',
        `${END_POINTS.PRODUCTS.GET_ALL}`,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { onResetProductState } = productSlice.actions;

export default productSlice.reducer;
