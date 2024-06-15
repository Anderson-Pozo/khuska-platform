/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery, FormControl, Button, Stack, InputLabel, OutlinedInput } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { IconMail } from '@tabler/icons';

export default function Recovery() {
  const theme = useTheme();
  let navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        navigate('/market/main');
      }
    });
  }, []);

  const handleRecovery = () => {
    if (!email) {
      toast.info('Correo electrónico es obligatorio!.', { position: toast.POSITION.TOP_RIGHT });
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success('Un correo electrónico fue enviado con el link para recuperar su contraseña!.', {
            position: toast.POSITION.TOP_RIGHT
          });
          setEmail('');
          navigate('/market/main');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT });
        });
    }
  };
  return (
    <Grid container direction="column">
      <ToastContainer />
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <Grid item>
            <AuthCard>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <center>
                    <Logo />
                  </center>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography variant="caption" fontSize="14px" color={theme.palette.secondary.dark}>
                          Ingresa tu correo electrónico para restablecer tu contraseña
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-email-register">Correo Electrónico</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="email"
                      value={email}
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                      endAdornment={<IconMail />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{ borderRadius: 10, height: 50, fontSize: 14 }}
                      onClick={handleRecovery}
                    >
                      Recuperar Contraseña
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography
                      component={Link}
                      to="/market/login"
                      variant="subtitle1"
                      sx={{ textDecoration: 'none', color: theme.palette.secondary.dark }}
                    >
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
