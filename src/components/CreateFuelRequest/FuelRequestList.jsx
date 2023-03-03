import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../Popup/Popup';
const GET_REQUESTS= "/customerreq";
const DELETE_REQ= "/customerreq/";
const GET_VEHICLES = "/vehicle";
const GET_STATION_LIST_URL= "/fuelstation";


function FuelRequestList(props) {
  //const [data, setData] = useState([]);
  const [fuelStationList, setFuelStationList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getRequests = async ()=>{
    setLoading(true);
    await axios.get(GET_REQUESTS)
    .then(res=>{
      setResult(res.data);
      setLoading(false);
    });
  };
  const getVehicles = async ()=>{
    setLoading(true);
    await axios.get(GET_VEHICLES)
    .then(res=>{
      setResult(res.data.vehicles);
      console.log(res.data);
      setLoading(false);
    });
  };
  const handleDelete = async(requestID) => {
    await axios.delete(`${DELETE_REQ}${requestID}`)
        .then( resp => {
            setResult([]);
            console.log(resp.message);
            getRequests();
        })
        .catch( err => console.error );
  }

  useEffect(() => {
    getRequests();
  }, []);
  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <TableContainer style={{alignItems:"center"}}>
      <Table>
        <TableHead>
          <TableRow>
            {props.headers.map((thead)=>(
                 <TableCell key={thead.id} style={{fontWeight:"bold"}}>{thead.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {result?.length > 0? (result).map((request) =>{
              return(
              <TableRow>
                <TableCell>{request.vehicleNumber.vehicleNumber}</TableCell>
                <TableCell>{request.requestFuelType}</TableCell>
                <TableCell>Colombo</TableCell>
                <TableCell>{request.expectedFillingDate}</TableCell>
                <TableCell>{request.expectedFillingTime}</TableCell>
                <TableCell>{request.requestQuota}</TableCell>
                <TableCell>{request.notification}</TableCell>
                <TableCell>{request.paymentStatus}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{<div className='actionButtons'>
                    <Link>
                      <EditIcon/></Link>
                    <Link onClick={()=> handleDelete(request._id)} ><DeleteIcon/></Link></div>}</TableCell>
              </TableRow>
          )}):""}
          
        </TableBody>

      </Table>
      {/* <Popup
      title="Edit Fuel Station"
      children={<UpdateManager getStations={getStations} data={data} btntext="Update" openModal={openModal} setOpenModal={setOpenModal}/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup> */}
    </TableContainer>
  );
}

export default FuelRequestList;
