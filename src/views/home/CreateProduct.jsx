/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, useMediaQuery, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { IconCar, IconHome, IconShoppingBag } from '@tabler/icons';

export default function CreateProduct() {
  const theme = useTheme();
  let navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        console.log(user);
      } else {
        navigate('/market/main');
      }
    });
  }, []);

  const CustomButton = styled(Button)({
    minHeight: 220,
    justifyContent: 'center',
    color: '#FFF',
    backgroundColor: 'rgb(83, 51, 138, 0.9)',
    borderRadius: 8,
    //cursor: 'pointer',
    margin: 2,
    '&:hover': {
      backgroundColor: 'rgb(83, 51, 138, 0.7)',
      color: '#FFF'
    }
  });

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ minHeight: 'calc(100vh - 150px)', borderRadius: 4 }}
        >
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <Grid item>
                    <h1 style={{ color: 'rgb(83, 51, 138)', fontSize: 25 }}>Crear Publicación</h1>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CustomButton
                  fullWidth
                  onClick={() => {
                    navigate({
                      pathname: '/market/create/item',
                      search: `?idType=${1}`
                    });
                  }}
                >
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <IconShoppingBag size={60} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: -2 }}>
                      <Typography color={'#FFF'} variant={'h4'}>
                        Producto
                      </Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography color={'#FFF'} variant={'h6'}>
                        Crea una sola publicación para vender uno o más artículos.
                      </Typography>
                    </Grid>
                  </Grid>
                </CustomButton>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CustomButton
                  onClick={() => {
                    navigate({
                      pathname: '/market/create/item',
                      search: `?idType=${2}`
                    });
                  }}
                >
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <IconCar size={60} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: -2 }}>
                      <Typography color={'#FFF'} variant={'h4'}>
                        Vehículo
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography color={'#FFF'} variant={'h6'}>
                        Vende un auto, camión u otro tipo de vehículo.
                      </Typography>
                    </Grid>
                  </Grid>
                </CustomButton>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CustomButton
                  onClick={() => {
                    navigate({
                      pathname: '/market/create/item',
                      search: `?idType=${3}`
                    });
                  }}
                >
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <IconHome size={60} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: -2 }}>
                      <Typography color={'#FFF'} variant={'h4'}>
                        Propiedad
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography color={'#FFF'} variant={'h6'}>
                        Publica una casa o departamente para vender o alquilar.
                      </Typography>
                    </Grid>
                  </Grid>
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
