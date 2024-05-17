/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, IconButton, Grid, Button } from '@mui/material';
import { uiStyles } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';

export default function Hero({ checked }) {
  let navigate = useNavigate();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedSize={50}>
      <div style={uiStyles.container}>
        <h3 style={uiStyles.title}>
          JUNTOS HACIA LA CONSTRUCCIÓN
          <br />
          <span style={uiStyles.colorText}> DE UN FUTURO PROSPERO</span>
        </h3>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Button fullWidth style={uiStyles.rootPlace} onClick={() => navigate('market/main')}>
                  COMPRA VENTA
                </Button>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Button fullWidth style={uiStyles.rootPlace} onClick={() => navigate('/')}>
                  DROP SHIPPING
                </Button>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Button fullWidth style={uiStyles.rootPlace} onClick={() => navigate('auth/signin')}>
                  RED DE MERCADEO
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
    </Collapse>
  );
}
