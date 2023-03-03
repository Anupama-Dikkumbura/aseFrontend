import {React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, MenuItem, Select } from '@mui/material';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const GET_STATION_LIST_URL= "/fuelstation";
const REGISTER_URL='/users/register'



const theme = createTheme();

export default function CreateManager(props) {
const navigate = useNavigate();
  const [fuelStation, setFuelStation] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [fuelStationList, setFuelStationList] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(fuelStation);
    const  user = {
      firstName: firstname,
      lastName: lastname,
      phone: phone,
      address: address,
      password: password,
      role: "filling station manager",
      fuelStation: fuelStation

    }
    try {
      // make axios post request
      const response = await axios.post (REGISTER_URL,
        // JSON.stringify({phone: phone,password: password})
        user,
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

  

  const handleFuelStationChange = (event) => {
    console.log(event.target.value)
    setFuelStation(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  useEffect(() => {
    getStations();
  }, []);
  return (
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoFocus
              onChange={handleFirstNameChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              onChange={handleLastNameChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              onChange={handleAddressChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              onChange={handlePhoneChange}
            />
            <InputLabel id="fuelStationLabel">Fuel Station</InputLabel>
            <Select
                labelId="fuelStation"
                id="fuelStation"
                value={fuelStation}
                label="Fuel Station"
                onChange={handleFuelStationChange}
            >
                {loading &&
                    <MenuItem>Loading....</MenuItem>}
               { !loading &&
              
                fuelStationList?.map((station) => (
              <MenuItem key={station._id} value={station._id}>{station.address}</MenuItem>
          ))}
            </Select>

            <TextField
              margin="dense"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              onChange={handlePasswordChange}
            />
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
  );
}