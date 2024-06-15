import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';

const Favorites = () => {
  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        console.log('User');
      } else {
        navigate('/market/main');
      }
    });
  }, []);

  return (
    <Paper>
      <h3>Favoritos</h3>
    </Paper>
  );
};

export default Favorites;
