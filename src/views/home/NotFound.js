/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import AuthCard from './AuthCard';
import notFound from 'assets/images/error/404.png';

export default function NotFound() {
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate('/market/main');
  };

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 'calc(100vh - 60px)', backgroundColor: 'transparent' }}
        >
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCard>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <center>
                    <img src={notFound} alt="NotFoundPage" width={400} />
                    <Typography variant="h4" color="secondary" sx={{ color: '#FFF', mt: 4, mb: 4 }}>
                      UPS! LA PÁGINA QUE BUSCAS NO EXISTE!
                    </Typography>
                    <AnimateButton>
                      <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{ borderRadius: 10 }}
                        onClick={handleLogin}
                      >
                        REGRESAR
                      </Button>
                    </AnimateButton>
                  </center>
                </Grid>
              </Grid>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
