/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, useMediaQuery, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import pic from 'assets/images/camera.png';

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
    width: 210,
    minHeight: 220,
    justifyContent: 'center',
    color: '#FFF',
    backgroundColor: '#242526',
    borderRadius: 8,
    margin: 2,
    '&:hover': {
      backgroundColor: '#3a3b3c',
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
          sx={{ minHeight: 'calc(100vh - 57px)', borderRadius: 4 }}
        >
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <Grid item>
                    <h3 style={{ color: '#FFF' }}>Crear Producto</h3>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <CustomButton
                  onClick={() => {
                    navigate({
                      pathname: '/market/create/item',
                      search: `?idType=${1}`
                    });
                  }}
                >
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <img src={pic} width={100} alt="icon category" />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: -3 }}>
                      <span style={{ fontWeight: 'bold', fontSize: 15 }}>Artículo en venta</span>
                    </Grid>
                    <Grid item xs={12}>
                      <span style={{ fontSize: 12 }}>Crea una sola publicación para vender uno o más artículos.</span>
                    </Grid>
                  </Grid>
                </CustomButton>
              </Grid>
              <Grid item xs={4}>
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
                      <img src={pic} width={100} alt="icon category" />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: -3 }}>
                      <span style={{ fontWeight: 'bold', fontSize: 15 }}>Vehículo en venta</span>
                    </Grid>
                    <Grid item xs={12}>
                      <span style={{ fontSize: 12 }}>Vende un auto, camión u otro tipo de vehículo.</span>
                    </Grid>
                  </Grid>
                </CustomButton>
              </Grid>
              <Grid item xs={4}>
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
                      <img src={pic} width={100} alt="icon category" />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: -3 }}>
                      <span style={{ fontWeight: 'bold', fontSize: 15 }}>Propiedad en venta</span>
                    </Grid>
                    <Grid item xs={12}>
                      <span style={{ fontSize: 12 }}>Publica una casa o departamente para vender o alquilar.</span>
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
