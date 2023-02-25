import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu';
import Drawer from '../../components/drawer/Drawer';
import FuelStations from '../fuelStations/FuelStations';
import Landing from '../landing/Landing';
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <div className='dashboardStyles'>
        <Drawer content={props.content} pageTitle={props.pageTitle}/>
        {/* <div className='dashboardContentStyles'>
         {props.content}
        </div> */}
        
        
    </div>
  )
}

export function Content(props){
    return(
        <div>sd</div>
    )
}

function DashboardContent(){
    return(
        <div>
            <h1>Dashboard Content</h1>
            <p>testing flex</p>
        </div>
    )
}

export default Dashboard