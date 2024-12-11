/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProfileAvatar from './ProfileAvatar';
import ProfileData from './ProfileData';

import { gridSpacing } from 'store/constant';

import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const UserProfile = () => {
  let navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setId(user.uid);
        setName(user.displayName);
        setEmail(user.email);
      } else {
        navigate('/market/main');
      }
    });
  }, []);

  return (
    <Grid container spacing={gridSpacing} sx={{ pt: 3 }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={5} md={6} sm={6} xs={12}>
            <ProfileAvatar id={id} name={name} email={email} />
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
