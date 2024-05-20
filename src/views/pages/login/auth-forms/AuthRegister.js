/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, useMediaQuery, Modal, InputLabel } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// Firebase
import { authentication } from 'config/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// project imports
import AnimateButton from 'components/extended/AnimateButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { fullDate, shortDate, shortDateFormat, validateEmail } from 'utils/validations';
import { isEmpty, size } from 'lodash';
import {
  createDocument,
  createLogRecord,
  createUserAditionalData,
  isExistUserReferalCode,
  isExistUserReferalEmail
} from 'config/firebaseEvents';
import { genConst, process } from 'store/constant';
import { generateId } from 'utils/idGenerator';
import { collLog, collUsers } from 'store/collections';

const AuthRegister = () => {
  let navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailRef, setEmailRef] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        navigate('/app/dashboard');
      }
      setOpenLoader(false);
    });
  }, []);

  const handleCleanFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setEmailRef('');
  };

  const handleRegister = async () => {
    if (isEmpty(firstName) || isEmpty(lastName)) {
      toast.info('Por favor, ingresa tus nombres y apellidos.', { position: toast.POSITION.TOP_RIGHT });
    } else if (isEmpty(email) || isEmpty(password)) {
      toast.info('Por favor, ingresa un correo electrónico y una contraseña.', { position: toast.POSITION.TOP_RIGHT });
    } else if (!validateEmail(email)) {
      toast.info('Por favor, ingresa una dirección de correo electrónico válida.', { position: toast.POSITION.TOP_RIGHT });
    } else if (size(password) < 6) {
      toast.info('La contraseña debe tener al menos 6 caracteres.', { position: toast.POSITION.TOP_RIGHT });
    } else {
      if (isEmpty(emailRef)) {
        handleCreateAccount(firstName, lastName, email, password, null);
      } else {
        if (isNaN(emailRef)) {
          if (!validateEmail(emailRef)) {
            toast.info('Por favor, ingresa una dirección de correo electrónico de referido válida.', {
              position: toast.POSITION.TOP_RIGHT
            });
          } else {
            isExistUserReferalEmail(emailRef).then((res) => {
              if (res !== null) {
                toast.success('Persona referida encontrada! ' + res, { position: toast.POSITION.TOP_RIGHT });
                handleCreateAccount(firstName, lastName, email, password, res);
              } else {
                toast.info('Persona referida no encontrada!', { position: toast.POSITION.TOP_RIGHT });
              }
            });
          }
        } else {
          isExistUserReferalCode(Number.parseInt(emailRef)).then((res) => {
            if (res !== null) {
              toast.success('Persona referida encontrada! ' + res, { position: toast.POSITION.TOP_RIGHT });
              handleCreateAccount(firstName, lastName, email, password, res);
            } else {
              toast.info('Persona referida no encontrada!', { position: toast.POSITION.TOP_RIGHT });
            }
          });
        }
      }
    }
  };

  const handleCreateAccount = (name, lastname, mail, pass, ref) => {
    setOpenLoader(true);
    createUserWithEmailAndPassword(authentication, mail, pass)
      .then((credentials) => {
        const userObject = {
          avatar: null,
          birthday: null,
          ci: null,
          city: null,
          createAt: fullDate(),
          date: shortDate(),
          description: null,
          email: mail,
          fullName: name + ' ' + lastname,
          gender: null,
          id: credentials.user.uid,
          lastName: lastname,
          name: name,
          ownReferal: Number.parseInt(generateId(6)),
          phone: null,
          profile: genConst.CONST_PRO_DEF,
          refer: ref ? ref : null,
          registerDate: shortDateFormat(),
          state: genConst.CONST_STATE_IN,
          subState: genConst.CONST_STATE_IN,
          url: null
        };
        createDocument(collUsers, credentials.user.uid, userObject);
        updateProfile(authentication.currentUser, {
          displayName: name + ' ' + lastname
        });
        createUserAditionalData(credentials.user.uid, mail);
        createLogRecord(collLog, process.LOG_USER_REGISTER, userObject);
        handleCleanFields();
        toast.success('Usuario registrado correctamente!.', { position: toast.POSITION.TOP_RIGHT });
        setTimeout(() => {
          setOpenLoader(false);
          navigate('/app/dashboard');
        }, 3000);
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
          toast.error(error);
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <Grid container spacing={matchDownSM ? 0 : 1}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 1 }}>
            <InputLabel htmlFor="outlined-adornment-firstName-register">Nombre</InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstName-register"
              type="text"
              value={firstName}
              name="firstName"
              onChange={(ev) => setFirstName(ev.target.value)}
              inputProps={{}}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 1 }}>
            <InputLabel htmlFor="outlined-adornment-lastName-register">Apellido</InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastName-register"
              type="text"
              value={lastName}
              name="lastName"
              onChange={(ev) => setLastName(ev.target.value)}
              inputProps={{}}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 1 }}>
            <InputLabel htmlFor="outlined-adornment-email-register">Correo Electrónico</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-register"
              type="email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
              inputProps={{}}
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
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 1 }}>
            <InputLabel htmlFor="outlined-adornment-emailRef-register">Correo o Código de Referidor (Opcional)</InputLabel>
            <OutlinedInput
              id="outlined-adornment-emailRef-register"
              type="email"
              value={emailRef}
              name="emailRef"
              onChange={(ev) => setEmailRef(ev.target.value)}
              inputProps={{}}
            />
          </FormControl>
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
                onClick={handleRegister}
              >
                Registrarse
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={styleLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </>
  );
};

const styleLoader = {
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

export default AuthRegister;
