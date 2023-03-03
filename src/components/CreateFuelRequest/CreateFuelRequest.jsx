import {React, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from '../../api/axios';
const GET_STATION_LIST_URL= "/fuelstation";
const GET_VEHICLES = "/vehicle/";
const FUEL_REQ='/customerreq'


const theme = createTheme();
  

export default function CreateFuelRequest(props) {

  const [fuelStationList, setFuelStationList] = useState([]);
  const [vehicleList, setVehicleList]=useState([]);
  const [loading, setLoading] = useState(false);

  const [vehicle, setVehicle] = useState('');
  const [fuelStation, setFuelStation] = useState('');
  const [dateTime, setDateTime] = useState(dayjs('2023-03-04T21:11:54'));
  const [fuelAmount, setFuelAmount] = useState('');
  const [notifications, setNotifications] = useState('');

  const handleVehicleChange = (event) => {
    setVehicle(event.target.value);
  };
  const handleFuelStationChange = (event) => {
    setFuelStation(event.target.value);
  };
  const handleFuelAmountChange = (event) => {
    setFuelAmount(event.target.value);
  };
  const handleNotificationsChange = (event) => {
    setNotifications(event.target.value);
  };
  const handleDateTimeChange = (dateTime) => {
    setDateTime(dateTime);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const  request = {
      vehicleNumber: vehicle,
      requestFuelType:"petrol92",
      requestFuelStation: fuelStation,
      requestQuota: fuelAmount,
      expectedFillingTime :dateTime,
      expectedFillingDate :dateTime,
      notification: notifications,
      user: localStorage.getItem("userID")

    }
    try {
      // make axios post request
      const response = await axios.post (FUEL_REQ,
        // JSON.stringify({phone: phone,password: password})
        request,
        {
          headers:{
            "Content-Type": "application/json",
          }
        });
        props.setOpenModal(false);
        console.log(JSON.stringify(response?.data));
        const role = response?.data?.role;
        console.log(role);
        window.location.reload(false);
      
    } catch(error) {
      console.log(error)
    }
  };

  const getStations = async ()=>{
    setLoading(true);
    await axios.get(GET_STATION_LIST_URL)
    .then(res=>{
      setFuelStationList(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  const getVehicles = async ()=>{
    setLoading(true);
    await axios.get(GET_VEHICLES)
    .then(res=>{
      setVehicleList(res.data.vehicles);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getStations();
  }, []);

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
            
            <InputLabel id="vehicleLabel">Vehicle</InputLabel>
            <Select
                labelId="vehicle"
                id="vehicle"
                value={vehicle}
                onChange={handleVehicleChange}
            >
                {loading &&
                    <MenuItem>Loading....</MenuItem>}
               { !loading &&
              
              vehicleList.filter(v => v.user ===localStorage.getItem("userID"))
              .map((vehicle) => (
              <MenuItem key={vehicle._id} value={vehicle._id}>{vehicle.vehicleNumber}</MenuItem>
          ))}
            </Select>
            <InputLabel margin='normal' id="fuelStationLabel">Fuel Station</InputLabel>
            <Select
                labelId="fuelStation"
                id="fuelStation"
                value={fuelStation}
                onChange={handleFuelStationChange}
            >
                {loading &&
                    <MenuItem>Loading....</MenuItem>}
               { !loading &&
              
                fuelStationList?.map((station) => (
              <MenuItem key={station._id} value={station._id}>{station.address}</MenuItem>
          ))}
            </Select>
            <br></br><br></br>
            <DateTimePicker
            label="Date&Time picker"
            value={dateTime}
            onChange={handleDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="fuelAmount"
              label="Fuel Amout"
              name="fuelAmount"
              type="number"
              value={fuelAmount}
              onChange={handleFuelAmountChange}
            />
            <Typography position="right" fontSize="15px">Remaining: 5L</Typography>

            <InputLabel margin='normal' id="notificationsLabel">Notifications</InputLabel>
            <Select
                labelId="notification"
                id="notification"
                label="How you like to get notified?"
                value={notifications}
                onChange={handleNotificationsChange}
            >
                <MenuItem value={"sms"}>SMS</MenuItem>
                <MenuItem value={"email"}>Email</MenuItem> 
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {props.btntext}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </LocalizationProvider>
  );
}