import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER, API_HANDLER_FORM_DATA } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';

const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    onResetTransactionsList() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionsList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactionsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.transactions = action.payload.data;
    });
    builder.addCase(fetchTransactionsList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  },
});

export const fetchTransactionsList = createAsyncThunk(
  'dispensaries/fetchTransactionsList',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'POST',
        END_POINTS.TRANSACTIONS.GET_ALL,
        payload
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const { onResetTransactionsList } = transactionsSlice.actions;

export default transactionsSlice.reducer;
