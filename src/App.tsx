import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Chart from './pages/Chart';
import { ModalProvider } from './utils/context/modalContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import { SignIn } from './pages/Authentication';
import { SocketProvider } from './context/socketContext';
import { Customer } from './pages/Customers';
import {VendorDetail } from './pages/clients/detail';
// import { AddDispensary } from './pages/Dispensaries/add';
// import { Dispensaries } from './pages/Dispensaries';
// import { DispensaryDetail } from './pages/Dispensaries/detail';
// import { Drivers } from './pages/Drivers';
// import { DriversDetail } from './pages/Drivers/detail';
// import { AdminOrderDetail } from './components/orderDetails';
import { ResetPassword } from './pages/Authentication/resetPassword';
import { ResetPasswordOtp } from './pages/Authentication/resetPasswordOtp';
import { ResetPasswordEmail } from './pages/Authentication/resetPasswordEmail';
import { Clients } from './pages/clients';
import { Staff } from './pages/staff';
import { Products } from './pages/products';
import { Services } from './pages/services';
import ECommerce from './pages/Dashboard/ECommerce';
import { Home } from './pages/home';
import { Sales } from './pages/sales';
import { ProductDetail } from './pages/products/detail';
import { Profile } from './pages/Profile';
import { ManageAccounts } from './pages/Profile/manageAccounts';
import { SalesDetail } from './pages/sales/sales';
import { Categories } from './pages/categories';
import { TermsConditions } from './pages/termsConditions';
import { ServiceCategories } from './pages/services/categories';
import { HomeDetail } from './pages/home/detail';
import { TopRated } from './pages/sales/topRated'; 
import { requestForToken , onMessageListener } from './firebase';
import { showToast } from './utils/functions/index.js';
import { TOAST_TYPE } from './utils/constants';
import { UserDetail } from './pages/Customers/detail.js';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  requestForToken();

  onMessageListener()
    .then((payload) => {

      // showToast({title: payload?.notification?.title, body: payload?.notification?.body}, TOAST_TYPE.success);     
      showToast(payload?.notification?.body, TOAST_TYPE.success);     
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SocketProvider>
            <ModalProvider>
              <Routes>
                {/* <Route path="/calendar" element={<Calendar />} /> */}
                <Route path="/" element={<SignIn />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/reset-password-email"
                  element={<ResetPasswordEmail />}
                />
                <Route
                  path="/reset-password-otp"
                  element={<ResetPasswordOtp />}
                />

                <Route path="/home-detail" element={<HomeDetail />} />
                <Route path="/home" element={<Home />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/products" element={<Products />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/services-list" element={<ServiceCategories />} />
                <Route path="/services/:id" element={<Services />} />
                <Route path="/sales-details" element={<Sales />} />
                <Route path="/sales" element={<SalesDetail />} />
                <Route path="/sales-top-rated" element={<TopRated />} />
                <Route path="/ecommerce" element={<ECommerce />} />
                <Route path="/account" element={<Profile />} />
                <Route path="/manage-accounts" element={<ManageAccounts />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

                <Route path="/vendor/:id" element={<VendorDetail />} />
                <Route path="/user/:id" element={<UserDetail />} />
                <Route path="/product-detail" element={<ProductDetail />} />

                {/* <Route path="/dispensaries" element={<Dispensaries />} />
                <Route path="/add-dispensary" element={<AddDispensary />} />
                <Route path="/dispensary-detail" element={<DispensaryDetail />} /> */}

                {/* <Route path="/drivers" element={<Drivers />} />
                <Route path="/driver-detail" element={<DriversDetail />} />
                <Route path="/order-details" element={<AdminOrderDetail />} />  */}
              </Routes>
            </ModalProvider>
          </SocketProvider>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
