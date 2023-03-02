import * as React from 'react';
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



const theme = createTheme();

export default function CreateFuelRequest(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [vehicleType, setVehicleType] = React.useState('');
  const [notification, setNotification] = React.useState('');
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };
  const handleNotificationSelect = (event) => {
    setNotification(event.target.value);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
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
            
            <InputLabel id="vehicleLabel">Vehicle</InputLabel>
            <Select
                labelId="vehicle"
                id="vehicle"
                value={vehicleType}
                label="Vehicle"
                onChange={handleVehicleTypeChange}
                
                
            >
                <MenuItem value={"two-wheelers"}>CAE1223</MenuItem>
                <MenuItem value={"heavy"}>Heavy</MenuItem>
            </Select>
            <InputLabel margin='normal' id="fuelStationLabel">Fuel Station</InputLabel>
            <Select
                labelId="fuelStation"
                id="fuelStation"
                value={vehicleType}
                label="Fuel Station"
                onChange={handleVehicleTypeChange}
                
                
            >
                <MenuItem value={"two-wheelers"}>Galle</MenuItem>
                <MenuItem value={"three-wheelers"}>Matara</MenuItem>
                <MenuItem value={"four-wheelers"}>Four Wheeler</MenuItem>
                <MenuItem value={"heavy"}>Heavy</MenuItem>
            </Select>
            <br></br><br></br>
            <DateTimePicker
            label="Date&Time picker"
            value={value}
            onChange={handleChange}
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
              autoFocus
            />
            <Typography position="right" fontSize="15px">Remaining: 5L</Typography>

            <InputLabel margin='normal' id="notificationsLabel">Notifications</InputLabel>
            <Select
                labelId="notification"
                id="notification"
                value={notification}
                label="How you like to get notified?"
                onChange={handleNotificationSelect}
                
                
            >
                <MenuItem disabled="true">Select</MenuItem>
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