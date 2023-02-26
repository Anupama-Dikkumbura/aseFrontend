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

export default function CreateFill(props) {
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
          <InputLabel margin='normal' id="fuelStationLabel">Vehicle</InputLabel>
            <Select
                labelId="vehicle"
                id="vehicle"
                value={vehicleType}
                label="Vehicle"
                onChange={handleVehicleTypeChange}
                autoFocus="true"
            >
                <MenuItem value={"two-wheelers"}>Two Wheeler</MenuItem>
                <MenuItem value={"three-wheelers"}>Three Wheeler</MenuItem>
                <MenuItem value={"four-wheelers"}>Four Wheeler</MenuItem>
                <MenuItem value={"heavy"}>Heavy</MenuItem>
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="remaining"
              label="Remaining(L)"
              name="remaining"
              type="number"
              disabled="true"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="fuelType"
              label="Fuel Type"
              name="fuelType"
              type="text"
              disabled="true"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="pump"
              label="Amount(L)"
              name="pump"
              type="number"
              autoFocus
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