import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove } from '../features/userSlice';
import LogoutModal from '../component/ConfirmModal';

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  function logout() {
    navigate('/login');
    dispatch(remove());
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <MenuIcon />
      </IconButton>
      {/* SEARCH BAR */}
      <Box
        display={{ xs: 'none', sm: 'flex' }}
        backgroundColor="#727681"
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => setShowModal(true)}>
          <LogoutIcon />
        </IconButton>
      </Box>
      {showModal && (
        <LogoutModal
          onConfirm={() => logout()}
          type="Logout"
          onClose={() => setShowModal(false)}
        />
      )}
    </Box>
  );
}

export default Navbar;
