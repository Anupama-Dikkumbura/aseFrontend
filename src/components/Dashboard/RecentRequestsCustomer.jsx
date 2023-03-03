import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Popup from '../Popup/Popup';
import QR from '../QR/QR';
const GET_REQUESTS= "/customerreq";
const DELETE_REQ= "/customerreq/";
const GET_VEHICLES = "/vehicle";
const PAY = "/customerreq/customerrequest/";
const GET_STATION_LIST_URL= "/fuelstation";


function RecentRequestsCustomer(props) {
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
            {result.filter(v => v.user ===localStorage.getItem("userID"))?.length > 0? result.filter(v => v.user ===localStorage.getItem("userID")).map((request) =>{
              return(
              <TableRow>
                <TableCell>{request.vehicleNumber.vehicleNumber}</TableCell>
                <TableCell>{request.requestFuelType}</TableCell>
                <TableCell>Colombo</TableCell>
                <TableCell>{request.expectedFillingDate}</TableCell>
                <TableCell>{request.expectedFillingTime}</TableCell>
                <TableCell>{request.requestQuota}</TableCell>
                <TableCell>{request.notification}</TableCell>
                <TableCell>{request.paymentStatus === "paid"? <h3 style={{color:"Green"}}>{request.paymentStatus}</h3>:<h3 style={{color:"orange"}}>{request.paymentStatus}</h3>}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{<>{request.paymentStatus=="paid"?<Link onClick={()=>{
                  setToken(request.token);
                  setQRTitle(request.vehicleNumber.vehicleNumber);
                  setQROpenModal(true);
                }}><VisibilityIcon/></Link>
                :<Link onClick={()=>handlePayment(request._id)}>
                      <PaidIcon/></Link>}
                    
                    <Link onClick={()=> handleDelete(request._id)} ><DeleteIcon/></Link></>}</TableCell>
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
      <QR 
      title={QRTitle} 
      token={token}
      openQRModal={openQRModal}
      setQROpenModal={setQROpenModal} />
    </TableContainer>
  );
}

export default RecentRequestsCustomer;
