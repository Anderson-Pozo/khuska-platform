import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
// data
import { gridSpacing } from 'store/constant';
//Firebase
import { countActiveSubscriptions, countAdminUser, countBusiness, countUser } from 'config/firebaseEvents';
//Components
import TotalCard from 'components/cards/TotalCard';
import TotalYellowCard from 'components/cards/TotalYellowCard';
import EarningCard from 'components/cards/EarningCard';
import EarningBlueCard from 'components/cards/EarningBlueCard';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalAdminUsers, setTotalAdminUsers] = useState(null);
  const [totalSubs, setTotalSubs] = useState(null);
  const [totalBusiness, setTotalBusiness] = useState(null);

  useEffect(() => {
    countUser().then((count) => {
      setTotalUsers(count);
    });
    countAdminUser().then((count) => {
      setTotalAdminUsers(count);
    });
    countActiveSubscriptions().then((count) => {
      setTotalSubs(count);
    });
    countBusiness().then((count) => {
      setTotalBusiness(count);
    });
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={6} md={6} lg={12}>
                <TotalCard total={totalUsers} detail="Usuarios" />
              </Grid>
              <Grid item sm={6} xs={6} md={6} lg={12}>
                <TotalCard total={totalAdminUsers} detail="Administradores" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={6} md={6} lg={12}>
                <TotalYellowCard total={totalSubs} detail="Subscripciones Activas" />
              </Grid>
              <Grid item sm={6} xs={6} md={6} lg={12}>
                <TotalYellowCard total={totalBusiness} detail="Negocios Registrados" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={6}>
            <EarningCard total={0} detail="Total de ingresos" />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={6}>
            <EarningBlueCard total={0} detail="Total de beneficio" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} hidden>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
