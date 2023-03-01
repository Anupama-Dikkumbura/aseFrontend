import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "../../api/axios";
const CREATE_FUEL_URL="/fuelstation";

const theme = createTheme();

export default function CreateFuelStation(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      // make axios post request
      const response = await axios.post (CREATE_FUEL_URL,
        data,
        {
          headers:{
            "Content-Type": "application/json",
          }
        }).
        then(resp =>{
          props.setOpenModal(false);
          console.log(JSON.stringify(resp?.data));
        })
        
      
    } catch(error) {
      console.log(error)
    }
    console.log(data.get('registrationNumber'));
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
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol92"
              label="Petrol Stock 92(L)"
              type="number"
              id="stockPetrol92"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol95"
              label="Petrol Stock 95(L)"
              type="number"
              id="stockPetrol95"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="diesal"
              label="Diseal Stock(L)"
              type="number"
              id="diesal"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="superDiesal"
              label="Super Diesal(L)"
              type="number"
              id="superDiesal"
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