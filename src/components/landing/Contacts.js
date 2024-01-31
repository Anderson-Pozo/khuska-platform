import React from 'react';
import { uiStyles } from './styles';
import { ButtonGroup, Button, Grid, TextField } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconBrandYoutube } from '@tabler/icons';

const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: 'rgba(0,0,0,0.8)',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative'
}));

export default function Contacts() {
  return (
    <div style={uiStyles.rootContact} id="contacts">
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <CardWrapper border={false} content={false}>
                <Box sx={{ p: 4 }}>
                  <h1 style={{ color: '#53338a', marginBottom: 30 }}>CONTÁCTANOS</h1>
                  <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    Puedes enviar tus mensajes vía mail, WhatsApp y nuestro equipo te contestará a la brevedad posible, estaremos gustosos
                    de asesorarte para que consigas lo que estás buscando.
                  </p>
                  <h3 style={{ color: '#9f98c2', marginTop: 30 }}>Síguenos en nuestras Redes Sociales:</h3>
                  <center>
                    <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                      <Button variant="outlined" style={{ width: 60, height: 60 }}>
                        <IconBrandFacebook size={35} />
                      </Button>
                      <Button variant="outlined" style={{ width: 60, height: 60 }}>
                        <IconBrandInstagram size={35} />
                      </Button>
                      <Button variant="outlined" style={{ width: 60, height: 60 }}>
                        <IconBrandYoutube size={35} />
                      </Button>
                      <Button variant="outlined" style={{ width: 60, height: 60 }}>
                        <IconBrandWhatsapp size={35} />
                      </Button>
                    </ButtonGroup>
                  </center>
                </Box>
              </CardWrapper>
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <CardWrapper border={false} content={false}>
                <Box sx={{ p: 5 }}>
                  <center>
                    <h2>O escríbenos tus dudas en el siguiente formulario:</h2>
                    <Grid container spacing={4}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField id="outlined-basic" label="Nombres Completos" variant="filled" fullWidth color="primary" />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField id="outlined-basic" label="Correo Electrónico" variant="filled" fullWidth />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField id="outlined-basic" label="Teléfono" variant="filled" fullWidth />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField id="outlined-basic" label="Asunto" variant="filled" fullWidth />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField id="outlined-basic" label="Mensaje" variant="filled" fullWidth multiline rows={4} />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Button disableElevation fullWidth size="large" variant="contained" color="secondary">
                          Enviar
                        </Button>
                      </Grid>
                    </Grid>
                  </center>
                </Box>
              </CardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
