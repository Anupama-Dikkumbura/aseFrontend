import React from 'react';
import SideMenu from '../../components/SideMenu/SideMenu';
import Drawer from '../../components/drawer/Drawer';
import "./Dashboard.css";
import Navbar from '../../components/Navbar/Navbar';

function Dashboard(props) {
  return (
    <>
    {/* <div style={{zIndex: 2}}>
        <Navbar />
    </div> */}
    <div className='dashboardStyles' style={{zIndex: 1}}>
        <Drawer content={props.content} pageTitle={props.pageTitle}/>
        {/* <div className='dashboardContentStyles'>
         {props.content}
        </div> */}
        
        
    </div>
    </>
    
  )
}

export function Content(props){
    return(
        <div></div>
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