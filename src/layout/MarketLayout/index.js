import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Menu,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  Button,
  Modal
} from '@mui/material';
import {
  IconApps,
  IconArrowLeft,
  IconBallFootball,
  IconBell,
  IconCar,
  IconClothesRack,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconGoGame,
  IconHome,
  IconLockOpen,
  IconMessage,
  IconPlus,
  IconRun,
  IconTags
} from '@tabler/icons';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from 'assets/images/khuska/logo.png';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { uiStyles } from './index.style';
import usrAvatarDef from 'assets/images/profile/profile-picture-6.jpg';

const drawerWidth = 280;

function Market(props) {
  const { window } = props;
  let navigate = useNavigate();
  const auth = getAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setUser(true);
        setAvatar(user.photoURL);
      } else {
        setUser(false);
      }
    });
    setIsCreate(false);
  }, []);

  const CustomButton = styled(ListItemButton)({
    minHeight: 50,
    justifyContent: 'initial',
    color: '#FFF',
    backgroundColor: '#242526',
    borderRadius: 8,
    margin: 2,
    '&:hover': {
      backgroundColor: '#3a3b3c',
      color: '#FFF'
    }
  });
  const CreateButton = styled(ListItemButton)({
    minHeight: 50,
    justifyContent: 'center',
    color: '#FFF',
    backgroundColor: '#38376e',
    borderRadius: 8,
    margin: 6,
    '&:hover': {
      backgroundColor: '#394d62',
      color: '#FFF'
    }
  });
  const CreateActiveButton = styled(ListItemButton)({
    minHeight: 50,
    justifyContent: 'center',
    color: '#FFF',
    backgroundColor: '#3a3b3c',
    borderRadius: 8,
    margin: 6,
    '&:hover': {
      backgroundColor: '#242526',
      color: '#FFF'
    }
  });

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifications = () => {
    setAnchorEl(null);
    navigate('/market/notifications');
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/market/profile');
  };

  const handleLogout = () => {
    setOpen(true);
    signOut(auth)
      .then(() => {
        setUser(false);
        navigate('/market/main');
        setAnchorEl(null);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setAnchorEl(null);
        setOpen(false);
      });
  };

  const CustomDrawerCreate = () => {
    return (
      <div style={{ backgroundColor: '#242526', height: '200%', borderColor: '#272829', borderWidth: 0 }}>
        <Toolbar style={{ height: 60, borderColor: '#242526' }}>
          <img src={logo} alt="Logo" width={130} height={45} />
        </Toolbar>
        <Divider sx={{ borderColor: '#3a3b3c' }} />
        <Typography variant="h3" noWrap component="div" style={{ color: '#FFF', paddingTop: 20, paddingLeft: 10, fontWeight: 'bold' }}>
          Crear Publicación Nueva
        </Typography>
        <List>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CreateActiveButton onClick={() => navigate('/market/create')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconHome color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Elije el tipo de Publicación</span>
            </CreateActiveButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10, padding: 0.5 }}>
            <CustomButton
              onClick={() => {
                setIsCreate(false);
                navigate('/market/main');
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconArrowLeft color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Regresar</span>
            </CustomButton>
          </ListItem>
        </List>
        <Divider sx={{ borderColor: '#3a3b3c' }} />
        <List>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CreateButton
              onClick={() => {
                setIsCreate(false);
                navigate('/market/main');
              }}
            >
              <span style={{ marginLeft: 12, fontSize: 13 }}>Salir sin guardar</span>
            </CreateButton>
          </ListItem>
        </List>
      </div>
    );
  };

  const CustomDrawer = () => {
    return (
      <div
        style={{
          backgroundColor: '#242526',
          height: '200%',
          borderColor: '#272829'
        }}
      >
        <Toolbar style={{ height: 60, borderColor: '#242526' }}>
          <div
            aria-hidden="true"
            onClick={() => {
              navigate('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt="Logo" width={130} height={45} />
          </div>
        </Toolbar>
        <Divider sx={{ borderColor: '#3a3b3c' }} />
        <Typography variant="h5" noWrap component="div" style={{ color: '#FFF', paddingTop: 20, paddingLeft: 10, fontWeight: 'bold' }}>
          Compra Venta
        </Typography>
        <List>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton onClick={() => navigate('/market/main')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconHome color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Principal</span>
            </CustomButton>
          </ListItem>
          {user ? (
            <>
              <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
                <CustomButton onClick={() => navigate('/market/messages')}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      backgroundColor: '#3a3b3c',
                      padding: 1,
                      borderRadius: 50
                    }}
                  >
                    <IconMessage color="#FFF" size={16} />
                  </ListItemIcon>
                  <span style={{ marginLeft: 12, fontSize: 13 }}>Mensajes</span>
                </CustomButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
                <CustomButton onClick={() => navigate('/market/notifications')}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      backgroundColor: '#3a3b3c',
                      padding: 1,
                      borderRadius: 50
                    }}
                  >
                    <IconBell color="#FFF" size={16} />
                  </ListItemIcon>
                  <span style={{ marginLeft: 12, fontSize: 13 }}>Notificaciones</span>
                </CustomButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
                <CustomButton onClick={() => navigate('/market/my-items')}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      backgroundColor: '#3a3b3c',
                      padding: 1,
                      borderRadius: 50
                    }}
                  >
                    <IconTags color="#FFF" size={16} />
                  </ListItemIcon>
                  <span style={{ marginLeft: 12, fontSize: 13 }}>Mis Publicaciones</span>
                </CustomButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
                <CreateButton
                  onClick={() => {
                    setIsCreate(true);
                    navigate('/market/create');
                  }}
                >
                  <ListItemIcon>
                    <IconPlus color="#FFF" size={16} />
                  </ListItemIcon>
                  <span>Crear Publicación</span>
                </CreateButton>
              </ListItem>
            </>
          ) : (
            <></>
          )}
        </List>
        <Divider sx={{ borderColor: '#3a3b3c' }} />
        <Typography variant="h5" noWrap component="div" style={{ color: '#FFF', paddingTop: 20, paddingLeft: 10, fontWeight: 'bold' }}>
          Categorías
        </Typography>
        <List>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton onClick={() => navigate('/market/main')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconApps color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Todos los Productos</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'CLA'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconRun color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Clasificados</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'DEP'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconBallFootball color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Articulos Deportivos</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'COMP'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconDeviceLaptop color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Computación</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'ELE'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconDeviceMobile color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Electrónica</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'ELE'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconGoGame color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Entretenimiento</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'ROP'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconClothesRack color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Ropa y Accesorios</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'HOM'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconHome color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Casa / Jardín</span>
            </CustomButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CustomButton
              onClick={() => {
                navigate({
                  pathname: '/market/filter/',
                  search: `?category=${'VEH'}`
                });
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#3a3b3c',
                  padding: 1,
                  borderRadius: 50
                }}
              >
                <IconCar color="#FFF" size={16} />
              </ListItemIcon>
              <span style={{ marginLeft: 12, fontSize: 13 }}>Vehículos</span>
            </CustomButton>
          </ListItem>
        </List>
      </div>
    );
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#18191a', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: 60,
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#242526'
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
          <Typography variant="h6" noWrap component="div"></Typography>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Box sx={{ mr: -5 }}>
              <IconButton
                style={{ marginLeft: 5 }}
                size="large"
                aria-label="show n new notifications"
                color="inherit"
                onClick={handleNotifications}
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleMenu}
                edge="end"
                sx={{
                  marginRight: 5
                }}
              >
                {user ? (
                  <div style={{ width: 40, height: 40, backgroundColor: '#FFF', borderRadius: 50 }}>
                    <img src={avatar || usrAvatarDef} width={40} alt="profile img" />
                  </div>
                ) : (
                  <div style={{ width: 40, height: 40, backgroundColor: '#FFF', borderRadius: 50 }}>
                    <AccountCircle />
                  </div>
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              style={{ color: '#FFF', fontSize: 12 }}
              variant="outlined"
              startIcon={<IconLockOpen size={16} />}
              onClick={() => navigate('/market/login')}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, borderColor: '#272829', borderWidth: 0 }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            borderColor: '#272829',
            borderWidth: 0,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            overflowY: 'scroll',
            '&::WebkitScrollbar': {
              width: 0,
              height: 0,
              backgroundColor: 'transparent'
            }
          }}
        >
          {isCreate ? <CustomDrawerCreate /> : <CustomDrawer />}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            borderColor: '#272829',
            borderWidth: 0,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            overflowY: 'scroll',
            '&::WebkitScrollbar': {
              width: 0,
              height: 0,
              backgroundColor: 'transparent'
            }
          }}
          open
        >
          {isCreate ? <CustomDrawerCreate /> : <CustomDrawer />}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pl: 1, pr: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar style={{ height: 60, borderColor: '#242526' }} />
        <Outlet />
      </Box>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Box>
  );
}

Market.propTypes = {
  window: PropTypes.func
};

export default Market;
