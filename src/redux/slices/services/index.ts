import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_HANDLER, API_HANDLER_FORM_DATA, showToast } from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints'; 

const initialState = {
  services: [],
  isLoading: false,
  error: null,
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    onResetCategoryState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllServices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllServices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.services = action.payload.data != null ? action.payload.data : [];
    });
    builder.addCase(fetchAllServices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // showToast(action.payload.message || "Error Occurred.", TOAST_TYPE.error);
    });
  }
});

export const fetchAllServices = createAsyncThunk(
  'services/fetchAllServices',
  async (payload:any, { rejectWithValue }) => {
    try { 
      const result = await API_HANDLER_FORM_DATA(
        'GET',
        END_POINTS.SERVICES.GET_ALL + `/${payload.id}`,
        {}
      );
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { onResetCategoryState } = servicesSlice.actions;

export default servicesSlice.reducer;
