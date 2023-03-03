import { React, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"
const REGISTER_URL='/users/register'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link className='links' to="http://localhost:3000" color="inherit">
        FuelIn
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError,setFirstNameError] = useState('');
  const [lastNameError,setLastNameError] = useState('');
  const [addressError,setAddressError] = useState('');
  const [phoneError,setPhoneError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [userExistError, setUserExistError] = useState('');

  const validate = ()=>{
    setPhoneError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setAddressError("");
    setUserExistError("");

    if(firstname === ""){
      setFirstNameError("Firstname cannot be empty");
    }
    if(lastname === ""){
      setLastNameError("Lastname cannot be empty");
    }
    if(address === ""){
      setAddressError("Address cannot be empty");
    }
    if(phone === ""){
      setPhoneError("Phone number cannot be empty");
    }
    if(password === ""){
      setPasswordError("Password cannot be empty");
    }
    if(firstNameError|| lastNameError || addressError || phoneError || passwordError){
      return false;
    }
    return true;
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if(isValid){
      const data = new FormData(event.currentTarget);
    const  user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phone: data.get('phone'),
      address: data.get('address'),
      password: data.get('password'),
      role: "customer"
    }
    try {
      // make axios post request
      const response = await axios.post (REGISTER_URL,
        // JSON.stringify({phone: phone,password: password})
        user,
        {
          headers:{
            "Content-Type": "application/json",
          }
        });
        console.log(JSON.stringify(response?.data));
        const role = response?.data?.role;
        console.log(role);
        navigate("/login");
      
    } catch(error) {
      setUserExistError("This phone number already exists!")
      console.log(error)
    }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={handleFirstNameChange}
                />
                {firstNameError ? <p style={{color:"red", fontSize:"15px"}}>{firstNameError}</p> : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={handleLastNameChange}
                />
                {lastNameError ? <p style={{color:"red", fontSize:"15px"}}>{lastNameError}</p> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={handleAddressChange}
                />
                {addressError ? <p style={{color:"red", fontSize:"15px"}}>{addressError}</p> : null}
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {phoneError ? <p style={{color:"red", fontSize:"15px"}}>{phoneError}</p> : null}
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError ? <p style={{color:"red", fontSize:"15px"}}>{passwordError}</p> : null}
                {userExistError ? <p style={{color:"red", fontSize:"15px"}}>{userExistError}</p> : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" variant="body2" className='links'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}