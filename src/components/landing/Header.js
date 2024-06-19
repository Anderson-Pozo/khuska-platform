import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton
} from '@mui/material';
import { uiStyles } from './styles';
import { Link as Scroll } from 'react-scroll';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Hero from './Hero';
import logoW from 'assets/images/khuska/logoW.png';
import logo from 'assets/images/khuska/logo.png';
import { useAuth } from 'hooks/useAuth';
import { isSessionActive } from 'config/firebaseEvents';

const drawerWidth = 240;

const Header = (props) => {
  let navigate = useNavigate();
  const { isLoggin } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleGoTo = () => {
    isSessionActive(navigate);
  };

  const handleGoDash = () => {
    isSessionActive(navigate);
  };

  //MOBILE
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={logo} alt="khuska logo brand" width={130} />
      </Typography>
      <Divider />
      <List>
        <Scroll to="header" smooth={true}>
          <ListItem key={1} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
              <ListItemText primary={<span style={{ fontSize: 16 }}>INICIO</span>} />
            </ListItemButton>
          </ListItem>
        </Scroll>
        <Scroll to="about" smooth={true}>
          <ListItem key={2} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
              <ListItemText primary={<span style={{ fontSize: 16 }}>KHUSKA</span>} />
            </ListItemButton>
          </ListItem>
        </Scroll>
        <Scroll to="contacts" smooth={true}>
          <ListItem key={4} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
              <ListItemText primary={<span style={{ fontSize: 16 }}>CONTÁCTANOS</span>} />
            </ListItemButton>
          </ListItem>
        </Scroll>
        {isLoggin ? (
          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => {
                setMobileOpen(false);
                handleGoDash();
              }}
              style={{ fontSize: 12, height: 50, marginTop: 30 }}
            >
              IR AL DASHBOARD
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
            <Button variant="contained" startIcon={<PersonIcon />} onClick={handleGoTo} style={{ width: 180, height: 40, fontSize: 12 }}>
              INICIAR SESIÓN
            </Button>
          </Box>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box style={uiStyles.root} id="header">
      <CssBaseline />
      <AppBar style={uiStyles.appbar} elevation={0} component="nav">
        <Toolbar style={uiStyles.appbarWrapper}>
          <div style={uiStyles.appbarTitle}>
            <Link to="/">
              <img src={logoW} alt="logobrand" width={130} />
            </Link>
          </div>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <Scroll to="header" smooth={true}>
              <Button sx={{ color: '#fff', marginLeft: 0, fontSize: 13 }}>
                <span style={{ fontSize: 13 }}>INICIO</span>
              </Button>
            </Scroll>
            <Scroll to="about" smooth={true}>
              <Button sx={{ color: '#fff', marginLeft: 3, fontSize: 13 }}>
                <span style={{ fontSize: 13 }}>KHUSKA</span>
              </Button>
            </Scroll>
            <Scroll to="contacts" smooth={true}>
              <Button sx={{ color: '#fff', marginLeft: 3, marginRight: 3, fontSize: 13 }}>
                <span style={{ fontSize: 13 }}>CONTÁCTANOS</span>
              </Button>
            </Scroll>
          </Box>
          {isLoggin ? (
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} onClick={handleGoTo}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleGoDash} style={{ borderRadius: 12, height: 50 }}>
                    <p style={{ color: '#FFF', fontSize: 14, fontWeight: 'bold' }}>IR AL DASHBOARD</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} onClick={handleGoTo}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleGoTo} style={{ borderRadius: 12, height: 50 }}>
                    <p style={{ color: '#FFF', fontSize: 14, fontWeight: 'bold' }}>INICIAR SESIÓN</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, mr: 2, display: { xs: 'block', sm: 'block', md: 'none' } }}
          >
            <MenuIcon style={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Hero />
    </Box>
  );
};

Header.propTypes = {
  window: PropTypes.func
};

export default Header;
