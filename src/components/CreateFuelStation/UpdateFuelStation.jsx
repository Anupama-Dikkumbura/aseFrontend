import { React, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "../../api/axios";
const UPDATE_FUEL_URL="/fuelstation/";

const theme = createTheme();

export default function UpdateFuelStation(props) {

  const[newAddress, setNewAddress] = useState(props.data.address);
  const[newStockPetrol92, setStockPetrol92] = useState(props.data.petrol92);
  const[newStockPetrol95, setStockPetrol95] = useState(props.data.petrol95);
  const[newDiesal, setDiesal] = useState(props.data.diesal);
  const[newSuperDiesal, setSuperDiesal] = useState(props.data.superDiesal);
  const regnumber = props.data.registrationNumber;

  const handleChangeAddress = (e)=>{
    setNewAddress(e.target.value);
  };
  const handlePetrol92 = (e)=>{
    setStockPetrol92(e.target.value);
  }
  const handlePetrol95 = (e)=>{
    setStockPetrol95(e.target.value);
  }
  const handleDiesal = (e)=>{
    setDiesal(e.target.value);
  }
  const handleSuperDiesal = (e)=>{
    setSuperDiesal(e.target.value);
  }

 
  const handleUpdate = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const station = {
      "address": newAddress,
      "petrol92": newStockPetrol92,
      "petrol95": newStockPetrol95,
      "diesal": newDiesal,
      "superDiesal": newSuperDiesal
    }
    await axios.put(`${UPDATE_FUEL_URL}${regnumber}`, 
      station,
      {
        headers:{
          "Content-Type": "application/json",
        }
      })
        .then( resp => {
          props.setOpenModal(false);
          props.getStations();
          console.log(JSON.stringify(resp?.data));
        })
        .catch( err => console.error );
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
              fullWidth
              id="registrationNumber"
              label="Registration Number"
              name="registrationNumber"
              disabled={true}
              value={props.data.registrationNumber}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
              InputLabelProps={{ shrink: true }}
              value={newAddress}
              onChange={handleChangeAddress}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol92"
              label="Petrol Stock 92(L)"
              type="number"
              id="stockPetrol92"
              InputLabelProps={{ shrink: true }}
              value={newStockPetrol92}
              onChange={handlePetrol92}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol95"
              label="Petrol Stock 95(L)"
              type="number"
              id="stockPetrol95"
              InputLabelProps={{ shrink: true }}
              value={newStockPetrol95}
              onChange={handlePetrol95}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="diesal"
              label="Diseal Stock(L)"
              type="number"
              id="diesal"
              InputLabelProps={{ shrink: true }}
              value={newDiesal}
              onChange={handleDiesal}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="superDiesal"
              label="Super Diesal(L)"
              type="number"
              id="superDiesal"
              InputLabelProps={{ shrink: true }}
              value={newSuperDiesal}
              onChange={handleSuperDiesal}
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