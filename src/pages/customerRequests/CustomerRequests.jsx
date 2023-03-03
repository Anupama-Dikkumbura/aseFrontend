import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import CreateCustomerRequest from '../../components/CreateCustomerRequest/CreateCustomerRequest';
import CustomerRequestsList from '../../components/CreateCustomerRequest/CustomerRequestsList';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";

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
    label: 'Fuel Type',
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

function CustomerRequests() {
  const [openModal, setOpenModal] = useState(false);
  const handleCreate = ()=>{
      return "Test"
  }
  
  return (
    <div className='container'>
      <div style={{marginBottom: "10px"}}>
        {/* <Button
          className='createButton'
          startIcon={<AddCircleRounded/>}
          variant='contained'
          onClick={()=>setOpenModal(true)}>
            Create
        </Button> */}
      </div>
      <div className='table'>
      <CustomerRequestsList headers={headCells}/>
      </div>
      <Popup
      title="Create a Request"
      children={<CreateCustomerRequest btntext="Create"/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default CustomerRequests