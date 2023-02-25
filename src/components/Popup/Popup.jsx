import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import "./Popup.css"

function Popup(props) {

    const {title, children, openModal, setOpenModal} = props;
  return (
    <Dialog open={openModal}>
        <DialogTitle>
            <div className="dialogTitle">
                <div>{title}</div>
                <div><Link onClick={()=>setOpenModal(false)}><Close/></Link></div>
            </div>
            
        </DialogTitle>
        <DialogContent>
            <div>{children}</div>
        </DialogContent>
    </Dialog>
  )
}

export default Popup