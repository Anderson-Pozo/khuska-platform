/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, FormControl, Button, Modal, Box, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { generateOwnReferalNumber } from 'utils/idGenerator';
import {
  collInbox,
  collNotifications,
  collSubscription,
  collUserAddress,
  collUserBillData,
  collUserPaymentMethod,
  collUserPhone,
  collUsers
} from 'store/collections';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { fullDate, generateDate } from 'utils/validations';
import { uiStyles } from './styles';
import { genConst } from 'store/constant';
import { createDocument } from 'config/firebaseEvents';
import { IconMail, IconUser } from '@tabler/icons';

export default function Register() {
  const theme = useTheme();
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openLoader, setOpenLoader] = useState(false);
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

  const handleRegister = () => {
    if (!name || !lastName || !email || !password) {
      toast.info('Nombre, Apellido, Correo electrónico y contraseña son obligatorios!.', { position: toast.POSITION.TOP_RIGHT });
    } else {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
          setOpenLoader(true);
          const user = userCredential.user;
          updateProfile(authentication.currentUser, {
            displayName: name + ' ' + lastName
          });
          let refCode = generateOwnReferalNumber(6);
          const userObject = {
            id: user.uid,
            fullName: name + ' ' + lastName,
            name: name,
            lastName: lastName,
            email: email,
            description: '',
            gender: '',
            birthday: '',
            avatar: null,
            state: genConst.CONST_STATE_IN,
            subState: genConst.CONST_STATE_IN,
            profile: genConst.CONST_PRO_DEF,
            createAt: fullDate(),
            registerDate: fullDate(),
            date: fullDate(),
            city: null,
            ci: null,
            refer: null,
            ownReferal: Number.parseInt(refCode),
            url: null
          };
          createDocument(collUsers, user.uid, userObject);
          createUserAditionalData(user.uid, email);
          toast.success('Usuario registrado correctamente!.', { position: toast.POSITION.TOP_RIGHT });
          setTimeout(() => {
            setOpenLoader(false);
            navigate('/market/main');
          }, 2000);
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            toast.error('Upsss! Usuario no encontrado. Por favor regístrate.', { position: toast.POSITION.TOP_RIGHT });
          } else if (error.code === 'auth/wrong-password') {
            toast.error('Upsss! Contraseña incorrecta.', { position: toast.POSITION.TOP_RIGHT });
          } else if (error.code === 'auth/user-disabled') {
            toast.error('Upsss! Tu cuenta se encuentra inhabilitada!.', { position: toast.POSITION.TOP_RIGHT });
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
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
          <Grid item>
            <AuthCard>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={12}>
                  <center>
                    <Logo />
                  </center>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-name-register">Nombre</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-name-register"
                      type="text"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                      endAdornment={<IconUser />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-lastName-register">Apellido</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-lastName-register"
                      type="text"
                      value={lastName}
                      name="lastName"
                      onChange={(ev) => setLastName(ev.target.value)}
                      endAdornment={<IconUser />}
                    />
                  </FormControl>
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
                <Grid item xs={12} sm={12}>
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
                      onClick={handleRegister}
                    >
                      Registrar
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 10, color: '#000' }}>
                    Ya tienes una cuenta?
                  </Typography>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography
                      component={Link}
                      to="/market/login"
                      variant="subtitle1"
                      sx={{ textDecoration: 'none', color: theme.palette.secondary.dark }}
                    >
                      Iniciar Sesión
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Grid>
  );
}
