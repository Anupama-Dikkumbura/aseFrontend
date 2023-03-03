import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../Popup/Popup';
const GET_VEHICLES = "/vehicle/";
const DELETE_VEHICLE_URL = "/vehicle/";

const GET_ALL_USERS= "/users";
const GET_STATION_LIST_URL= "/fuelstation";

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
  ];
  function UserReport(props) {
    const [data, setData] = useState([]);
    const [fuelStationList, setFuelStationList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [fuelStation, setFuelStation] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const getManagers = async ()=>{
      await axios.get(GET_ALL_USERS)
      .then(res=>{
        setResult(res.data);
      });
    };
  
    const getStations = async ()=>{
      setLoading(true);
      await axios.get(GET_STATION_LIST_URL)
      .then(res=>{
        setFuelStationList(res.data);
        setLoading(false);
      });
    };
  
    // const handleDelete = async(id) => {
    //   await axios.delete(`${DELETE_STATION_URL}${id}`)
    //       .then( resp => {
    //           setResult([]);
    //           console.log(resp.message);
    //           getStations();
    //       })
    //       .catch( err => console.error );
    // }
  
    useEffect(() => {
      getManagers();
    }, []);
  
    return (
      <TableContainer style={{alignItems:"center"}}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((thead)=>(
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
                {result.filter(u => u.role ==="customer")
                .map((user) => {
                return(
                <TableRow key={user._id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  
                  <TableCell>{user.fuelStation}</TableCell>
                   
                  
                  <TableCell>{<div className='actionButtons'>
                      <Link>
                        <EditIcon/></Link>
                      <Link><DeleteIcon/></Link></div>}</TableCell>
                </TableRow>
            )})}
                </>
              
              }
            
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
  
  export default UserReport;