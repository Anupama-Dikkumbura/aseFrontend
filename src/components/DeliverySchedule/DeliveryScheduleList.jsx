import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popup from '../Popup/Popup';
import CheckIcon from '@mui/icons-material/Check';
import QR from '../QR/QR';
const GET_REQUESTS= "/fuelReq/";
const DELETE_REQ= "/customerreq/";
const GET_VEHICLES = "/vehicle";
const PAY = "/customerreq/customerrequest/";
const GET_STATION_LIST_URL= "/fuelstation";


function DeliveryScheduleList(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openQRModal, setQROpenModal] = useState(false);
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
  const handleDelete = async(requestID) => {
    await axios.delete(`${GET_REQUESTS}${requestID}`)
        .then( resp => {
            setResult([]);
            console.log(resp.message);
            getRequests();
        })
        .catch( err => console.error );
  }
  const handlePayment = async(requestId)=>{
    await axios.put(`${PAY}${requestId}`)
    .then(res => {
      getRequests();
    })
  }


  useEffect(() => {
    getRequests();
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
            {(result).length > 0? 
            (result).map((request) =>{
              return(
              <TableRow>
                <TableCell>{request.fuelStation}</TableCell>
                <TableCell>{request.requestFuelType}</TableCell>
                <TableCell>{request.deliveryDate}</TableCell>
                <TableCell>{request.requestFuelAmount}</TableCell>
                <TableCell>{request.deliveryStatus === "delivered"? <h3 style={{color:"Green"}}>{request.deliveryStatus}</h3>:<h3 style={{color:"orange"}}>{request.deliveryStatus}</h3>}</TableCell>
                <TableCell>
                    <Link onClick={()=> handleDelete(request._id)}><Tooltip title="Remove"><DeleteIcon/></Tooltip></Link></TableCell>
              </TableRow>
          )}):<div>No records</div>}
          
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

export default DeliveryScheduleList;
