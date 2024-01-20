import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './Main/EarningCard';
import PopularCard from './Main/PopularCard';
import TotalUsersDarkCard from './Main/TotalUsersDarkCard';
import { gridSpacing } from 'store/constant';

//Firebase
import { countUser, countCourses, countTotalIncomes } from 'config/firebaseEvents';
import TotalSubscriptions from './Main/TotalSubscriptions';
import TotalBusiness from './Main/TotalBusiness';
import TotalClients from './Main/TotalClients';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalCourses, setTotalCourses] = useState(null);
  const [totalIncomes, setTotalIncomes] = useState(null);

  useEffect(() => {
    setLoading(false);
    countUser().then((count) => {
      setTotalUsers(count);
    });

    countCourses().then((count) => {
      setTotalCourses(count);
    });

    countTotalIncomes().then((count) => {
      setTotalIncomes(count);
    });
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={12} sm={12} xs={6}>
            <EarningCard isLoading={isLoading} totalIncomes={totalIncomes} />
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalUsersDarkCard isLoading={isLoading} totalUsers={totalUsers} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalSubscriptions isLoading={isLoading} totalCourses={totalCourses} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={6}>
            <TotalBusiness isLoading={isLoading} count={totalUsers} />
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalClients isLoading={isLoading} count={totalUsers} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalSubscriptions isLoading={isLoading} totalCourses={totalCourses} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} hidden>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}>
            <TotalBusiness isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalBusiness isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
