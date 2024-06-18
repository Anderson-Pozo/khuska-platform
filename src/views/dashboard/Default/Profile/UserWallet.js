import React from 'react';
import { Grid } from '@mui/material';
import Wallet from './Wallet';

const UserWallet = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Wallet />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserWallet;
