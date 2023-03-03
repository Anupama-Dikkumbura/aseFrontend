import { Container, Grid, Paper } from '@mui/material'
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../components/Cards/Cards'
import FuelRequestList from '../../components/CreateFuelRequest/FuelRequestList';
import Chart from '../../components/Dashboard/Chart'
import Deposits from '../../components/Dashboard/Deposits'
import Orders from '../../components/Dashboard/Orders'
import QR from '../../components/QR/QR';
import "./DashboardContent.css"

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
    label: 'Fuel Type',
  },
  {
    id: 'fuelStation',
    numeric: true,
    disablePadding: false,
    label: 'Fuel Station',
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
  }
];
function DashboardContent() {
  const user = useSelector((state) => state.user);
 
  const role = localStorage.getItem("role");
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {/* <Deposits /> */}
                  <QR />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
             
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>Recent Orders</Title>
                  <FuelRequestList headers={headCells}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
    </>
  )
}

export default DashboardContent