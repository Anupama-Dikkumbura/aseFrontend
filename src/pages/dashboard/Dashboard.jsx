import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu';
import FuelStations from '../fuelStations/FuelStations';
import Landing from '../landing/Landing';
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <div className='dashboardStyles'>
        <SideMenu />
        {props.content}
        
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