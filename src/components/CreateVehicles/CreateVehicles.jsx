import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, MenuItem, Select } from '@mui/material';


const theme = createTheme();

export default function CreateVehicles(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [vehicleType, setVehicleType] = React.useState('');

  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
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
            />
            <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
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