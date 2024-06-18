import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserAmountFromWallet } from 'config/firebaseEvents';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { IconCash } from '@tabler/icons';

const Wallet = () => {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        getUserAmountFromWallet(user.uid).then((result) => {
          setAmount(Number.parseFloat(result).toFixed(2));
        });
      }
    });
  }, []);

  return (
    <Paper>
      <ToastContainer />
      <Box sx={{ p: 5 }}>
        <Grid container direction="column">
          <Grid item xs={12} alignContent={'center'} alignItems={'center'}>
            <IconCash size={40} />
          </Grid>
          <Grid item xs={12}>
            <Typography component="span" variant="h3" sx={{ fontWeight: 500, color: '#000', marginTop: 1, fontSize: 18 }}>
              $ {amount}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Wallet;
