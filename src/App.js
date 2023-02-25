import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './pages/adminLogin/AdminLogin';
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardContent from './pages/dashboardContent/DashboardContent';
import FuelStationLogin from './pages/fuelStationLogin/FuelStaionLogin';
import FuelStations from './pages/fuelStations/FuelStations';
import CustomerVehicles from './pages/customerVehicles/CustomerVehicles';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
        <CssBaseline />
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/admin" element={<AdminLogin/>} />
            <Route path="/fuelstationlogin" element={<FuelStationLogin/>} />
            <Route path="/dashboard" element={<Dashboard content={<DashboardContent />} pageTitle="Dashboard"/>} />
            <Route path="/fuelstations" element={<Dashboard content={<FuelStations />} pageTitle="Fuel Stations"/>} />
            <Route path="/vehicles" element={<Dashboard content={<CustomerVehicles />} pageTitle="Vehicles"/>} />
            <Route path="/" element={<Landing />} />
            <Route path="/tes" element={<div>Hello</div>} />
        </Routes>
    </div>

    
    
  );
}

export default App;
