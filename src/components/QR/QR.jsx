import React from 'react'
import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';

function QR(props) {

    const {title,token, children, openQRModal, setQROpenModal} = props;
  return (
    <Dialog open={openQRModal}>
        <DialogTitle>
            <div className="dialogTitle">
                <div>{title}</div>
                <div><Link onClick={()=>setQROpenModal(false)}><Close/></Link></div>
            </div>
            
        </DialogTitle>
        <DialogContent>
            <div><QRCodeSVG  size="256" value={token} /></div>
        </DialogContent>
    </Dialog>
  )
}

export default QR