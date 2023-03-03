import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import CreateManager from '../../components/CreateManager/CreateManager';
import Popup from '../../components/Popup/Popup';
import axios from '../../api/axios';
import EnhancedTable from "../../components/Table/Table";
import ManagersList from '../../components/CreateManager/ManagersList';
const GET_ALL_USERS= "/users";

const headCells = [
  {
    id: 'firstname',
    numeric: false,
    disablePadding: true,
    label: 'First Name',
  },
  {
    id: 'lastname',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'fuelStation',
    numeric: true,
    disablePadding: false,
    label: 'Fuel Station',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function Managers() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <ManagersList
          tableheaders={headCells} />
      </div>
      <Popup
      title="Create a Manager"
      children={<CreateManager btntext="Create" openModal={openModal} setOpenModal={setOpenModal}/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default Managers