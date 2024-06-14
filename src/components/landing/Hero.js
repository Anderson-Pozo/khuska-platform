/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Grid, Button } from '@mui/material';
import { uiStyles } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';

export default function Hero() {
  let navigate = useNavigate();

  return (
    <div style={uiStyles.container}>
      <div style={{ padding: 20 }}>
        <p style={uiStyles.title}>JUNTOS HACIA LA CONSTRUCCIÓN</p>
        <p style={uiStyles.colorText}> DE UN FUTURO PROSPERO</p>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Button fullWidth style={uiStyles.rootPlace} onClick={() => navigate('market/main')}>
                <span style={{ fontSize: 16 }}>COMPRA VENTA</span>
              </Button>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Button fullWidth style={uiStyles.rootPlaceMid} onClick={() => navigate('/')}>
                <div>
                  <p style={{ fontSize: 16 }}>DROP SHIPPING</p>
                  <p style={{ fontSize: 13 }}>MUY PRONTO!</p>
                </div>
              </Button>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Button fullWidth style={uiStyles.rootPlace} onClick={() => navigate('auth/signin')}>
                <span style={{ fontSize: 16 }}>RED DE MERCADEO</span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Scroll to="about" smooth={true}>
        <IconButton>
          <ExpandMoreIcon style={uiStyles.goDown} />
        </IconButton>
      </Scroll>
    </div>
  );
}
