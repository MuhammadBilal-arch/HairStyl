import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_HANDLER,
  API_HANDLER_FORM_DATA,
  setLocalStorage,
  showToast,
} from '../../../utils/functions';
import { END_POINTS } from '../../../utils/endpoints';
import { TOAST_TYPE } from '../../../utils/constants';

const initialState = {
  user: {} as any,
  isLoading: false,
  isLogged: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onResetUserState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // ON LOGIN USER
    builder.addCase(onLoginUser.pending, (state) => {
      state.isLoading = true;
      state.isLogged = false;
      state.error = null;
    });
    builder.addCase(onLoginUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        setLocalStorage('Token', action?.payload?.token);
        showToast(action?.payload?.message, TOAST_TYPE.success);
        state.isLoading = false;
        state.isLogged = true; 
      
    });
    builder.addCase(onLoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
      state.error = action?.payload?.message;
      showToast(action?.payload?.message || 'Error Occurred.', TOAST_TYPE.error);
    });

    //  ON UPDATE
    builder.addCase(onUpdateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action?.payload?.user;
      showToast(action.payload?.message, TOAST_TYPE.success);
    });
    builder.addCase(onUpdateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || 'Error Occurred.';;
      showToast(action?.payload?.message || 'Error Occurred.', TOAST_TYPE.error);
    });
  },
});

export const onLoginUser = createAsyncThunk(
  'user/onLoginUser',
  async (payload:any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER('POST', END_POINTS.AUTH.LOGIN, payload);
      const data = await result.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const onUpdateUser = createAsyncThunk(
  'user/onUpdateUser',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await API_HANDLER_FORM_DATA(
        'POST',
        END_POINTS.ADMINS.UPDATE,
        payload
      );
      const data = await result?.data;
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { onResetUserState } = userSlice.actions;

export default userSlice.reducer;
