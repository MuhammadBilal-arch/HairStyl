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
      state.products = action.payload.data;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    // DELETE ITEM
    builder.addCase(onDeleteProduct?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onDeleteProduct?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const FilteredProducts = state.products.filter(
        (item) => item?._id !== action?.payload?.data?._id
      );
      state.products = FilteredProducts;
    });
    builder.addCase(onDeleteProduct?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    // ADD ITEM
    builder.addCase(onAddProduct?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onAddProduct?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
      state.products?.push(action?.payload?.data);
    });
    builder.addCase(onAddProduct?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });

    // UPDATE ITEM
    builder.addCase(onUpdateProduct?.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateProduct?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state?.products.findIndex(
        (item) => item?._id === action?.payload?.data?._id
      );
      if (index !== -1) {
        state.products[index] = action.payload.data;
      }
    });
    builder.addCase(onUpdateProduct?.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchAllProducts = createAsyncThunk(
  'categories/fetchAllProducts',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const result = await API_HANDLER_FORM_DATA(
        'GET',
        `${END_POINTS.PRODUCTS.GET_BY_ID}?dispensary=${payload?.dispensary}&category=${payload?.category}`,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const onDeleteProduct = createAsyncThunk(
  'categories/onDeleteProduct',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const result = await API_HANDLER_FORM_DATA(
        'DELETE',
        END_POINTS.PRODUCTS.DELETE,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const onAddProduct = createAsyncThunk(
  'categories/onAddProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'POST',
        END_POINTS.PRODUCTS.ADD,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const onUpdateProduct = createAsyncThunk(
  'categories/onUpdateProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'PATCH',
        END_POINTS.PRODUCTS.UPDATE,
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
