import { React, useState, useEffect, useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../store/userSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../api/axios";
import "./Login.css"
import AuthContext from '../../context/AuthProvider';
const LOGIN_URL = '/users/login';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link className='links' color="inherit" to="http://localhost:3000">
        FuelIn
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [phoneError,setPhoneError] = useState('');
  const [passwordError,setPasswordError] = useState('');

  const validate = ()=>{
    setPhoneError("");
    setPasswordError("");
    if(phone === ""){
      setPhoneError("Phone number cannot be empty");
    }
    if(password === ""){
      setPasswordError("Password cannot be empty");
    }
    if(phoneError || passwordError){
      return false;
    }
    return true;
  }

  useEffect(()=>{
    // useRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[phone, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if(isValid){
      const data = new FormData(e.currentTarget);

      try {
        // make axios post request
        const response = await axios.post (LOGIN_URL,
          // JSON.stringify({phone: phone,password: password})
          data,
          {
            headers:{
              "Content-Type": "application/json",
            }
          }).then((res)=>{
            localStorage.setItem("userID", res.data._id);
            localStorage.setItem("firstName", res.data.firstName);
            localStorage.setItem("lastName", res.data.lastName);
            localStorage.setItem("phone", res.data.phone);
            localStorage.setItem("address", res.data.address);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("fuelStation", res?.data?.fuelStation);
          })
          console.log(JSON.stringify(response?.data));
          
          const role = response?.data?.role;
  
          //set in redux
          const hi= dispatch(setUserDetails({ phoneNumber:response?.data?.phone, firstName:response?.data?.firstName, lastName:response?.data?.lastName, role:response?.data?.role }));
          console.log(hi)
          setAuth({phone, password, role});
          setPhone('');
          setPassword('');
          navigate("/dashboard");
        
      } catch(error) {
        console.log(error)
        setErrMsg('Invalid Phone or Password. Try Again!')
        // if(!error?.response){
        //   setErrMsg('No server response');
        // }else if(error.response){
        //   setErrMsg(error.response.message);
        //   console.log(error.message);
        // }
        errRef.current.focus();
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
            Customer Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={(e)=>setPhone(e.target.value)}
              value={phone}
              ref={userRef}
            />
            {phoneError ? <p style={{color:"red", fontSize:"15px"}}>{phoneError}</p> : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
            {passwordError ? <p style={{color:"red", fontSize:"15px"}}>{passwordError}</p> : null}
            <p ref={errRef} className={errMsg?"errmsg":"offscreen"} style={{color: "red"}}>{errMsg}</p>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className='links' href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link className='links' to="/register"  variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}