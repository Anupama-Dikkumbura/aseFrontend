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
import PaymentForm from '../Payment/Payment';
import PaymentFormModal from '../Payment/Payment';
import Moment from 'react-moment';
const GET_REQUESTS= "/customerreq";
const DELETE_REQ= "/customerreq/";
const GET_VEHICLES = "/vehicle";
const PAY = "/customerreq/customerrequest/";
const GET_STATION_LIST_URL= "/fuelstation";



function FuelRequestList(props) {
  
  //const [data, setData] = useState([]);
  const [fuelStationList, setFuelStationList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openQRModal, setQROpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [QRTitle,setQRTitle] = useState("");
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [requestID,setRequestID] = useState("");
  
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
  const handlePayment = async(requestId)=>{
    await axios.put(`${PAY}${requestId}`)
    .then(res => {
      getRequests();
    })
  }

  const showQR =()=>{

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
            {(result).length > 0? 
            (result).map((request) =>{
              return(
              <TableRow>
                <TableCell>{request.vehicleNumber.vehicleNumber}</TableCell>
                <TableCell>{request.requestFuelType}</TableCell>
                <TableCell><Moment format="YYYY-MM-DD">{request.expectedFillingDate}</Moment></TableCell>
                <TableCell><Moment format="HH:mm">{request.expectedFillingTime}</Moment></TableCell>
                <TableCell>{request.requestQuota}</TableCell>
                <TableCell>{request.notification}</TableCell>
                <TableCell>{request.paymentStatus === "paid"? <h3 style={{color:"Green"}}>{request.paymentStatus}</h3>:<h3 style={{color:"orange"}}>{request.paymentStatus}</h3>}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{<>{request.paymentStatus=="paid" && request.status!=="taken"?<Link onClick={()=>{
                  setQROpenModal(true);
                  setQRTitle(request.vehicleNumber.vehicleNumber);
                  setToken(request.token)
                }
                }><Tooltip title="QR"><VisibilityIcon /></Tooltip></Link>
                :""}{request.paymentStatus=="pending"?<Link onClick={()=> {setRequestID(request._id); setOpenPaymentForm(true)}}>
                      <PaidIcon/></Link>:""}
                    <Link onClick={()=> handleDelete(request._id)}><Tooltip title="Remove"><DeleteIcon/></Tooltip></Link></>}</TableCell>
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
      <QR 
      title={QRTitle} 
      token={token}
      openQRModal={openQRModal}
      setQROpenModal={setQROpenModal} />
      <PaymentFormModal open={openPaymentForm} onClose={() => setOpenPaymentForm(false)} requestId={requestID}/>
    </TableContainer>
  );
}

export default FuelRequestList;
