import { React, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "../../api/axios";
const CREATE_FUEL_URL="/fuelStation";

const theme = createTheme();

export default function CreateFuelStation(props) {

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("")
  const [stockPetrol92, setStockPetrol92] = useState("")
  const [stockPetrol95, setStockPetrol95] = useState("")
  const [diesal, setDiesal] = useState("")
  const [superDiesal, setSuperDiesal] = useState("")

  const handleRegistrationNumberChange = (event) => {
    setRegistrationNumber(event.target.value);
  };
  const handleAddressChange= (event) => {
    setAddress(event.target.value);
  };
  const handleStockPetrol92Change = (event) => {
    setStockPetrol92(event.target.value);
  };
  const handleStockPetrol95Change = (event) => {
    setStockPetrol95(event.target.value);
  };
  const handleDiesalChange = (event) => {
    setDiesal(event.target.value);
  };
  const handleSuperDiesalChange = (event) => {
    setSuperDiesal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const station = {
      "registrationNumber": registrationNumber,
      "address": address,
      "petrol92": stockPetrol92,
      "petrol95": stockPetrol95,
      "diesal": diesal,
      "superDiesal": superDiesal
    }
    try {
      // make axios post request
      const response = await axios.post (CREATE_FUEL_URL,
        station,
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
              id="registrationNumber"
              label="Registration Number"
              name="registrationNumber"
              autoFocus
              value={registrationNumber}
              onChange={handleRegistrationNumberChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol92"
              label="Petrol Stock 92(L)"
              type="number"
              id="stockPetrol92"
              value={stockPetrol92}
              onChange={handleStockPetrol92Change}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol95"
              label="Petrol Stock 95(L)"
              type="number"
              id="stockPetrol95"
              value={stockPetrol95}
              onChange={handleStockPetrol95Change}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="diesal"
              label="Diseal Stock(L)"
              type="number"
              id="diesal"
              value={diesal}
              onChange={handleDiesalChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="superDiesal"
              label="Super Diesal(L)"
              type="number"
              id="superDiesal"
              value={superDiesal}
              onChange={handleSuperDiesalChange}
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