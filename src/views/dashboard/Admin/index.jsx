import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
// data
import { gridSpacing } from 'store/constant';
//Firebase
import {
  countActiveSubscriptions,
  countAdminUser,
  countBusiness,
  countProducts,
  countUser,
  getTotalDebits,
  getTotalPayments
} from 'config/firebaseEvents';
//Components
import EarningCard from 'components/cards/EarningCard';
import EarningBlueCard from 'components/cards/EarningBlueCard';
import EarningRedCard from 'components/cards/EarningRedCard';
import EarningGreenCard from 'components/cards/EarningGreenCard';
import TotalCard from 'components/cards/TotalCard';
import TotalYellowCard from 'components/cards/TotalYellowCard';
import TotalBlackCard from 'components/cards/TotalBlackCard';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdminUsers, setTotalAdminUsers] = useState(0);
  const [totalSubs, setTotalSubs] = useState(0);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalDebits, setTotalDebits] = useState(0);
  const [totalBenefit, setTotalBenefit] = useState(0);

  useEffect(() => {
    countUser().then((count) => {
      setTotalUsers(Number.parseInt(count));
    });
    countAdminUser().then((count) => {
      setTotalAdminUsers(Number.parseInt(count));
    });
    countActiveSubscriptions().then((count) => {
      setTotalSubs(Number.parseInt(count));
    });
    countBusiness().then((count) => {
      setTotalBusiness(Number.parseInt(count));
    });
    countProducts().then((count) => {
      setTotalProducts(Number.parseInt(count));
    });
    getTotalPayments().then((res) => {
      setTotalPayments(Number.parseFloat(res).toFixed(2));
      getTotalDebits().then((result) => {
        setTotalDebits(Number.parseFloat(result).toFixed(2));
        setTotalBenefit(Number.parseFloat(res).toFixed(2) - Number.parseFloat(result).toFixed(2));
      });
    });
    /*getTotalBenefit().then((res) => {
      setTotalBenefit(Number.parseFloat(res).toFixed(2));
    });*/
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={6} md={6} lg={3}>
            <TotalCard total={totalUsers} detail="Usuarios" />
          </Grid>
          <Grid item sm={6} xs={6} md={6} lg={3}>
            <TotalCard total={totalAdminUsers} detail="Administradores" />
          </Grid>
          <Grid item sm={6} xs={6} md={6} lg={3}>
            <TotalYellowCard total={totalBusiness} detail="Negocios" />
          </Grid>
          <Grid item sm={6} xs={6} md={6} lg={3}>
            <TotalYellowCard total={totalProducts} detail="Productos" />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={6}>
            <EarningCard total={totalPayments} detail="Ingresos" />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={6}>
            <EarningGreenCard total={totalBenefit} detail="Beneficio" />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={6}>
            <EarningBlueCard total={totalDebits} detail="Pagado" />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={6}>
            <EarningRedCard total={0} detail="Pendiente" />
          </Grid>
          <Grid item sm={6} xs={6} md={6} lg={3}>
            <TotalBlackCard total={totalSubs} detail="Subscripciones" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
