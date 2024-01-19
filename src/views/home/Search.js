import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import React from 'react';

const Search = () => {
  return (
    <>
      <Typography variant={'h2'}>Negocios</Typography>
      <Typography component={Link} to="/auth/signin" variant="subtitle1" sx={{ textDecoration: 'none' }}>
        Iniciar Sesión
      </Typography>
    </>
  );
};

export default Search;
