import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadInitialData } from './utils/loadInitialData';
import Login from './components/Login/Login';
import CustomerTable from './components/CustomerTable/CustomerTable';
import BillGenerator from './components/BillGenerator/BillGenerator';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  useEffect(() => {
    // Load initial data
    loadInitialData(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="content">
          <Routes>
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/customers" />} />
            <Route
              path="/customers"
              element={isLoggedIn ? <CustomerTable /> : <Navigate to="/login" />}
            />
            <Route
              path="/bill-generator"
              element={isLoggedIn ? <BillGenerator /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/customers" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;