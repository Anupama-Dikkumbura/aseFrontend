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
import ManagersList from '../../components/CreateManager/ManagersList';
import FuelRequestList from '../../components/CreateFuelRequest/FuelRequestList';
import UserReport from '../../components/ReportTypes/UserReport';
const GET_STATION_LIST_URL= "/fuelstation";

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

const userData = [
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


function Reports(){
  const [vehicleType, setVehicleType] = React.useState('');
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [report, setReport] = useState([]);

  const getStations = async ()=>{
    await axios.get(GET_STATION_LIST_URL)
    .then(res=>{
      setResult(res.data);
    });
  };
  const handleReportChange = (event) => {
    setReport(event.target.value);
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
                labelId="report"
                id="reportType"
                value={report}
                label="Report Type"
                onChange={handleReportChange}
                style={{marginRight: "100px"}}
                
            >
                <MenuItem value={"customers"}>Customers Report</MenuItem>
                <MenuItem value={"fuelStations"}>Fuel Stations Report</MenuItem>
            </Select>
        <Button
          className='createButton'
          startIcon={<AddCircleRounded/>}
          variant='contained'
          style={{marginLeft:"30px"}}
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
        
          <UserReport />
      
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