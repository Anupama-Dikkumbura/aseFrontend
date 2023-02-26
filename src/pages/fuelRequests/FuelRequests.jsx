import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import CreateFuelRequest from '../../components/CreateFuelRequest/CreateFuelRequest';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";
import "./FuelRequests.css";

const headCells = [
  {
    id: 'registrationNumber',
    numeric: false,
    disablePadding: true,
    label: 'Registration No',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'stockPetrol92',
    numeric: true,
    disablePadding: false,
    label: 'Petrol Stock 92(L)',
  },
  {
    id: 'stockPetrol95',
    numeric: true,
    disablePadding: false,
    label: 'Petrol Stock 95(L)',
  },
  {
    id: 'diesal',
    numeric: true,
    disablePadding: false,
    label: 'Diesal',
  },
  {
    id: 'superDiesal',
    numeric: true,
    disablePadding: false,
    label: 'Super Diesal',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function FuelRequests() {
  const [openModal, setOpenModal] = useState(false);
  const handleCreate = ()=>{
      return "Test"
  }
  
  return (
    <div className='container'>
      <div style={{marginBottom: "10px"}}>
        <Button
          className='createButton'
          startIcon={<AddCircleRounded/>}
          variant='contained'
          onClick={()=>setOpenModal(true)}>
            Create
        </Button>
      </div>
      <div className='table'>
        <EnhancedTable 
        editForm={<CreateFuelRequest btntext="Update"/>} 
        tableheaders={headCells} 
        tableTitle="Fuel Requests" 
        formTitle="Edit Fuel Request"/>
      </div>
      <Popup
      title="Create Fuel Request"
      children={<CreateFuelRequest btntext="Request"/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default FuelRequests