import { AddCircleRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CreateFuelStation from '../../components/CreateFuelStation/CreateFuelStation';
import FuelStationList from '../../components/CreateFuelStation/FuelStationList';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";
import "./FuelStations.css";
import axios from '../../api/axios';
const GET_STATION_LIST_URL= "/fuelstation";

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

function FuelStations(){
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const getStations = async ()=>{
    await axios.get(GET_STATION_LIST_URL)
    .then(res=>{
      setResult(res.data);
    });
  };
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
          <FuelStationList 
          tableheaders={headCells} />
      </div>
      <Popup
      title="Create Fuel Station"
      children={<CreateFuelStation getStations={getStations} btntext="Create" openModal={openModal} setOpenModal={setOpenModal}/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </div>
  )
}


export default FuelStations