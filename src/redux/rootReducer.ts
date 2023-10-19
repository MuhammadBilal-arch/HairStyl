import { combineReducers } from '@reduxjs/toolkit';
import CategorySlice from './slices/category';
import OrderSlice from './slices/orders';
import ProductSlice from './slices/products';
import UserSlice from './slices/user/user';
import CustomersSlice from './slices/customers';
import DispensariesSlice from './slices/dispensaries';
import TransactionSlice from './slices/transactions';
import DriverSlice from './slices/drivers';
import TaxesSlice from './slices/taxes';
import NotificationSlice from './slices/notifications';

export const rootReducer = combineReducers({
  Category: CategorySlice,
  Orders: OrderSlice,
  Products: ProductSlice,
  User: UserSlice,
  Users: CustomersSlice,
  Dispensaries: DispensariesSlice,
  Transaction: TransactionSlice,
  Drivers: DriverSlice,
  Taxes: TaxesSlice,
  Notifications: NotificationSlice,
});
