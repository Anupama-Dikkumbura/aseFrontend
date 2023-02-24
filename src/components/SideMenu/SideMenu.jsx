import { DashboardOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import { useNavigate } from 'react-router-dom';
import "./SideMenu.css";

function SideMenu() {
    const navigate = useNavigate();
  return (
    <Menu className="SideNav" onClick={({key})=>{
        if(key ==="/signout"){
            alert(key);
        }else{
            navigate(key);
        }
    }}
    
    items={[
        {label:"Dashboard",
        key:"/dashborad",
        icon: <DashboardOutlined/>},
        {label:"Fuel Stations",
        key:"/fuelstations",
        icon: <LocalGasStationIcon/>},
        {label:"Fuel Delivery",
        key:"/fueldelivery",
        icon: <LocalShippingIcon/>},
        {label:"Customers",
        key:"/customers",
        icon: <PersonIcon/>},
        {label:"Requests",
        key:"/requests",
        icon: <RequestPageIcon/>},
        {label:"Sign out",
        key:"/signout",
        icon: <PoweroffOutlined/>, danger: true},
        ]}></Menu>
  )
}

export default SideMenu