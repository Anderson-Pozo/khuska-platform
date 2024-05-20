/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// material-ui
import { Grid, Modal, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// project imports
import EarningCard from './Main/EarningCard';
import { Messages, genConst, gridSpacing } from 'store/constant';
import SubscriptionState from 'components/message/SubscriptionState';
//Firebase
import {
  countBusinessByUserId,
  countTotalIncomes,
  getUserSubscription,
  getUserSubscriptionEndDate,
  updateDocument
} from 'config/firebaseEvents';
//Custom Hook
import { useGetSubscriptionState } from 'hooks/useGetSubscriptionState';
import { msgSubState } from 'store/message';
import SubCard from './Main/SubCard';
import TotalBusiness from './Main/TotalBusiness';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { collSubscription, collUsers } from 'store/collections';
import { sendWelcomeEmail } from 'utils/sendEmail';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [endDate, setEndDate] = useState('');
  const [state, setState] = useState('');
  const [days, setDays] = useState('');
  const stateSub = useGetSubscriptionState();

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        sendWelcomeEmail(user.email, user.displayName);
        getUserSubscription(user.uid).then((st) => {
          setState(st);
        });
        getUserSubscriptionEndDate(user.uid).then((date) => {
          if (date === null) {
            setState(0);
            console.log('Inactiva');
          } else {
            let end = new Date(date).getTime();
            let now = new Date().getTime();
            var diff = end - now;
            var newDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
            setDays(newDiff);
            setEndDate(date);
            const subObject = {
              state: genConst.CONST_STATE_IN
            };
            const usrObject = {
              subState: genConst.CONST_STATE_IN,
              state: genConst.CONST_STATE_IN
            };
            if (newDiff === 0) {
              console.log('Caducado');
              setState(0);
              updateDocument(collUsers, user.id, subObject);
              updateDocument(collSubscription, user.id, usrObject);
            } else if (newDiff > 0) {
              console.log('Activo');
              setState(2);
            } else {
              console.log('Caducado');
              setState(0);
              updateDocument(collUsers, user.id, subObject);
              updateDocument(collSubscription, user.id, usrObject);
            }
          }
        });
        countBusinessByUserId(user.uid).then((count) => {
          setTotalBusiness(count);
        });
        countTotalIncomes().then((count) => {
          setTotalIncomes(count);
        });
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const MainComponent = () => {
    return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <EarningCard isLoading={isLoading} totalIncomes={totalIncomes} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <SubCard isLoading={isLoading} state={stateSub} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <TotalBusiness isLoading={isLoading} count={totalBusiness} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {state === genConst.CONST_SUB_S_I ? (
        <></>
      ) : (
        <Grid container spacing={gridSpacing}>
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
        </Grid>
      )}
      {state === genConst.CONST_SUB_S_I ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SubscriptionState message={msgSubState} submessage={''} />
            </Grid>
          </Grid>
        </Grid>
      ) : state === genConst.CONST_SUB_S_U ? (
        <>
          <Typography variant="h5">{Messages.lastDay}</Typography>
          <MainComponent />
        </>
      ) : (
        <MainComponent />
      )}
      <Modal open={isLoading} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={style}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </>
  );
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 80,
  height: 80,
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: 6,
  boxShadow: 0,
  p: 4
};

export default Dashboard;
