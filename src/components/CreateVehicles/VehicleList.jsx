import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../Popup/Popup';
import UpdateVehicle from './UpdateVehicle';
const GET_VEHICLES = "/vehicle/";
const DELETE_VEHICLE_URL = "/vehicle/";


function VehicleList(props) {
  const [data, setData] = useState([]);
  const [fuelStationList, setFuelStationList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const getVehicles = async ()=>{
    setLoading(true);
    await axios.get(GET_VEHICLES)
    .then(res=>{
      setResult(res.data.vehicles);
      console.log(res.data);
      setLoading(false);
    });
  };

  const handleDelete = async(vehicleNumber) => {
    await axios.delete(`${DELETE_VEHICLE_URL}${vehicleNumber}`)
        .then( resp => {
            setResult([]);
            console.log(resp.message);
            getVehicles();
        })
        .catch( err => console.error );
  }

useEffect(() => {
  getVehicles();
}, []);

  return (
    <TableContainer style={{alignItems:"center"}}>
      <Table>
        <TableHead>
          <TableRow>
            {props.tableheaders.map((thead)=>(
                 <TableCell key={thead.id} style={{fontWeight:"bold"}}>{thead.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {loading &&
            <TableRow><TableCell>Loading....</TableCell></TableRow>}
            {
              !loading &&
              <>
              {result.filter(v => v.user ===localStorage.getItem("userID"))
              .map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.quota}</TableCell>
                <TableCell>{vehicle.vehicleType}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{<div className='actionButtons'>
                    <Link onClick={()=> {
                      setData(vehicle);
                      setOpenModal(true);
                      }}>
                      <EditIcon/></Link>
                    <Link onClick={()=> handleDelete(vehicle._id)}><DeleteIcon/></Link></div>}</TableCell>
              </TableRow>
          ))}
              </>
            }
          
        </TableBody>

      </Table>
      <Popup
      title="Edit Vehicle"
      children={<UpdateVehicle data={data} btntext="Update" openModal={openModal} setOpenModal={setOpenModal}/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </TableContainer>
  );
}

export default VehicleList;
