import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CreateFuelStation from '../../components/CreateFuelStation/CreateFuelStation';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";
import "./FuelStations.css";

function FuelStations() {
  const [openModal, setOpenModal] = useState(false);
  const handleCreate = ()=>{
      return "Test"
  }
  
  return (
    <div className='container'>
      <h1>Fuel Stations</h1>
      <div>
        <Button
          className='createButton'
          startIcon={<AddCircleRounded/>}
          variant='contained'
          onClick={()=>setOpenModal(true)}>
            Create
        </Button>
      </div>
      <div className='table'>
        <EnhancedTable editForm={<CreateFuelStation/>} />
      </div>
      <Popup
      title="Create Fuel Station"
      children={<CreateFuelStation/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default FuelStations