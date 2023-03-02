import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../Popup/Popup';
const GET_ALL_USERS= "/users";
const GET_STATION_LIST_URL= "/fuelstation";


function FuelRequestList(props) {
  //const [data, setData] = useState([]);
  const [fuelStationList, setFuelStationList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
    console.log(props.data);

//   const handleDelete = async(regnumber) => {

//     await axios.delete(`${DELETE_STATION_URL}${regnumber}`)
//         .then( resp => {
//             setResult([]);
//             console.log(resp.message);
//             getStations();
//         })
//         .catch( err => console.error );
//   }

//   useEffect(() => {
//     getUsers();
//   }, []);

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
            {(props.data).map((request) => (
              <TableRow>
                <TableCell>{request.vehicleNumber}</TableCell>
                <TableCell>{request.fuelType}</TableCell>
                <TableCell>{request.fillingDate}</TableCell>
                <TableCell>{request.fillingTime}</TableCell>
                <TableCell>{request.requestedAmount}</TableCell>
                <TableCell>{request.notifications}</TableCell>
                <TableCell>{request.paymentStatus}</TableCell>
                <TableCell>{request.requestStatus}</TableCell>
                <TableCell>{<div className='actionButtons'>
                    <Link>
                      <EditIcon/></Link>
                    <Link ><DeleteIcon/></Link></div>}</TableCell>
              </TableRow>
          ))}
          
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
