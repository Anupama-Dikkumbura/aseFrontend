import { AddCircleRounded } from '@mui/icons-material';
import { Button, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CreateFuelStation from '../../components/CreateFuelStation/CreateFuelStation';
import FuelStationList from '../../components/CreateFuelStation/FuelStationList';
import Popup from '../../components/Popup/Popup';
import EnhancedTable from "../../components/Table/Table";
import axios from '../../api/axios';
import jsPDF from 'jspdf';
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

function Reports(){
  const [vehicleType, setVehicleType] = React.useState('');
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const getStations = async ()=>{
    await axios.get(GET_STATION_LIST_URL)
    .then(res=>{
      setResult(res.data);
    });
  };
  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION"]];

    const data = this.result.map(elt=> [elt.adress, elt.fuelStation]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
  return (
    <div className='container'>
      <div style={{marginBottom: "10px"}}>
      <Typography style={{fontWeight: "bold"}}>Select Type of report you want</Typography>
      <Select
                labelId="vehicleType"
                id="vehicleType"
                value={vehicleType}
                label="Vehicle Type"
                onChange={handleVehicleTypeChange}
                
            >
                <MenuItem value={"two-wheelers"}>Managers Report</MenuItem>
                <MenuItem value={"three-wheelers"}>Fuel Stations Report</MenuItem>
                <MenuItem value={"four-wheelers"}>Four Wheeler</MenuItem>
                <MenuItem value={"heavy"}>Heavy</MenuItem>
            </Select>
        <Button
          className='createButton'
          startIcon={<AddCircleRounded/>}
          variant='contained'
          style={{marginLeft:"20px"}}
          >
            Generate Report
        </Button>
        <Button
          className='createButton'
          startIcon={<AddCircleRounded/>}
          variant='contained'
          onClick={() => this.exportPDF()}>
            Download
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


export default Reports