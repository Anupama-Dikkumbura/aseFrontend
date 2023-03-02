import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import CreateFuelRequest from '../../components/CreateFuelRequest/CreateFuelRequest';
import FuelRequestList from '../../components/CreateFuelRequest/FuelRequestList';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";
import "./FuelRequests.css";

const headCells = [
  {
    id: 'vehicleNumber',
    numeric: false,
    disablePadding: true,
    label: 'Vehicle Reg No',
  },
  {
    id: 'fuelType',
    numeric: false,
    disablePadding: false,
    label: 'fuelType',
  },
  {
    id: 'fuelStation',
    numeric: true,
    disablePadding: false,
    label: 'Fuel Station',
  },
  {
    id: 'fillingDate',
    numeric: true,
    disablePadding: false,
    label: 'Filling Date',
  },
  {
    id: 'fillingTime',
    numeric: true,
    disablePadding: false,
    label: 'Filling Time',
  },
  {
    id: 'requestAmount',
    numeric: true,
    disablePadding: false,
    label: 'Requested Amount',
  },
  {
    id: 'notifications',
    numeric: true,
    disablePadding: false,
    label: 'Notifications',
  },
  {
    id: 'paymentStatus',
    numeric: true,
    disablePadding: false,
    label: 'Payment Status',
  },
  {
    id: 'requestStatus',
    numeric: true,
    disablePadding: false,
    label: 'Request Status',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const data = [
  {
    vehicleNumber: "CAE1223",
    fuelType: "petrol",
    notifications: "sms",
    fuelStation: "Galle",
    requestedAmount: "5",
    fillingDate: "05-03-2023",
    fillingTime: "0930",
    requestStatus: "taken",
    paymentStatus: "paid",

  },
  {
    vehicleNumber: "BD1223",
    fuelType: "diesal",
    notifications: "email",
    fuelStation: "mathara",
    requestedAmount: "4",
    fillingDate: "10-03-2023",
    fillingTime: "1930",
    requestStatus: "untaken",
    paymentStatus: "pending",
  }
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
        {/* <EnhancedTable 
        editForm={<CreateFuelRequest btntext="Update"/>} 
        tableheaders={headCells} 
        tableTitle="Fuel Requests" 
        formTitle="Edit Fuel Request"/> */}
        <FuelRequestList data={data} headers={headCells}/>
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