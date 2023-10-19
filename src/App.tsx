import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Orders } from './pages/Orders/Orders';
import { OrderDetail } from './pages/Orders/detail';
import { PastOrders } from './pages/Orders/pastOrders';
import { Inventory } from './pages/Inventory';
import { EditInventory } from './pages/Inventory/editCategory';
import { Profile } from './pages/Profile';

import { Settings } from './pages/Settings/index';
import { Revenue } from './pages/Revenue';
import Chart from './pages/Chart';
import { ModalProvider } from './utils/context/modalContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import { SignIn } from './pages/Authentication';
import { ChatComponent } from './pages/chat';
import { SocketProvider } from './context/socketContext';
import { Customer } from './pages/Customers';
import { CustomerDetail } from './pages/Customers/detail';
import { AddDispensary } from './pages/Dispensaries/add';
import { Dispensaries } from './pages/Dispensaries';
import { DispensaryDetail } from './pages/Dispensaries/detail';
import { Drivers } from './pages/Drivers';
import { DriversDetail } from './pages/Drivers/detail';
import { AdminOrderDetail } from './components/orderDetails';
import { ResetPassword } from './pages/Authentication/resetPassword';
import { ResetPasswordOtp } from './pages/Authentication/resetPasswordOtp';
import { ResetPasswordEmail } from './pages/Authentication/resetPasswordEmail';

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
                <Route path="/reset-password-email" element={<ResetPasswordEmail />} />
                <Route path="/reset-password-otp" element={<ResetPasswordOtp />} />

                <Route path="/chat" element={<ChatComponent />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order-detail" element={<OrderDetail />} />
                <Route path="/past-orders" element={<PastOrders />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/edit-inventory" element={<EditInventory />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/revenue" element={<Revenue />} /> 
                <Route path="/settings" element={<Settings />} />
                <Route path="/chart" element={<Chart />} /> 

                <Route path="/customers" element={<Customer />} />
                <Route path="/customer-detail" element={<CustomerDetail />} />

                <Route path="/dispensaries" element={<Dispensaries />} />
                <Route path="/add-dispensary" element={<AddDispensary />} />
                <Route path="/dispensary-detail" element={<DispensaryDetail />} />

                <Route path="/drivers" element={<Drivers />} />
                <Route path="/driver-detail" element={<DriversDetail />} />
                <Route path="/order-details" element={<AdminOrderDetail />} /> 
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
