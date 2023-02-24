import { Button } from '@mui/material'
import React from 'react'
import { Link} from 'react-router-dom'
import "./Landing.css"

function Landing() {
  return (
    <div className='landingPageStyles'>
      <div className='buttons'>
        <div className='vcenter'>
        <Link to="/login" className='link'><Button variant="contained" className='btn'>Login</Button></Link>
        <Link to="/register" className='link'><Button variant="contained" className='btn'>Register</Button></Link>
        </div>
        
      </div>
    </div>
  )
}

export default Landing