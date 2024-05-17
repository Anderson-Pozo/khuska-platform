import { useEffect, useState } from 'react';
// material-ui
import { Grid, Modal, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// project imports
import EarningCard from './Main/EarningCard';
import { Messages, genConst, gridSpacing } from 'store/constant';
import SubscriptionState from 'components/message/SubscriptionState';
//Firebase
import { countBusinessByUserId, countTotalIncomes } from 'config/firebaseEvents';
//Custom Hook
import { useGetSubscriptionState } from 'hooks/useGetSubscriptionState';
import { msgSubState } from 'store/message';
import SubCard from './Main/SubCard';
import TotalBusiness from './Main/TotalBusiness';
import { useGetUserId } from 'hooks/useGetUserId';
import { useGetSubscriptionEndDate } from 'hooks/useGetSubscriptionEndDate';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [totalIncomes, setTotalIncomes] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState(null);
  const stateSub = useGetSubscriptionState();
  const newStateSub = useGetSubscriptionEndDate();
  const userId = useGetUserId();

  useEffect(() => {
    countBusinessByUserId(userId).then((count) => {
      setTotalBusiness(count);
    });
    countTotalIncomes().then((count) => {
      setTotalIncomes(count);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userId]);

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
      {newStateSub}
      {newStateSub === genConst.CONST_SUB_S_I ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SubscriptionState message={msgSubState} submessage={''} />
            </Grid>
          </Grid>
        </Grid>
      ) : newStateSub === genConst.CONST_SUB_S_U ? (
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
