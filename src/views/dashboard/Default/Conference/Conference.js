import React, { useEffect, useState } from 'react';
import { generateId } from 'utils/idGenerator';
import { Grid } from '@mui/material';
import conferenceImg from 'assets/images/conference.webp';
import ConferenceCenter from './ConferenceCenter';

export default function Conference() {
  const [idConference, setIdConference] = useState(null);

  const getId = () => {
    setIdConference(generateId(20));
  };

  useEffect(() => {
    getId();
  }, []);
  return (
    <Grid
      container
      spacing={1}
      style={{
        backgroundImage: `url(${conferenceImg})`,
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: 15
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ConferenceCenter idConference={idConference} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
