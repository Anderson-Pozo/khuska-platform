/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Modal,
  Grid,
  useMediaQuery
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
//Firebase
import { authentication } from 'config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createLogRecord, getProfileUser, isSessionActive } from 'config/firebaseEvents';
// project imports
import AnimateButton from 'components/extended/AnimateButton';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { genConst, process } from 'store/constant';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { collLog } from 'store/collections';
import { IconUser } from '@tabler/icons';

const AuthLogin = () => {
  let navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    isSessionActive(navigate);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log('Geolocation is not available in your browser.');
      setPosition({
        latitude: null,
        longitude: null
      });
    }
  }, []);

  const handleLogin = () => {
    setOpen(true);
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredencials) => {
        const user = userCredencials.user;
        const logId = generateId(10);
        const object = {
          id: logId,
          createAt: fullDate(),
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          response: 'success',
          geoLat: position.latitude,
          geoLon: position.longitude,
          location: position
            ? 'https://www.google.com/maps/search/?api=1&query=' + position.latitude + ',' + position.longitude + '&zoom=20'
            : null
        };
        createLogRecord(collLog, process.LOG_USER_LOGIN, object);
        setTimeout(() => {
          setOpen(false);
          getProfileUser(user.uid).then((pro) => {
            if (pro == genConst.CONST_PRO_ADM) {
              navigate('/main/dashboard');
            } else {
              navigate('/app/dashboard');
            }
          });
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
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={matchDownSM ? 0 : 1}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 1 }}>
            <InputLabel htmlFor="outlined-adornment-email-login">Correo Electrónico / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
              endAdornment={<IconUser />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 1 }}>
            <InputLabel htmlFor="outlined-adornment-password-register">Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-register"
              type={showPassword ? 'text' : 'password'}
              value={password}
              name="password"
              label="Contraseña"
              onChange={(ev) => setPassword(ev.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
          </FormControl>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography
              component={Link}
              variant="subtitle1"
              to="/auth/password-recovery"
              color="secondary"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Olvidaste tu contraseña?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                style={{ height: 50, borderRadius: 10 }}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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

export default AuthLogin;
