import {React, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, MenuItem, Select } from '@mui/material';
import axios from '../../api/axios';
const REGISTER_VEHICLE = "/vehicle/register"

const theme = createTheme();

export default function UpdateVehicle(props) {
  const [vehicleNumber, setVehicleNumber] = useState(props.data.vehicleNumber)
  const [vehicleType, setVehicleType] = useState(props.data.vehicleType);
  const [fuelType, setFuelType] = useState(props.data.fuelType);


  const handleUpdate = async (event) => {
    event.preventDefault();
    const vehicle = {
      "vehicleNumber":vehicleNumber,
      "quota":10,
      "vehicleType":vehicleType,
      "fuelType":fuelType,
      "user": "63feac3ee740360349adfda9"
    }
    try {
      // make axios post request
      const response = await axios.post (REGISTER_VEHICLE,
        vehicle,
        {
          headers:{
            "Content-Type": "application/json",
          }
        }).then(resp =>{

          props.setOpenModal(false);
          window.location.reload(false);
          console.log(JSON.stringify(resp?.data));
        })
      
    } catch(error) {
      console.log(error)
    }
  };

  
  const handleVehicleNumberChange = (event) => {
    setVehicleNumber(event.target.value);
  };
  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };
  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value);
  };

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
          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="vehicleNumber"
              label="Vehicle Number"
              name="vehicleNumber"
              disabled={true}
              autoFocus
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
            />
            <InputLabel id="vehicleTypeLabel">Vehicle Type</InputLabel>
            <Select
                labelId="vehicleType"
                id="vehicleType"
                value={vehicleType}
                label="Vehicle Type"
                onChange={handleVehicleTypeChange}
            >
                <MenuItem value={"two-wheelers"}>Two Wheeler</MenuItem>
                <MenuItem value={"three-wheelers"}>Three Wheeler</MenuItem>
                <MenuItem value={"four-wheelers"}>Four Wheeler</MenuItem>
                <MenuItem value={"heavy"}>Heavy</MenuItem>
            </Select>
            <InputLabel id="fuelType">Fuel Type</InputLabel>
            <Select
                labelId="fuelType"
                id="fuelType"
                value={fuelType}
                label="Fuel Type"
                onChange={handleFuelTypeChange}
            >
                <MenuItem value={"petrol"}>Petrol</MenuItem>
                <MenuItem value={"diesal"}>Diesal</MenuItem>

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
  );
}