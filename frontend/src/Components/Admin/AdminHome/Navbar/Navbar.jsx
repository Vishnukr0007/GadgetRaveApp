import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, Box, Button, Tooltip } from '@mui/material';
import { Search as SearchIcon, AccountCircle, ExitToApp } from '@mui/icons-material';

import logo from '../../../user/UserHome/Images/Preview.png';
import './Navbar.css';

export default function Navbar() {
  const [adminName, setAdminName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  

  // Retrieve admin name on component mount
  useEffect(() => {
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    }
  }, []);

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    window.location.href = '/Admin';
  };

  // Handle menu opening/closing
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle input changes and fetch suggestions
  

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 2, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            className="logoadmin"
            onError={(e) => (e.target.style.display = 'none')} // Handle image load error
          />
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', position: 'relative' }}>
          <InputBase
            
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '25px',
              paddingLeft: '10px',
              paddingRight: '10px',
              width: '250px',
            }}
            placeholder="Search..."
            startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            aria-label="Search input"
          />
          <Button
            variant="contained"
            
            sx={{ ml: 2, borderRadius: '25px' }}
          >
            Search
          </Button>

        </Box>

        {/* Admin Options */}
        <Box>
          <Tooltip title="Admin Options" arrow>
            <IconButton
              edge="end"
              onClick={handleMenuOpen}
              sx={{
                borderRadius: '12px',
                padding: '8px 12px',
                backgroundColor: '#f3f4f6',
                '&:hover': { backgroundColor: '#e2e8f0' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <AccountCircle sx={{ fontSize: 28, color: '#1e293b' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: '#1e293b',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {adminName ? `Admin: ${adminName}` : 'Admin'}
              </Typography>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                minWidth: 200,
              },
            }}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '10px 16px',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#e2e8f0' },

              }}
            >
              <ExitToApp sx={{ fontSize: 20, color: '#1e293b' }} />
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
