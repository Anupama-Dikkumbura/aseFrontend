import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import CreateDelivery from '../../components/CreateDelivery/CreateDelivery';
import DeliveryScheduleList from '../../components/DeliverySchedule/DeliveryScheduleList';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";

const headCells = [
  {
    id: 'fuelStation',
    numeric: false,
    disablePadding: true,
    label: 'Fuel Station ID',
  },
  {
    id: 'requestFuelType',
    numeric: false,
    disablePadding: false,
    label: 'Fuel Type',
  },
  {
    id: 'deliveryDate',
    numeric: true,
    disablePadding: false,
    label: 'Requested Date',
  },
  {
    id: 'requestFuelAmount',
    numeric: true,
    disablePadding: false,
    label: 'Requested Amount',
  },
  {
    id: 'deliveryStatus',
    numeric: true,
    disablePadding: false,
    label: 'Dilivery Status',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function ScheduleDelivery() {
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
        <DeliveryScheduleList headers={headCells}/>
      </div>
      <Popup
      title="Schedule a Delivery"
      children={<CreateDelivery btntext="Create"/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default ScheduleDelivery