import {React, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, MenuItem, Select } from '@mui/material';
import axios from '../../api/axios';
import { validateDate } from '@mui/x-date-pickers/internals';
const REGISTER_VEHICLE = "/vehicle/register"

const theme = createTheme();

export default function CreateVehicles(props) {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const userId = localStorage.getItem("userID");

  const [vehicleError,setVehicleError] = useState('');
  const [vehicleTypeError,setVehicleTypeError] = useState('');
  const [fuelTypeError,setFuelTypeError] = useState('');
  const [existError, setExistError] = useState('');


  const validate = ()=>{
    setVehicleError("");
    setVehicleTypeError("");
    setFuelTypeError("");
    setExistError("");
    if(vehicleNumber === ""){
      setVehicleError("Vehicle number cannot be empty");
    }
    if(vehicleType === ""){
      setVehicleTypeError("Vehicle type cannot be empty");
    }
    if(fuelType === ""){
      setFuelTypeError("Fuel type cannot be empty");
    }
    if(vehicleError || vehicleTypeError || fuelTypeError){
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if(isValid){
      const vehicle = {
        "vehicleNumber":vehicleNumber,
        "vehicleType":vehicleType,
        "fuelType":fuelType,
        "user": userId
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
            
            console.log(JSON.stringify(resp?.data));
          })
          props.setOpenModal(false);
          window.location.reload(false);
        
      } catch(error) {
        setExistError("This Vehicle already exists!")
        console.log(error)
      }
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="vehicleNumber"
              label="Vehicle Number"
              name="vehicleNumber"
              autoFocus
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
            />
            {vehicleError ? <p style={{color:"red", fontSize:"15px"}}>{vehicleError}</p> : null}
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
            {vehicleTypeError ? <p style={{color:"red", fontSize:"15px"}}>{vehicleTypeError}</p> : null}
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
                {fuelTypeError ? <p style={{color:"red", fontSize:"15px"}}>{fuelTypeError}</p> : null}
                {existError ? <p style={{color:"red", fontSize:"15px"}}>{existError}</p> : null}
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