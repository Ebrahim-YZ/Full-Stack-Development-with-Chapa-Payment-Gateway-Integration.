import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem, Breadcrumbs, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon

const NavigationBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorElService, setAnchorElService] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle hover (open) for services menu
  const handleServiceHover = (event) => {
    setAnchorElService(event.currentTarget);
  };

  // Close the menu when mouse leaves the menu area
  const handleServiceClose = (event) => {
    if (anchorElService && !event.currentTarget.contains(event.relatedTarget)) {
      setAnchorElService(null);
    }
  };

  // Prevent closing when moving between the button and the dropdown menu
  const handleMenuEnter = () => {
    setAnchorElService(anchorElService);
  };

  // Handle toggle for mobile menu
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: '#fff', color: '#000' }}>
        <Toolbar>
          {/* Brand Name */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EBU Pizza
          </Typography>

          {/* For larger screens */}
          {!isMobile && (
            <>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Menu</Button>

              {/* Services Button with hover dropdown */}
              <Button
                color="inherit"
                aria-controls="service-menu"
                aria-haspopup="true"
                onMouseOver={handleServiceHover}
                endIcon={<ArrowDropDownIcon />}
              >
                Services
              </Button>

              <Menu
                id="service-menu"
                anchorEl={anchorElService}
                open={Boolean(anchorElService)}
                onClose={handleServiceClose}
                MenuListProps={{
                  onMouseEnter: handleMenuEnter, // Prevent closing when hovering over the menu
                  onMouseLeave: handleServiceClose, // Close when mouse leaves the menu
                }}
              >
                <MenuItem onClick={handleServiceClose}>Register</MenuItem>
                <MenuItem onClick={handleServiceClose}>Order</MenuItem>
              </Menu>

              <Button color="inherit">Contact Us</Button>

              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>

              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </>
          )}

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />} {/* Switch between MenuIcon and CloseIcon */}
            </IconButton>
          )}
        </Toolbar>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && ( // Show mobile menu when open
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Menu</Button>
            <Button
              color="inherit"
              aria-controls="mobile-service-menu"
              aria-haspopup="true"
              onClick={handleServiceHover}
            >
              Services
            </Button>
            <Menu
              id="mobile-service-menu"
              anchorEl={anchorElService}
              open={Boolean(anchorElService)}
              onClose={handleServiceClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',  // Centers horizontally
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',  // Centers horizontally
              }}
              sx={{
                '& .MuiPaper-root': { // This targets the Menu paper (dropdown)
                  marginTop: 2, // Optional: Adjust spacing from the button
                  width: 'auto', // Ensure the dropdown stretches across the screen
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MenuItem
                onClick={handleServiceClose}
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  width: '100%', // Ensures the item takes full width
                }}
              >
                Register
              </MenuItem>
              <MenuItem
                onClick={handleServiceClose}
                sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                Order
              </MenuItem>
            </Menu>


            <Button color="inherit">Contact Us</Button>

            {/* Horizontal IconButtons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0, mt: 0 }}>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </AppBar>

      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: '10px 20px' }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Services</Typography>
      </Breadcrumbs>
    </>
  );
};

export default NavigationBar;