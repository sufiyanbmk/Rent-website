/* eslint-disable */
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import { ProSidebar } from 'react-pro-sidebar';
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  ListItem,
} from '@mui/material';
// import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import adminImg from '../assets/images/3135715.png'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Sidebarr() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: '#1F2A40',
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: '#e0e0e0',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color="#000000">
                  ADMIN 
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={adminImg}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color="#000000"
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  Sufiyan sm
                </Typography>
                <Typography variant="h6" color="#666666">
                  Rental Website Admin
                </Typography>
              </Box>
              <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
         
            </Box>

          )}
            <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          React-Pro-Sidebar
        </h1>
      </main>
          
          </Menu>
          </Sidebar>
      
    </Box>
  );
}

export default Sidebarr;
