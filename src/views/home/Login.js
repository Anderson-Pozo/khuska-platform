/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, FormControl, Button, Modal, Box, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AnimateButton from 'components/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import google from 'assets/images/google.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authentication } from 'config/firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { uiStyles } from './styles';
import { genConst } from 'store/constant';
import { fullDate, generateDate } from 'utils/validations';
import { createDocument, isExistUser } from 'config/firebaseEvents';
import {
  collInbox,
  collNotifications,
  collSubscription,
  collUserAddress,
  collUserBillData,
  collUserLog,
  collUserPaymentMethod,
  collUserPhone,
  collUsers
} from 'store/collections';
import { generateOwnReferalNumber } from 'utils/idGenerator';
import { IconUser } from '@tabler/icons';

const provider = new GoogleAuthProvider();

export default function Login() {
  const theme = useTheme();
  let navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        navigate('/market/main');
      }
    });
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const createUserAditionalData = (uid, email) => {
    //Subscription
    const objSubscription = {
      idUser: uid,
      startDate: null,
      endDate: null,
      cancelDate: null,
      state: genConst.CONST_STATE_IN
    };
    createDocument(collSubscription, uid, objSubscription);
    //Log
    const userLog = {
      idUser: uid,
      loginDate: fullDate(),
      email: email,
      state: genConst.CONST_STATE_IN,
      message: 'Registro de nuevo usuario.'
    };
    createDocument(collUserLog, uid, userLog);
    //Address
    const userAddress = {
      idUser: uid,
      principal: '',
      secondary: '',
      number: '',
      city: '',
      province: '',
      reference: ''
    };
    createDocument(collUserAddress, uid, userAddress);
    //Phone
    const userPhone = {
      idUser: uid,
      phone: ''
    };
    createDocument(collUserPhone, uid, userPhone);
    //BillData
    const userBillData = {
      idUser: uid,
      name: '',
      ci: '',
      address: '',
      email: '',
      city: '',
      phone: '',
      postal: ''
    };
    createDocument(collUserBillData, uid, userBillData);
    //Payment Data
    const userPaymentData = {
      idUser: uid,
      name: '',
      number: '',
      numberMask: null,
      date: '',
      cvc: '',
      cvcmd5: null
    };
    createDocument(collUserPaymentMethod, uid, userPaymentData);
    //Inbox
    const inbox = {
      to: email,
      from: 'Khuska Admin',
      date: generateDate(),
      message: 'Bienvenido a Khuska',
      subject: 'Bienvenida'
    };
    createDocument(collInbox, uid, inbox);
    //Notifications
    const notifications = {
      to: email,
      from: 'Khuska Admin',
      date: generateDate(),
      message: 'No olvides actualizar tu información de perfil.',
      subject: 'Notificación',
      state: genConst.CONST_NOTIF_NL
    };
    createDocument(collNotifications, uid, notifications);
  };

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
            navigate('/market/main');
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

  const handleLoginGoogle = () => {
    setOpen(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        //console.log(user);
        //console.log(token);
        isExistUser(user.uid).then((res) => {
          if (res) {
            console.log(res, 'User valid');
          } else {
            let refCode = generateOwnReferalNumber(6);
            const userObject = {
              id: user.uid,
              fullName: user.displayName,
              name: user.displayName,
              lastName: '',
              email: user.email,
              description: '',
              gender: '',
              birthday: '',
              avatar: user.photoURL,
              state: genConst.CONST_STATE_IN,
              subState: genConst.CONST_STATE_IN,
              profile: genConst.CONST_PRO_DEF,
              createAt: fullDate(),
              registerDate: fullDate(),
              date: fullDate(),
              city: null,
              ci: null,
              refer: null,
              ownReferal: refCode,
              url: user.photoURL
            };
            createDocument(collUsers, user.uid, userObject);
            createUserAditionalData(user.uid, user.email);
            toast.success('Usuario registrado correctamente!.', { position: toast.POSITION.TOP_RIGHT });
          }
        });
        setTimeout(() => {
          setOpen(false);
          navigate('/market/main');
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorEmail = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, errorEmail, credential);
        toast.error('Ups, algo salio mal!!!', { position: toast.POSITION.TOP_RIGHT });
        setOpen(false);
      });
  };

  return (
    <Grid container direction="column">
      <ToastContainer />
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <Grid item>
            <AuthCard>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                  <Logo />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
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
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
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
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{ borderRadius: 10, height: 50 }}
                      onClick={handleLogin}
                    >
                      Iniciar Sesión
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography
                      component={Link}
                      to="/market/recovery"
                      variant="h5"
                      sx={{ textDecoration: 'none', color: theme.palette.secondary.dark }}
                    >
                      Olvidaste tu contraseña?
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" style={{ textAlign: 'center', marginBottom: 10, color: '#000' }}>
                    Aún no tienes una cuenta?
                    <Typography
                      component={Link}
                      to="/market/register"
                      variant="subtitle1"
                      sx={{ textDecoration: 'none', color: theme.palette.secondary.dark, ml: 1 }}
                    >
                      Regístrate
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <center>
                    <Typography variant="h5" style={{ textAlign: 'center', marginBottom: 10, color: '#000' }}>
                      o inicia sesión con:
                    </Typography>
                  </center>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    startIcon={<img src={google} alt="brand google" width={22} />}
                    style={{ color: theme.palette.secondary.dark, height: 50, borderRadius: 12, marginTop: 10 }}
                    onClick={handleLoginGoogle}
                  >
                    Inicia sesión con Google
                  </Button>
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
