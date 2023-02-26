import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function CreateFuelStation(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              label="Registrtion Number"
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
              type="text"
              id="stockPetrol92"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="stockPetrol95"
              label="Petrol Stock 95(L)"
              type="text"
              id="stockPetrol95"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="diesal"
              label="Diseal Stock(L)"
              type="text"
              id="diesal"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="superDiesal"
              label="Super Diesal(L)"
              type="text"
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