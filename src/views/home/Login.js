/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery, Divider, FormControl, InputLabel, OutlinedInput, Button, Modal, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AnimateButton from 'components/extended/AnimateButton';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authentication } from 'config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { uiStyles } from './styles';

export default function Login() {
  const theme = useTheme();
  let navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        navigate('/');
      }
    });
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      toast.info('Correo electrónico y contraseña son obligatorios!.', { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpen(true);
      signInWithEmailAndPassword(authentication, email, password)
        .then((userCredencials) => {
          const user = userCredencials.user;
          console.log(user);
          setTimeout(() => {
            setOpen(false);
            navigate('/');
          }, 2000);
        })
        .catch((error) => {
          setOpen(false);
          if (error.code === 'auth/user-not-found') {
            toast.error('Upsss! Usuario no encontrado. Por favor regístrate.', { position: toast.POSITION.TOP_RIGHT });
          } else if (error.code === 'auth/wrong-password') {
            toast.error('Upsss! Contraseña incorrecta.', { position: toast.POSITION.TOP_RIGHT });
          } else if (error.code === 'auth/user-disabled') {
            toast.error('Upsss! Tu cuenta se encuentra inhabilitada!.', { position: toast.POSITION.TOP_RIGHT });
          } else if (error.code === 'auth/invalid-login-credentials') {
            toast.error('Upsss! Datos de inicio de sesión no válidos!.', { position: toast.POSITION.TOP_RIGHT });
          } else if (error.code === 'auth/internal-error') {
            toast.error('Error interno, por favor comuniquese con el administrador del sistema!.', {
              position: toast.POSITION.TOP_RIGHT
            });
          } else if (error.code === 'auth/network-request-failed') {
            toast.error('Error en la red, por favor intente más tarde!.', { position: toast.POSITION.TOP_RIGHT });
          } else {
            console.log(error);
          }
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
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="email"
                      name="email"
                      label="Correo Electrónico / Username"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <InputLabel htmlFor="outlined-adornment-email-login">Contraseña</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-login"
                      type="password"
                      name="password"
                      label="Contraseña"
                      onChange={(ev) => setPassword(ev.target.value)}
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
                      style={{ borderRadius: 10 }}
                      onClick={handleLogin}
                    >
                      Iniciar Sesión
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography component={Link} to="/recovery" variant="h5" sx={{ textDecoration: 'none', color: '#FFF' }}>
                      Olvidaste tu contraseña?
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 10, color: '#FFF' }}>
                    Aún no tienes una cuenta?
                  </Typography>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none', color: '#FFF' }}>
                      Regístrate
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Grid>
  );
}
