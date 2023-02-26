import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Link } from 'react-router-dom';
import "./Drawer.css";
import logo from "../../images/fuelinLogo.jpeg"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // filling station manager, head office,customer
  const role = "filling station manager";

  const headOfficeMenu = ()=>{
    return(
        <List>
            <Link to="/dashboard" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link className='navigateLinks' to="/fuelstations">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <LocalGasStationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Fuel Stations"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link className='navigateLinks' to="/managers">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Managers"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/schedule" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Schedule Delivery"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/signout" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    )
  }

  const fuelStationMenu = ()=>{
    return(
        <List>
            <Link to="/dashboard" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link className='navigateLinks' to="/fill">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <OilBarrelIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText primary="Fill"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/customerrequests" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <RequestQuoteIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary="Customer Requests"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/signout" className='navigateLinks' style={{bottom:"20"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PowerSettingsNewIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    )
  }

  const customerMenu = ()=>{
    return(
        <List>
            <Link to="/dashboard" className='navigateLinks' >
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon  />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link className='navigateLinks' to="/vehicles">
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vehicles"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/fuelrequests" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Requests"/>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/signout" className='navigateLinks'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    )
  }

  const drawer = (
    <div style={{backgroundColor: "#212121", height: "100vh", color:"white"}}>
      {/* <Toolbar/> */}
      {/* <div style={{ alignItems:"center", alignContent:"center", backgroundColor: "white", height:"20px"}}>
        <img src={logo} className="logo"></img>
      </div> */}
      <div className='logo'>
        <LocalGasStationIcon style={{ color: 'white' }}/>
        <h1>FuelIn</h1>
      </div>
      <Divider />
        {role==="customer"? customerMenu():""}
        {role==="head office"? headOfficeMenu():""}
        {role==="filling station manager"? fuelStationMenu():""}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: '#212121'}}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,},
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.content}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
