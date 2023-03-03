import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function SignOut() {

    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate("/login");
    })
  return (
    <></>
  )
}

export default SignOut