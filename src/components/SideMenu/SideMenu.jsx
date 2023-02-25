import { DashboardOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import "./SideMenu.css";
import { MenuItem, Typography } from '@mui/material';

function SideMenu() {
    const navigate = useNavigate();
    const role = "customer";
    const customer =[
        {label:"Dashboard",
        key:"/dashboard",
        icon: <DashboardOutlined/>},
        {label:"My Vehicles",
        key:"/vehicles",
        icon: <DirectionsCarIcon/>},
        {label:"Sign out",
        key:"/signout",
        icon: <PoweroffOutlined/>, danger: true},
    ];
    const fuelStation = [
        {label:"Dashboard",
        key:"/dashboard",
        icon: <DashboardOutlined/>},
        {label:"My Vehicles",
        key:"/vehicles",
        icon: <LocalGasStationIcon/>},
        {label:"Customers",
        key:"/customers",
        icon: <PersonIcon/>},
        {label:"Requests",
        key:"/requests",
        icon: <RequestPageIcon/>},
        {label:"Sign out",
        key:"/signout",
        icon: <PoweroffOutlined/>, danger: true},
    ];
    const headOffice = [
        {label:"Dashboard",
        key:"/dashboard",
        icon: <DashboardOutlined/>},
        {label:"Fuel Stations",
        key:"/fuelstations",
        icon: <LocalGasStationIcon/>},
        {label:"Fuel Delivery",
        key:"/fueldelivery",
        icon: <LocalShippingIcon/>},
        {label:"Sign out",
        key:"/signout",
        icon: <PoweroffOutlined/>, danger: true},
        
    ];
    const items =[];
    
    const fun = (roles)=>{
        if(role === "customer"){
            return customer;
        }else if(role=="fuel station"){
            return fuelStation;
        }else if(role=="head office"){
            return headOffice;
        }
    };
    console.log(fun(role));
  return (
            <Menu 
                className="SideNav" 
                onClick={({key})=>{
                    if(key ==="/signout"){
                        alert(key);
                    }else{
                        navigate(key);
                    }
                }}
                items={customer}>
                    <MenuItem>asd</MenuItem>
            </Menu>
    
  )
}

export default SideMenu