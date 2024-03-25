import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Chip } from '@mui/material';
import { uiStyles } from './styles';
import { makeStyles } from '@material-ui/core/styles';
import AnimateButton from 'components/extended/AnimateButton';
import avatarImg from 'assets/images/profile/profile-picture-6.jpg';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 15
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#242526',
      '@media (hover: none)': {
        backgroundColor: '#242526'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#242526',
      border: '1px solid #242526'
    }
  }
}));

export default function Item() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('idType');
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item sm={5} xs={5} md={5} lg={5} sx={uiStyles.layout}>
            <div style={uiStyles.main}>
              <div style={uiStyles.sidebar}>
                <Typography
                  variant="h3"
                  noWrap
                  component="div"
                  style={{ color: '#FFF', paddingBottom: 20, paddingTop: 20, paddingLeft: 10, fontWeight: 'bold' }}
                >
                  Artículo en Venta
                </Typography>
                <div style={{ width: '100%', height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                  <Chip
                    avatar={<img alt="User" src={avatarImg} />}
                    label={<span style={{ color: '#FFF' }}>Paúl Alejandro Alvarez Corral</span>}
                    variant="outlined"
                  />
                </div>
                <div style={{ width: '100%', height: 220, backgroundColor: 'transparent' }}>
                  Fotos · 0/10 - Puedes agregar un máximo de 10 fotos.
                  <div
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      borderWidth: 0.2,
                      borderStyle: 'groove',
                      borderColor: '#3a3b3c',
                      borderRadius: 10,
                      marginTop: 5
                    }}
                  >
                    AGREGAR FOTOS
                  </div>
                </div>
                <h4>Obligatorio</h4>
                <span>Proporciona una descripción que sea lo más detallada posible.</span>
                <div style={{ padding: 1, margin: 5 }}>
                  <TextField variant="filled" className={classes.root} fullWidth value={''} label="Título" color="info" />
                  <TextField variant="filled" className={classes.root} fullWidth value={''} label="Precio" color="info" />
                  <TextField variant="filled" className={classes.root} fullWidth value={''} label="Categoría" color="info" />
                  <TextField variant="filled" className={classes.root} fullWidth value={''} label="Estado" color="info" />
                  <TextField
                    variant="filled"
                    className={classes.root}
                    fullWidth
                    value={''}
                    label="Descripción"
                    color="info"
                    multiline
                    rows={5}
                    rowsMax={10}
                  />
                  <TextField variant="filled" className={classes.root} fullWidth value={''} label="Ubicación" color="info" />
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: 10, height: 60 }}
                    >
                      Siguiente
                    </Button>
                  </AnimateButton>
                  <h5 style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    Los artículos de KhuskaMarket son públicos, por lo que cualquier persona dentro y fuera de KhuskaMarket puede verlos.
                    Los artículos como animales, drogas, armas, falsificaciones y otros que infringen derechos de propiedad intelectual no
                    están permitidos en KhuskaMarket. Consulta nuestras Políticas de comercio.
                  </h5>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item sm={7} xs={7} md={7} lg={7}>
            <h2>Item: {id}</h2>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
