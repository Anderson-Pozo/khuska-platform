import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from 'assets/images/profile/profile-picture-6.jpg';
import { uiStyles } from './Network.styles';
import { titles } from './Network.texts';
import { genConst } from 'store/constant';
import { Avatar, Grid } from '@mui/material';

const NetworkChild = ({ avatar, name, lastName, phone, email, state }) => {
  return (
    <Grid container spacing={0}>
      <Grid xs={3} sx={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <center>
          <Avatar alt={name + ' ' + lastName} src={avatar || defaultImg} sx={{ width: 65, height: 65 }} />
        </center>
      </Grid>
      <Grid xs={9} sx={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <div>
          <p style={uiStyles.name}>{name + ' ' + lastName}</p>
          <p style={uiStyles.email}>{email}</p>
          <p style={uiStyles.email}>{phone}</p>
          {state == genConst.CONST_STATE_IN ? (
            <p style={uiStyles.stateNoActive}>{titles.noActive}</p>
          ) : (
            <p style={uiStyles.stateActive}>{titles.active}</p>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

NetworkChild.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  state: PropTypes.number
};

export default NetworkChild;
