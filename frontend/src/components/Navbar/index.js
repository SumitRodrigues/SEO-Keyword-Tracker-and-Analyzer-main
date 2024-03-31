import React from 'react';
import './Navbar.css';
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements';
import logoImage from '../../image/logo.png';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import { createTheme } from '@mui/material/styles';

const Navbar = () => {

  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      type: 'dark',
    },
  });

  return (
    <>

      <div className='navbar'>
        {/* Navigation bar */}
        <AppBar style={{ paddingLeft: '20px' }} sx={{ backgroundColor: customTheme.palette.primary.main }}>
          <Toolbar>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Logo */}
              <img
                src={logoImage}
                alt="Logo"
                style={{
                  height: '100px', // Adjust the height as needed
                  width: '120px;', // Maintain aspect ratio
                  marginRight: '10px', // Optional: Add some right margin for spacing
                  cursor: 'pointer'
                }}
              />
            </div>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            </Typography>
            {/* Navigation links */}
            <NavMenu>
              {/* <NavLink to="/home">
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}> Home
                </Typography></NavLink> */}
              {/* <NavLink to="/about">    
          <Typography variant='h6' component='div' sx={{flexGrow:1 }}> About
          </Typography></NavLink>
          <NavLink to="/guide">    <Typography variant='h6' component='div' sx={{flexGrow:1 }}>
           Guide
         </Typography></NavLink> */}
            </NavMenu>
          </Toolbar>
        </AppBar>
      </div>

    </>
  );
};

export default Navbar;
