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
import VendorSlice from './slices/vendors';
import AdminSlice from './slices/admins';
import ServiceSlice from './slices/services';

export const rootReducer = combineReducers({
  Vendors: VendorSlice,
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
  Admins: AdminSlice,
  Services: ServiceSlice
});
