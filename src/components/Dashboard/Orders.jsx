import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2023',
    'Elvis Presley',
    'Galle',
    'VISA ⠀•••• 3719',
    3400.00,
  ),
  createData(
    1,
    '16 Mar, 2023',
    'Paul McCartney',
    'Kandy',
    'VISA ⠀•••• 2574',
    2300.00,
  ),
  createData(2, '16 Mar, 2023', 'Tom Scholz', 'Matara', 'MC ⠀•••• 1253', 1000.00),
  createData(
    3, 
    '16 Mar, 2023',
    'Michael Jackson',
    'Jaffna',
    'AMEX ⠀•••• 2000',
    1500.00,
  ),
  createData(
    4,
    '15 Mar, 2023',
    'Bruce Springsteen',
    'Colombo',
    'VISA ⠀•••• 5919',
    2000.00,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Fuel Station</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`LKR. ${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more requests
      </Link>
    </React.Fragment>
  );
}