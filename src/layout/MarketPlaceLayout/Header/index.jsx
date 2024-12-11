import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { IconMenu2 } from '@tabler/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import LoginSection from './LoginSection';
import AddProductSection from './AddProductSection';
import FavoritesSection from './FavoritesSection';

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser(true);
      }
    });
  }, []);

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: '#FFF',
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: '#FFF',
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={3} size={35} />
          </Avatar>
        </ButtonBase>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      {user ? (
        <>
          <AddProductSection />
          <FavoritesSection />
          <NotificationSection />
          <ProfileSection />
        </>
      ) : (
        <LoginSection />
      )}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
