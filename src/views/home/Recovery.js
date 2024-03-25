import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery, Divider, FormControl, InputLabel, OutlinedInput, Button } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
//import { uiStyles } from './styles';

export default function Recovery() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 'calc(100vh - 57px)', backgroundColor: '#FFF', borderRadius: 4 }}
        >
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCard>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                  <Logo />
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h5' : 'h4'}>
                        Bienvenido a Compra Venta KHUSKA
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <InputLabel htmlFor="outlined-adornment-email-login">Correo Electrónico / Username</InputLabel>
                    <OutlinedInput id="outlined-adornment-email-login" type="email" name="email" label="Correo Electrónico / Username" />
                  </FormControl>
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{ borderRadius: 10 }}
                    >
                      Recuperar Contraseña
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none', color: '#FFF' }}>
                      Volver
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
