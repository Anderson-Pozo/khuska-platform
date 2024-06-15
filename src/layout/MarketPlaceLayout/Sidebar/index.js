import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import LogoSection from '../LogoSection';
import { drawerWidth, genConst } from 'store/constant';
import config from 'config';
import {
  IconApps,
  IconBallFootball,
  IconBell,
  IconBox,
  IconCar,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconGoGame,
  IconHome,
  IconHome2,
  IconMessage,
  IconNetwork,
  IconRun,
  IconShirt
} from '@tabler/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  let navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  const ListMenuMarket = () => {
    return (
      <List>
        <ListItemButton
          style={{ borderRadius: 10 }}
          onClick={() => {
            navigate('/auth/signin');
          }}
        >
          <ListItemIcon>
            <IconNetwork size={22} style={{ marginRight: 5 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant={'h5'} color="inherit">
                {'Red de Mercadeo'}
              </Typography>
            }
          />
        </ListItemButton>
        <List
          subheader={
            <Typography variant="h4" sx={{ fontSize: 15, color: genConst.CONST_APPBAR, marginTop: 2, marginBottom: 2 }}>
              {'Compra Venta'}
            </Typography>
          }
        >
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate('/market/main');
            }}
          >
            <ListItemIcon>
              <IconHome size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Principal'}
                </Typography>
              }
            />
          </ListItemButton>
          {user && (
            <>
              <ListItemButton
                style={{ borderRadius: 10 }}
                onClick={() => {
                  navigate('/market/messages');
                }}
              >
                <ListItemIcon>
                  <IconMessage size={22} style={{ marginRight: 5 }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant={'h5'} color="inherit">
                      {'Mensajes'}
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{ borderRadius: 10 }}
                onClick={() => {
                  navigate('/market/notifications');
                }}
              >
                <ListItemIcon>
                  <IconBell size={22} style={{ marginRight: 5 }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant={'h5'} color="inherit">
                      {'Notificaciones'}
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton
                style={{ borderRadius: 10 }}
                onClick={() => {
                  navigate('/market/my-items');
                }}
              >
                <ListItemIcon>
                  <IconBox size={22} style={{ marginRight: 5 }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant={'h5'} color="inherit">
                      {'Mis Publicaciones'}
                    </Typography>
                  }
                />
              </ListItemButton>
            </>
          )}
        </List>
        <List
          subheader={
            <Typography variant="h4" sx={{ fontSize: 15, color: genConst.CONST_APPBAR, marginTop: 2, marginBottom: 2 }}>
              {'Categorías'}
            </Typography>
          }
        >
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate('/market/main');
            }}
          >
            <ListItemIcon>
              <IconApps size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Todos los Productos'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'CLA'}`
              });
            }}
          >
            <ListItemIcon>
              <IconRun size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Clasificados'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'DEP'}`
              });
            }}
          >
            <ListItemIcon>
              <IconBallFootball size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Artículos Deportivos'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'COMP'}`
              });
            }}
          >
            <ListItemIcon>
              <IconDeviceLaptop size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Computación'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'ELE'}`
              });
            }}
          >
            <ListItemIcon>
              <IconDeviceMobile size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Electrónica'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'ENT'}`
              });
            }}
          >
            <ListItemIcon>
              <IconGoGame size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Entretenimiento'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'ROP'}`
              });
            }}
          >
            <ListItemIcon>
              <IconShirt size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Ropa y Accesoios'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'HOM'}`
              });
            }}
          >
            <ListItemIcon>
              <IconHome2 size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Casa Jardín'}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            style={{ borderRadius: 10 }}
            onClick={() => {
              navigate({
                pathname: '/market/filter/',
                search: `?category=${'VEH'}`
              });
            }}
          >
            <ListItemIcon>
              <IconCar size={22} style={{ marginRight: 5 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant={'h5'} color="inherit">
                  {'Vehículos'}
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </List>
    );
  };

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          <ListMenuMarket />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={config.version} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <ListMenuMarket />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={config.version} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
  user: PropTypes.number
};

export default Sidebar;
