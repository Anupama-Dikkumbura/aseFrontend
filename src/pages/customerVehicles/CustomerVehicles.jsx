import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CreateFuelStation from '../../components/CreateFuelStation/CreateFuelStation';
import CreateVehicles from '../../components/CreateVehicles/CreateVehicles';
import VehicleList from '../../components/CreateVehicles/VehicleList';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";
import "./customerVehicles.css";

const headCells = [
  {
    id: 'vehicleNumber',
    numeric: false,
    disablePadding: true,
    label: 'Vehicle Reg Num',
  },
  {
    id: 'quota',
    numeric: false,
    disablePadding: false,
    label: 'Quota',
  },
  {
    id: 'vehicleType',
    numeric: true,
    disablePadding: false,
    label: 'Vehicle Type',
  },
  {
    id: 'fuelType',
    numeric: true,
    disablePadding: false,
    label: 'Fuel Type',
  }
];


function CustomerVehicles() {
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
        {/* <EnhancedTable 
            editForm={<CreateVehicles btntext="Update"/>} 
            tableheaders={headCells} 
            tableTitle="Vehicles"
            formTitle="Edit Vehicle"/> */}
          <VehicleList tableheaders={headCells} />
      </div>
      <Popup
      title="Create a Vehicle"
      children={<CreateVehicles btntext="Create" openModal={openModal} setOpenModal={setOpenModal}/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default CustomerVehicles