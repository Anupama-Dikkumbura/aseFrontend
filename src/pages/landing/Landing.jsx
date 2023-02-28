import { Button, Typography } from '@mui/material'
import { fontStyle } from '@mui/system'
import React from 'react'
import { Link} from 'react-router-dom'
import "./Landing.css"

function Landing() {
  return (
    <div className='landingPageStyles'>
      
        <div className='content'>
        <div className='contentWrapper'>
              <div className='textContent'>
                <Typography style={{fontSize: "50px", fontWeight: "bold"}}>Welcome to FuelIn!</Typography>
                <Typography>Manage your liquid gold with a single click. You can now create an account and request the fuel you need.
                  </Typography>
              </div>
              <div className='buttons'>
                <Link 
                  to="/login" 
                  className='link'>
                    <Button variant="contained" className='btn'>Login</Button></Link>
                <Link to="/register" className='link'><Button variant="contained" className='btn'>Register</Button></Link>
              </div>
            </div>
        </div>
      
      
    </div>
  )
}

export default Landing