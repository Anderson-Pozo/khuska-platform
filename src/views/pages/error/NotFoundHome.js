import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-credit-cards/es/styles-compiled.css';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import AuthWrapper from '../login/AuthWrapper';
import AuthFooter from 'components/cards/AuthFooter';

//Assets
import bg01 from 'assets/images/bg/notFound.jpg';
import { genConst } from 'store/constant';
import notFound from 'assets/images/error/404.png';

const NotFoundHome = () => {
  let navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <AuthWrapper
      style={{
        backgroundImage: `url(${bg01})`,
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <center>
                    <img src={notFound} alt="NotFoundPage" width={400} />
                    <Typography variant="h2" color="secondary" sx={{ color: '#FFF', mt: 4 }}>
                      UPS! LA PÁGINA QUE BUSCAS NO EXISTE!
                    </Typography>
                  </center>
                </Grid>
                <Grid item xs={12}>
                  <center>
                    <Button
                      variant="contained"
                      style={{ margin: 5, borderRadius: 10, width: 300, height: 50, backgroundColor: '#FFF' }}
                      onClick={handleReturn}
                    >
                      <span style={{ color: genConst.CONST_CREATE_COLOR, fontWeight: 'bold' }}>REGRESAR</span>
                    </Button>
                  </center>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default NotFoundHome;
