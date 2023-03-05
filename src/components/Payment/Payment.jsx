import { useState } from 'react';
import { Modal, TextField, Button, Box, InputLabel } from '@mui/material';
import "./Payment.css";
import axios from '../../api/axios';
const PAY = "/customerreq/customerrequest/";

const PaymentFormModal = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value.replace(/\D/g, ''));
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value.replace(/\D/g, ''));
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value.replace(/\D/g, ''));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!cardNumber) {
      validationErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumber)) {
      validationErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!expiry) {
      validationErrors.expiry = 'Expiry is required';
    } else if (!/^\d{4}$/.test(expiry)) {
      validationErrors.expiry = 'Expiry must be 4 digits (MMYY)';
    }

    if (!cvv) {
      validationErrors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(cvv)) {
      validationErrors.cvv = 'CVV must be 3 digits';
    }

    
    
        //setErrors(validationErrors);
    
        handlePayment(props.requestId);
    
  };

  const handlePayment = async(requestId)=>{
    console.log(requestId);
    const response = await axios.put(`${PAY}${requestId}`);
    console.log(response);
    alert("Payment Success!!!!!");
    window.location.reload(false);

    
  }

  return (
    <Modal className="modal-dialog" open={props.open} onClose={props.onClose}>
      <Box sx={{ p: 2, width: 400, backgroundColor: 'white' }}>
        <form onSubmit={handleSubmit}>
        <InputLabel id="card Number">Card Number</InputLabel>
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            fullWidth
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
          />
          <InputLabel id="exipire">Expire date</InputLabel>
          <TextField
            label="Expiry (MMYY)"
            value={expiry}
            onChange={handleExpiryChange}
            fullWidth
            error={!!errors.expiry}
            helperText={errors.expiry}
          />
          <InputLabel id="CVV">CVV</InputLabel>
          <TextField
            label="CVV"
            value={cvv}
            onChange={handleCvvChange}
            fullWidth
            error={!!errors.cvv}
            helperText={errors.cvv}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentFormModal;
