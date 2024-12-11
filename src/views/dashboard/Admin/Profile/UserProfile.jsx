import React from 'react';
import { Grid } from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import ProfileData from './ProfileData';

const UserProfile = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item lg={5} md={6} sm={6} xs={12}>
            <ProfileAvatar />
          </Grid>
          <Grid item lg={7} md={6} sm={6} xs={12}>
            <ProfileData />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
