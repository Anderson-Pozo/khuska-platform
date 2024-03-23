import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  Grid,
  Card,
  CardMedia,
  CardContent,
  OutlinedInput,
  Button
} from '@mui/material';
import { IconApps, IconBell, IconCar, IconDeviceMobile, IconHome, IconHome2, IconLockOpen, IconPlus, IconRun } from '@tabler/icons';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from 'assets/images/khuska/logo.png';
import { getProducts } from 'config/firebaseEvents';
import { searchingProducts } from 'utils/search';

const drawerWidth = 280;

function Market(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUserId] = useState(false);

  useEffect(() => {
    console.log();
    getProducts().then((data) => {
      setProducts(data);
    });
    setUserId(true);
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

  const drawer = (
    <div style={{ backgroundColor: '#242526', height: '200%', borderColor: '#272829' }}>
      <Toolbar style={{ height: 60, borderColor: '#242526' }}>
        <img src={logo} alt="Logo" width={130} height={45} />
      </Toolbar>
      <Divider sx={{ borderColor: '#272829' }} />
      <Typography variant="h4" noWrap component="div" style={{ color: '#FFF', paddingTop: 20, paddingLeft: 10 }}>
        Compra Venta
      </Typography>
      <List>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconHome color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Principal</span>
          </CustomButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconBell color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Notificaciones</span>
          </CustomButton>
        </ListItem>
        {user ? (
          <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
            <CreateButton>
              <ListItemIcon>
                <IconPlus color="#FFF" />
              </ListItemIcon>
              <span>Crear Publicación</span>
            </CreateButton>
          </ListItem>
        ) : (
          <></>
        )}
      </List>
      <Divider sx={{ borderColor: '#272829' }} />
      <Typography variant="h4" noWrap component="div" style={{ color: '#FFF', paddingTop: 20, paddingLeft: 10 }}>
        Categorías
      </Typography>
      <List>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconApps color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Todos los Productos</span>
          </CustomButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconRun color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Articulos Deportivos</span>
          </CustomButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconDeviceMobile color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Electrónica</span>
          </CustomButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconCar color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Vehículos</span>
          </CustomButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block', borderRadius: 10 }}>
          <CustomButton>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                backgroundColor: '#3a3b3c',
                padding: 1,
                borderRadius: 50
              }}
            >
              <IconHome2 color="#FFF" />
            </ListItemIcon>
            <span style={{ marginLeft: 12 }}>Hogar</span>
          </CustomButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
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
              <IconButton style={{ marginLeft: 5 }} size="large" aria-label="show n new notifications" color="inherit">
                <Badge badgeContent={1} color="error">
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
                <AccountCircle />
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
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button style={{ color: '#FFF', fontSize: 12 }} variant="outlined" startIcon={<IconLockOpen size={16} />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pl: 1, pr: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar style={{ height: 60, borderColor: '#242526' }} />
        <Box sx={{ flexGrow: 0, mt: 1 }}>
          <OutlinedInput
            id={'search'}
            type="text"
            name={'search'}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder={'Buscar en Khuska Market'}
            style={{ width: '100%' }}
          />
        </Box>
        <Typography variant="h4" noWrap component="div" style={{ color: '#242526', paddingTop: 20, paddingBottom: 20 }}>
          Productos sugeridos hoy
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid container spacing={0.5}>
              {products.filter(searchingProducts(search)).map((item) => {
                return (
                  <Grid key={item.id} item xs={6} sm={6} md={3} lg={2}>
                    <Card sx={{ maxWidth: '100%', height: 270, borderRadius: 3, backgroundColor: '#242526', cursor: 'pointer' }}>
                      <CardMedia
                        sx={{ borderRadius: 3, padding: 0.5 }}
                        component="img"
                        height={194}
                        image={item.picture1}
                        alt="Portada img"
                      />
                      <CardContent sx={{ backgroundColor: '#242526', marginTop: -2, paddingLeft: 1, paddingRight: 1 }}>
                        <Typography variant="h4" color="#FFF">
                          ${item.price}
                        </Typography>
                        <p
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: '#FFF',
                            fontSize: 11,
                            textOverflow: 'ellipsis',
                            maxWidth: '100%'
                          }}
                        >
                          {item.name}
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Market.propTypes = {
  window: PropTypes.func
};

export default Market;
