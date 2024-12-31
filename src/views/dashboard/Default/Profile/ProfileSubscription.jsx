import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { getUserSubscription, getUserSubscriptionEndDate } from 'config/firebaseEvents';
import { genConst, gridSpacing } from 'store/constant';
import { useGetSubscriptionState } from 'hooks/useGetSubscriptionState';
import SubCard from '../Main/SubCard';
import SubCards from '../Main/SubCards';
import { useNavigate } from 'react-router';
import SubscreptionState from 'components/message/SubscriptionState';
import { msgSubState } from 'store/message';

const ProfileSubscription = () => {
  const [endDate, setEndDate] = useState('');
  const [state, setState] = useState('');
  const [days, setDays] = useState(0);
  const stateSub = useGetSubscriptionState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        getUserSubscription(user.uid).then((st) => {
          setState(st);
        });
        getUserSubscriptionEndDate(user.uid).then((date) => {
          if (date === null || date === undefined || date === '') {
            setState(0);
          } else {
            let end = new Date(date).getTime();
            let now = new Date().getTime();
            var diff = end - now;
            var newDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
            setDays(newDiff);
            setEndDate(date);
          }
        });
      }
    });
  }, []);

  const MainComponent = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SubCard state={stateSub} />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SubCards state={1} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      {state === genConst.CONST_SUB_S_I ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SubscreptionState message={'¡Suscríbete ahora y desbloquea todos los beneficios exclusivos!'} submessage={''} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{ height: 50, backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 10 }}
            >
              <center>
                <span>
                  Te quedan <strong>{days}</strong> días, tu subscripción termina el: <strong>{endDate}</strong>
                </span>
              </center>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MainComponent />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ProfileSubscription;
