import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Popup from '../Popup/Popup';
import CreateFuelStation from './CreateFuelStation';
import UpdateFuelStation from './UpdateFuelStation';
const GET_STATION_LIST_URL= "/fuelstation";
const DELETE_STATION_URL="/fuelstation/";

function FuelStationList(props) {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStations = async ()=>{
    setLoading(true);
    await axios.get(GET_STATION_LIST_URL)
    .then(res=>{
      setResult(res.data);
      setLoading(false);
    });
  };
  const handleDelete = async(regnumber) => {

    await axios.delete(`${DELETE_STATION_URL}${regnumber}`)
        .then( resp => {
            setResult([]);
            console.log(resp.message);
            getStations();
        })
        .catch( err => console.error );
  }

  useEffect(() => {
    getStations();
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
              {result.map((station) => (
              <TableRow key={station._id}>
                <TableCell>{station.registrationNumber}</TableCell>
                <TableCell>{station.address}</TableCell>
                <TableCell>{station.stockPetrol92}</TableCell>
                <TableCell>{station.stockPetrol95}</TableCell>
                <TableCell>{station.diesal}</TableCell>
                <TableCell>{station.superDiesal}</TableCell>
                <TableCell>{<div className='actionButtons'>
                    <Link onClick={()=> {
                      setData(station);
                      setOpenModal(true);
                      }}>
                      <EditIcon/></Link>
                    <Link onClick={()=> handleDelete(station.registrationNumber)}><DeleteIcon/></Link></div>}</TableCell>
              </TableRow>
          ))}
              </>
            }
          
        </TableBody>

      </Table>
      <Popup
      title="Edit Fuel Station"
      children={<UpdateFuelStation getStations={getStations} data={data} btntext="Update" openModal={openModal} setOpenModal={setOpenModal}/>}
      openModal={openModal}
      setOpenModal={setOpenModal}
      >
      </Popup>
    </TableContainer>
  );
}

export default FuelStationList;
