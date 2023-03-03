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
import FuelRequests from './pages/fuelRequests/FuelRequests';
import Managers from './pages/Managers/Managers';
import ScheduleDelivery from './pages/scheduleDelivery/ScheduleDelivery';
import CustomerRequests from './pages/customerRequests/CustomerRequests';
import Fill from './pages/fill/Fill';
import Reports from './pages/Reports/Reports';
import SignOut from './components/SignOut/SignOut';

function App() {
  return (
    <div className="App">
        <CssBaseline />
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/admin" element={<AdminLogin/>} />
            <Route path="/signout" element={<SignOut/>}/>
            <Route path="/fuelstationlogin" element={<FuelStationLogin/>} />
            <Route path="/dashboard" element={<Dashboard content={<DashboardContent />} pageTitle="Dashboard"/>} />
            <Route path="/reports" element={<Dashboard content={<Reports />} pageTitle="Reports"/>} />

            {/* customer routes */}
            <Route path="/vehicles" element={<Dashboard content={<CustomerVehicles />} pageTitle="Vehicles"/>} />
            <Route path="/fuelrequests" element={<Dashboard content={<FuelRequests />} pageTitle="Fuel Requests"/>} />

           {/* Head Office routes */}
           <Route path="/fuelstations" element={<Dashboard content={<FuelStations />} pageTitle="Fuel Stations"/>} />
           <Route path="/managers" element={<Dashboard content={<Managers />} pageTitle="Managers"/>} />
           <Route path="/schedule" element={<Dashboard content={<ScheduleDelivery />} pageTitle="Delivery Schedule"/>} />

           {/* Filling station routes */}
           <Route path="/customerrequests" element={<Dashboard content={<CustomerRequests />} pageTitle="Customer Requests"/>} />
           <Route path="/fill" element={<Dashboard content={<Fill />} pageTitle="Fill"/>} />
        </Routes>
    </div>

    
    
  );
}

export default App;
