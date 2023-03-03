import { React, useState }from 'react';
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
const REQUEST_FUEL = "/fuelReq";


const theme = createTheme();

export default function CreateRequestFuelFromAdmin(props) {
  

  const [fuelType, setFuelType] = useState('');
  const [dateTime, setDateTime] = useState(dayjs('2023-03-04T21:11:54'));
  const [requestAmout, setRequestAmount] = useState('');

  const handleFuelypeChange = (event) => {
    setFuelType(event.target.value);
  };
  const handleDateTimeChange = (dateTime) => {
    setDateTime(dateTime);
  };
  const handleRequestAmountChange = (event) => {
    setRequestAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = {
      fuelStation: localStorage.getItem("fuelStation"),
      requestFuelType: fuelType,
      requestFuelAmount: requestAmout,
      deliveryStatus: "not delivered",
      deliveryDate: dateTime
    }
    try {
      // make axios post request
      const response = await axios.post (REQUEST_FUEL,
        // JSON.stringify({phone: phone,password: password})
        request,
        {
          headers:{
            "Content-Type": "application/json",
          }
        });
        props.setOpenModal(false);
        window.location.reload(false);
      
    } catch(error) {
      console.log(error)
    }
  };

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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputLabel margin='normal' id="fuelTypeLable">Fuel Type</InputLabel>
            <Select
                labelId="fuelType"
                id="fuelType"
                value={fuelType}
                label="Fuel Type"
                onChange={handleFuelypeChange}
                autoFocus="true"
            >
                <MenuItem value={"petrol92"}>Petrol 92</MenuItem>
                <MenuItem value={"petrol95"}>Petrol 95</MenuItem>
                <MenuItem value={"diesal"}>Diesal</MenuItem>
                <MenuItem value={"superDiesal"}>Super Diesal</MenuItem>
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
              id="requestAmoint"
              label="Request Amount"
              name="requestAmount"
              type="number"
              value={requestAmout}
              onChange={handleRequestAmountChange}
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
    </LocalizationProvider>
  );
}