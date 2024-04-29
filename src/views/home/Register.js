/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery, Divider, FormControl, InputLabel, OutlinedInput, Button, Modal, Box } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { authentication, db } from 'config/firebase';
import { generateOwnReferalNumber } from 'utils/idGenerator';
import { doc, setDoc } from 'firebase/firestore';
import { collUsers } from 'store/collections';
import { fullDate } from 'utils/validations';
import { uiStyles } from './styles';
import { genConst } from 'store/constant';

export default function Register() {
  const theme = useTheme();
  let navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openLoader, setOpenLoader] = React.useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        navigate('/market/main');
      }
    });
  }, []);

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
          setDoc(doc(db, collUsers, user.uid), {
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
            ownReferal: refCode,
            url: null
          });
          //createUserAditionalData(user.uid, values.email);
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
                      <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h5' : 'h4'}>
                        Bienvenido a Compra Venta KHUSKA
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <InputLabel htmlFor="outlined-adornment-name-login">Nombre</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-name-login"
                      type="text"
                      name="name"
                      label="Nombre"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <InputLabel htmlFor="outlined-adornment-lastName-login">Apellido</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-lastName-login"
                      type="text"
                      name="lastName"
                      label="Apellido"
                      onChange={(ev) => setLastName(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <InputLabel htmlFor="outlined-adornment-email-login">Correo Electrónico</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="email"
                      name="email"
                      label="Correo Electrónico"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ ...theme.typography.customInputAuth }}>
                    <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
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
                      onClick={handleRegister}
                    >
                      Registrar
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 10, color: '#FFF' }}>
                    Ya tienes una cuenta?
                  </Typography>
                  <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography component={Link} to="/market/login" variant="subtitle1" sx={{ textDecoration: 'none', color: '#FFF' }}>
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
