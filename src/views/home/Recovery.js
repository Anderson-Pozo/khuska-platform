/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery, Divider, FormControl, TextField, Button, Stack } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from 'config/firebase';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#FFF'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 15,
      color: '#FFF'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#242526',
      color: '#FFF',
      '@media (hover: none)': {
        backgroundColor: '#242526'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#242526',
      color: '#FFF',
      border: '1px solid #242526'
    },
    '& .MuiInputLabel-outlined': {
      color: '#FFF'
    }
  }
}));

export default function Recovery() {
  const theme = useTheme();
  let navigate = useNavigate();
  const classes = useStyles();
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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 'calc(100vh - 60px)', backgroundColor: 'transparent' }}
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
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography color={theme.palette.secondary.light} gutterBottom variant={matchDownSM ? 'h5' : 'h4'}>
                          Bienvenido a KHUSKA MARKET
                        </Typography>
                        <Typography variant="caption" fontSize="14px" color={theme.palette.secondary.contrastText}>
                          Ingresa tu correo electrónico para restablecer tu contraseña
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <TextField
                      id="outlined-adornment-email-login"
                      variant="filled"
                      type="email"
                      name="email"
                      className={classes.root}
                      fullWidth
                      label="Correo Electrónico"
                      color="info"
                      onChange={(ev) => setEmail(ev.target.value)}
                      sx={{ input: { color: '#FFF' } }}
                    />
                  </FormControl>
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
                  <Divider sx={{ borderColor: '#3E4042' }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography
                      component={Link}
                      to="/market/login"
                      variant="subtitle1"
                      sx={{ textDecoration: 'none', color: theme.palette.secondary.light }}
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
