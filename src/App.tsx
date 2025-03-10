import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import CustomerTable from './components/CustomerTable/CustomerTable';
import BillGenerator from './components/BillGenerator/BillGenerator';
import Navigation from './components/Navigation/Navigation';
import '@/styles/main.scss';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { loadInitialData } from './utils/loadInitialData';
import store from './store/store';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadInitialData(dispatch);
  }, [dispatch]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<CustomerTable />} />
          <Route path="/bill-generator" element={<BillGenerator />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
