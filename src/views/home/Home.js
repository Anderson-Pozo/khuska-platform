import { Link } from 'react-router-dom';

import { Divider, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
  return (
    <>
      <Typography variant={'h2'}>Hola, Bienvenido</Typography>
      <Typography component={Link} to="/search" variant="subtitle1" sx={{ textDecoration: 'none' }}>
        Buscar Negocio
      </Typography>
      <Divider />
      <Typography component={Link} to="/auth/signin" variant="subtitle1" sx={{ textDecoration: 'none' }}>
        Iniciar Sesión
      </Typography>
    </>
  );
};

export default Home;
