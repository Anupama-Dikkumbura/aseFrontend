import { Container, Grid, Paper } from '@mui/material'
import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../components/Cards/Cards'
import Chart from '../../components/Dashboard/Chart'
import Deposits from '../../components/Dashboard/Deposits'
import Orders from '../../components/Dashboard/Orders'
import "./DashboardContent.css"

function DashboardContent() {
  const user = useSelector((state) => state.user);
 
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                {/* //Sample for import redux */}
              <div>{user.firstName}</div>
              <div>{user.role}</div>
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
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
             
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
    </>
  )
}

export default DashboardContent